import { PDFDocument, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";

export function generateQR(text) {
  const opts = {
    errorCorrectionLevel: "M",
    type: "image/png",
    quality: 0.92,
    margin: 1,
  };
  return QRCode.toDataURL(text, opts);
}

export function pad2Zero(str) {
  return String(str).padStart(2, "0");
}

export function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = pad2Zero(date.getMonth() + 1); // Les mois commencent à 0
  const day = pad2Zero(date.getDate());
  return `${year}-${month}-${day}`;
}

export function addSlash(str) {
  return str
    .replace(/^(\d{2})$/g, "$1/")
    .replace(/^(\d{2})\/(\d{2})$/g, "$1/$2/")
    .replace(/\/\//g, "/");
}

export function addVersion() {
  document.getElementById(
    "version"
  ).innerHTML = `${new Date().getFullYear()} - ${process.env.VERSION}`;
}

export function validateState(state) {
  const conditions = {
    birthday: /^([0][1-9]|[1-2][0-9]|30|31)\/([0][1-9]|10|11|12)\/(19[0-9][0-9]|20[0-1][0-9]|2020)/g,
    zipcode: /\d{5}/g,
  };

  return Object.entries(state).every(([key, value]) => {
    try {
      return (
        value.length > 1 && (!conditions[key] || value.match(conditions[key]))
      );
    } catch (error) {
      return false;
    }
  });
}

export function openBlob(blob, fileName) {
  const isChrome = /Chrome/i.test(navigator.userAgent);

  const url = URL.createObjectURL(blob);

  if (isChrome) {
    window.open(url);
  } else {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
  }
}

export const openPdf = async (state, reason) => {
  const pdfBlob = await generatePdf(state, reason, "/certificate.pdf");
  openBlob(pdfBlob, `attestation-${Date.now()}.pdf`);
};

export async function generatePdf(profile, reason, pdfBase) {
  const creationInstant = new Date();
  const creationDate = creationInstant.toLocaleDateString("fr-FR");
  const creationHour = creationInstant
    .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    .replace(":", "h");

  const {
    lastname,
    firstname,
    birthday,
    lieunaissance,
    address,
    zipcode,
    town,
    datesortie,
    heuresortie,
  } = profile;

  const data = [
    `Cree le: ${creationDate} a ${creationHour}`,
    `Nom: ${lastname}`,
    `Prenom: ${firstname}`,
    `Naissance: ${birthday} a ${lieunaissance}`,
    `Adresse: ${address} ${zipcode} ${town}`,
    `Sortie: ${datesortie} a ${heuresortie}`,
    `Motifs: ${reason}`,
  ].join(";\n ");

  const existingPdfBytes = await fetch(pdfBase).then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // set pdf metadata
  pdfDoc.setTitle("COVID-19 - Déclaration de déplacement");
  pdfDoc.setSubject("Attestation de déplacement dérogatoire");
  pdfDoc.setKeywords([
    "covid19",
    "covid-19",
    "attestation",
    "déclaration",
    "déplacement",
    "officielle",
    "gouvernement",
  ]);
  pdfDoc.setProducer("DNUM/SDIT");
  pdfDoc.setCreator("");
  pdfDoc.setAuthor("Ministère d l'intérieur");

  const page1 = pdfDoc.getPages()[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const drawText = (text, x, y, size = 11) => {
    page1.drawText(text, { x, y, size, font });
  };

  drawText(`${firstname} ${lastname}`, 119, 696);
  drawText(birthday, 119, 674);
  drawText(lieunaissance, 297, 674);
  drawText(`${address}, ${zipcode} ${town}`, 133, 652);

  if (reason === "travail") {
    drawText("x", 78, 578, 18);
  }
  if (reason === "achats") {
    drawText("x", 78, 533, 18);
  }
  if (reason === "sante") {
    drawText("x", 78, 477, 18);
  }
  if (reason === "famille") {
    drawText("x", 78, 435, 18);
  }
  if (reason === "handicap") {
    drawText("x", 78, 396, 18);
  }
  if (reason === "sport_animaux") {
    drawText("x", 78, 358, 18);
  }
  if (reason === "convocation") {
    drawText("x", 78, 295, 18);
  }
  if (reason === "missions") {
    drawText("x", 78, 255, 18);
  }
  if (reason === "enfants") {
    drawText("x", 78, 211, 18);
  }

  let locationSize = getIdealFontSize(font, profile.town, 83, 7, 11);

  if (!locationSize) {
    alert(
      "Le nom de la ville risque de ne pas être affiché correctement en raison de sa longueur. " +
        'Essayez d\'utiliser des abréviations ("Saint" en "St." par exemple) quand cela est possible.'
    );
    locationSize = 7;
  }

  drawText(profile.town, 105, 175, locationSize);
  drawText(`${profile.datesortie}`, 91, 153, 11);
  drawText(`${profile.heuresortie}`, 264, 153, 11);

  // const shortCreationDate = `${creationDate.split('/')[0]}/${
  //   creationDate.split('/')[1]
  // }`
  // drawText(shortCreationDate, 314, 189, locationSize)

  // // Date création
  // drawText('Date de création:', 479, 130, 6)
  // drawText(`${creationDate} à ${creationHour}`, 470, 124, 6)

  const generatedQR = await generateQR(data);

  const qrImage = await pdfDoc.embedPng(generatedQR);

  page1.drawImage(qrImage, {
    x: page1.getWidth() - 156,
    y: 122,
    width: 92,
    height: 92,
  });

  pdfDoc.addPage();
  const page2 = pdfDoc.getPages()[1];
  page2.drawImage(qrImage, {
    x: 50,
    y: page2.getHeight() - 350,
    width: 300,
    height: 300,
  });

  const pdfBytes = await pdfDoc.save();

  return new Blob([pdfBytes], { type: "application/pdf" });
}

function getIdealFontSize(font, text, maxWidth, minSize, defaultSize) {
  let currentSize = defaultSize;
  let textWidth = font.widthOfTextAtSize(text, defaultSize);

  while (textWidth > maxWidth && currentSize > minSize) {
    textWidth = font.widthOfTextAtSize(text, --currentSize);
  }

  return textWidth > maxWidth ? null : currentSize;
}

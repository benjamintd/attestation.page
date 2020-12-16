import { PDFDocument, StandardFonts } from "pdf-lib";

import { generateQR } from "./util";

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

  drawText(`${firstname} ${lastname}`, 119, 665);
  drawText(birthday, 119, 645);
  drawText(lieunaissance, 312, 645);
  drawText(`${address}, ${zipcode} ${town}`, 133, 625);

  if (reason === "travail") {
    drawText("x", 73, 540, 12);
  }
  if (reason === "sante") {
    drawText("x", 73, 508, 12);
  }
  if (reason === "famille") {
    drawText("x", 73, 474, 12);
  }
  if (reason === "handicap") {
    drawText("x", 73, 441, 12);
  }
  if (reason === "convocation") {
    drawText("x", 73, 418, 12);
  }
  if (reason === "missions") {
    drawText("x", 73, 397, 12);
  }
  if (reason === "transit") {
    drawText("x", 73, 363, 12);
  }
  if (reason === "animaux") {
    drawText("x", 73, 330, 12);
  }

  let locationSize = getIdealFontSize(font, profile.town, 83, 7, 11);

  if (!locationSize) {
    alert(
      "Le nom de la ville risque de ne pas être affiché correctement en raison de sa longueur. " +
        'Essayez d\'utiliser des abréviations ("Saint" en "St." par exemple) quand cela est possible.'
    );
    locationSize = 7;
  }

  drawText(profile.town, 105, 286, locationSize);
  drawText(`${profile.datesortie}`, 91, 267, 11);
  drawText(`${profile.heuresortie}`, 312, 267, 11);

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

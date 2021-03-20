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
    `Créé le ${creationDate} à ${creationHour}`,
    `Nom : ${lastname}`,
    `Prénom : ${firstname}`,
    `Naissance : ${birthday} à ${lieunaissance}`,
    `Adresse : ${address} ${zipcode} ${town}`,
    `Sortie : ${datesortie} à ${heuresortie}`,
    `Code motif: ${reason}`,
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
  const drawText = (text, x, y, size = 11, page = 0) => {
    const p = pdfDoc.getPages()[page];
    p.drawText(text, { x, y, size, font });
  };

  drawText(`${firstname} ${lastname}`, 119, 667);
  drawText(birthday, 149, 651);
  drawText(lieunaissance, 240, 651);
  drawText(`${address}, ${zipcode} ${town}`, 133, 637);

  if (reason === "travail") {
    drawText("x", 60, 548, 12);
  }
  if (reason === "sante") {
    drawText("x", 60, 484, 12);
  }
  if (reason === "famille") {
    drawText("x", 60, 409, 12);
  }
  if (reason === "handicap") {
    drawText("x", 60, 348, 12);
  }
  if (reason === "convocation") {
    drawText("x", 60, 301, 12);
  }
  if (reason === "missions") {
    drawText("x", 60, 223, 12);
  }
  if (reason === "transit") {
    drawText("x", 60, 170, 12);
  }
  if (reason === "animaux") {
    drawText("x", 60, 116, 12);
  }

  if (reason === "livraisons") {
    drawText("x", 60, 582, 12, 1);
  }
  if (reason === "achats") {
    drawText("x", 60, 529, 12, 1);
  }
  if (reason === "demenagement") {
    drawText("x", 60, 478, 12, 1);
  }
  if (reason === "sport") {
    drawText("x", 60, 410, 12, 1);
  }
  if (reason === "demarche") {
    drawText("x", 60, 327, 12, 1);
  }
  if (reason === "culte") {
    drawText("x", 60, 272, 12, 1);
  }
  if (reason === "rassemblement") {
    drawText("x", 60, 241, 12, 1);
  }

  let locationSize = getIdealFontSize(font, profile.town, 83, 7, 11);

  if (!locationSize) {
    alert(
      "Le nom de la ville risque de ne pas être affiché correctement en raison de sa longueur. " +
        'Essayez d\'utiliser des abréviations ("Saint" en "St." par exemple) quand cela est possible.'
    );
    locationSize = 7;
  }

  drawText(profile.town, 105, 170, locationSize, 1);
  drawText(`${profile.datesortie}`, 79, 155, 11, 1);
  drawText(`${profile.heuresortie}`, 150, 155, 11, 1);

  const generatedQR = await generateQR(data);

  const qrImage = await pdfDoc.embedPng(generatedQR);

  const page2 = pdfDoc.getPages()[1];
  page2.drawImage(qrImage, {
    x: page2.getWidth() - 250,
    y: 45,
    width: 92,
    height: 92,
  });

  pdfDoc.addPage();
  const page3 = pdfDoc.getPages()[2];
  page3.drawImage(qrImage, {
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

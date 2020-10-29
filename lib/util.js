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

export function downloadBlob(blob, fileName) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
}

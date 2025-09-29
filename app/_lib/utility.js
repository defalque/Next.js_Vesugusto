export function formatNumberForAria(phone) {
  if (!phone) return "";

  // Separiamo ogni cifra con uno spazio, per forzare lettura cifra per cifra
  return phone
    .replace(/^\+/, "più ")
    .replace(/[().-]/g, " ")
    .split("")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

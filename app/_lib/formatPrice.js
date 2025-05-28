export function formatPrice(price) {
  const numericPrice = Number(price);
  if (Number.isInteger(numericPrice)) {
    return `${numericPrice},00 €`;
  } else {
    return `${numericPrice.toFixed(2).replace(".", ",")} €`;
  }
}

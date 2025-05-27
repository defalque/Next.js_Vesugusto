export function formatDate(dataString) {
  const months = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];

  const data = new Date(dataString);
  const day = data.getDate();
  const month = months[data.getMonth()];
  const year = data.getFullYear();

  return `${day} ${month}, ${year}`;
}

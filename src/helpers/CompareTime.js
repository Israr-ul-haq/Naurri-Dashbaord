export function compare(dateTimeA, dateTimeB) {
  if (dateTimeA > dateTimeB) return 1;
  else if (dateTimeA < dateTimeB) return -1;
  else return 0;
}
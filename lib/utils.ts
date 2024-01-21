export function getDateFormatted(time: number): string {
  // Convert the Unix timestamp to a Date object
  const date = new Date(time);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getMarvinTimezoneOffset(date = new Date()): number {
  // Note: Marvin inverts the sign if it's behind GMT
  return -date.getTimezoneOffset()
}

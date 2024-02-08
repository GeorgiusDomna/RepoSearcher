/**
 * Helper function to ensure a number is represented with two digits.
 * @param num The number to be formatted.
 * @returns A string representing the number with two digits.
*/
const twoDigits = (num: number) => num.toString().padStart(2, '0');
  
/**
 * Formats a date string in the format "yyyy-mm-ddThh:mm:ssZ" into "yyyy/mm/dd hh:mm:ss".
 * @param inputDate The date string to be formatted.
 * @returns A string representing the formatted date and time.
*/
export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const year = twoDigits(date.getFullYear());
  const month = twoDigits(date.getMonth() + 1);
  const day = twoDigits(date.getDate());
  const hours = twoDigits(date.getHours());
  const minutes = twoDigits(date.getMinutes());
  const seconds = twoDigits(date.getSeconds());
  
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
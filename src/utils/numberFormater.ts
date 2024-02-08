/**
 * Format a number using compact notation.
 * @param num The number to be formatted.
 * @returns A string representation of the formatted number.
*/
export const numberFormater = (num: number): string => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
  }).format(num);
}
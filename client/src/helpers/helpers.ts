export const capitalizeWords = (
  str: string,
  delimeter: string = " "
): string => {
  return str
    .split(delimeter)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

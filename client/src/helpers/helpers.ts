export const capitalizeWords = (
  str: string,
  delimeter: string = " "
): string => {
  return str
    .split(delimeter)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const pausePromise = async (ms: number) =>
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

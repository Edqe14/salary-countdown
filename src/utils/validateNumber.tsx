export const validateNumber = <T = number | null>(value: any, fallback: T) => {
  let parsed = parseInt(value, 10);

  if (isNaN(parsed)) {
    return fallback;
  }

  return parsed;
}
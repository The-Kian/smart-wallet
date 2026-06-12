export const toDigitsOnly = (value: string) => value.replace(/\D/g, "");

export const formatDigitsAsCurrencyInput = (digits: string) => {
  const normalizedDigits = toDigitsOnly(digits).replace(/^0+(?=\d)/, "");

  if (!normalizedDigits) {
    return "";
  }

  const pounds = normalizedDigits.slice(0, -2) || "0";
  const pence = normalizedDigits.slice(-2).padStart(2, "0");

  return `${Number(pounds)}.${pence}`;
};

export const digitsToPence = (digits: string) => Number(toDigitsOnly(digits) || "0");
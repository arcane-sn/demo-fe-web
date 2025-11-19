/**
 * Format number to Indonesian locale string
 * @param value - Number to format
 * @returns Formatted string with Indonesian locale (e.g., "1.000.000")
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString("id-ID");
};

/**
 * Format currency to IDR format
 * @param value - Amount to format
 * @returns Formatted string with IDR prefix (e.g., "IDR 1.000.000")
 */
export const formatCurrency = (value: number): string => {
  return `IDR ${formatNumber(value)}`;
};

/**
 * Format currency to USD format for tooltip
 * @param value - Amount to format (in thousands)
 * @returns Formatted string with USD currency format
 */
export const formatCurrencyUSD = (value: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value * 1000);
};


/**
 * Format amount in NPR (Nepalese Rupees). No conversion - display value as-is.
 */
export function formatPrice(amount) {
  if (amount == null || isNaN(amount)) return 'NPR 0.00';
  return `NPR ${Number(amount).toFixed(2)}`;
}

export const formatAmount = (amount: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Math.abs(amount)); // use absolute value to avoid formatting negative sign twice

  return amount >= 0 ? `+${formatted}` : `-${formatted}`;
};

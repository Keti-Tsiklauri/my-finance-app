export const formatAmount = (amount: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Math.abs(amount)); // use absolute value to avoid formatting negative sign twice

  return amount >= 0 ? `+${formatted}` : `-${formatted}`;
};

//format 3455,34 as $3,455.34
export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

// function that formats 2000 to $2.000
export function formatDollarWithDot(num: number | string): string {
  const number = typeof num === "string" ? parseFloat(num) : num;
  if (isNaN(number)) return "$0";

  return (
    "$" +
    Math.floor(number) // remove decimals if any
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}

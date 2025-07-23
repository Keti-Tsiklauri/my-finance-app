export function calculatePercentage(total: number, target: number): number {
  if (target === 0) return 0;
  const percentage = (total / target) * 100;
  return Math.min(Math.max(Number(percentage.toFixed(1)), 0), 100);
}

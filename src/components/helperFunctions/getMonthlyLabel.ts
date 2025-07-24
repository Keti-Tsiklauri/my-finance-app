export function getMonthlyLabel(dateString: string) {
  const date = new Date(dateString);
  const day = date.getUTCDate();

  // Function to get ordinal suffix
  function getOrdinalSuffix(n: number) {
    if (n >= 11 && n <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return `monthly-${day}${getOrdinalSuffix(day)}`;
}

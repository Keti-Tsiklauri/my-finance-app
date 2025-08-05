// utils/billHelpers.ts
export interface Bill {
  amount: number;
  date: string;
  [key: string]: any;
}

export function calculateBillData(bills: Bill[], soonThreshold = 7) {
  const totalBills = bills.reduce((sum, t) => sum + t.amount, 0);

  const today = new Date();

  const paidBills = bills.filter((t) => new Date(t.date) < today);

  const upcomingBills = bills.filter((t) => new Date(t.date) >= today);

  const dueSoonBills = upcomingBills.filter((t) => {
    const todayTime = new Date().getTime();
    const dueDate = new Date(t.date).getTime();
    const diffDays = (dueDate - todayTime) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= soonThreshold;
  });

  // Calculate totals
  const totalPaid = paidBills.reduce((sum, b) => sum + b.amount, 0);
  const paidCount = paidBills.length;

  const totalUpcoming = upcomingBills.reduce((sum, b) => sum + b.amount, 0);
  const upcomingCount = upcomingBills.length;

  const totalDueSoon = dueSoonBills.reduce((sum, b) => sum + b.amount, 0);
  const dueSoonCount = dueSoonBills.length;

  return {
    totalBills,
    paidBills,
    upcomingBills,
    dueSoonBills,
    totalPaid,
    paidCount,
    totalUpcoming,
    upcomingCount,
    totalDueSoon,
    dueSoonCount,
  };
}

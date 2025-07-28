"use client";
import TotalBills from "../recurring-bills/TotalBills";
import SeeMore from "./SeeMore";
import useData from "@/app/hooks/useData";
import { calculateBillData } from "../helperFunctions/billhelpers";
export default function RecurringBillsSection() {
  const data = useData();
  if (!data) return <p>Loading...</p>;

  const bills = data.transactions.filter((t) => t.category === "Bills");
  const { totalBills, paidBills, upcomingBills, dueSoonBills } =
    calculateBillData(bills);
  const totalPaid = paidBills.reduce((sum, b) => sum + b.amount, 0);
  const totalUpcoming = upcomingBills.reduce((sum, b) => sum + b.amount, 0);
  const totalDueSoon = dueSoonBills.reduce((sum, b) => sum + b.amount, 0);
  console.log(totalPaid, totalUpcoming, totalDueSoon);
  return (
    <div>
      <SeeMore
        section="recurring bills"
        action="see details"
        href="/recurring-bills"
      />
      <div>
        <TotalBills bills={bills} />
      </div>
    </div>
  );
}

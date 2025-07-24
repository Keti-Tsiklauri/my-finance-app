"use client";
import BillsList from "@/components/recurring-bills/BillsList";
import TotalBills from "@/components/recurring-bills/TotalBills";
import useData from "@/components/useData";
export default function RecurringBills() {
  const data = useData();
  if (!data) return <p>Loading...</p>;

  const { transactions } = data;
  const bills = transactions.filter((t) => t.category === "Bills");

  return (
    <div>
      <p
        className="h-[38px]
    font-public-sans font-bold
    text-[32px] leading-[120%]
    text-[#201F24]"
      >
        recurring bills
      </p>
      <div className="flex flex-col xxl:flex-row gap-8 mt-6">
        <TotalBills bills={bills} />
        <BillsList bills={bills} />
      </div>
    </div>
  );
}

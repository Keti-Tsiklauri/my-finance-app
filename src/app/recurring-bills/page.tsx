"use client";
import useData from "@/app/hooks/useData";
import BillsWrapper from "@/components/recurring-bills/BillsWrapper";

export default function RecurringBills() {
  const data = useData();
  if (!data) return <p>Loading...</p>;

  const bills = data.transactions.filter((t) => t.category === "Bills");

  return (
    <div>
      <p className="w-[343px] md:w-[700px] xxl:w-[1180px] h-[38px] font-bold text-[32px] leading-[120%] text-[#201F24] mx-auto">
        recurring bills
      </p>
      <BillsWrapper bills={bills} />
    </div>
  );
}

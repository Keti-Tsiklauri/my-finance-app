"use client";
import useData from "@/app/hooks/useData";
import BillsWrapper from "@/components/recurring-bills/BillsWrapper";

// ✅ Shared loader
function Loader() {
  return (
    <div className="flex justify-center items-center h-[120px]">
      <div className="w-12 h-12 border-4 border-[#277C78] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function RecurringBills() {
  const data = useData();

  // ✅ Show loader while data is loading
  if (!data) return <Loader />;

  const bills = data.transactions.filter((t) => t.category === "Bills");

  return (
    <div>
      <p className="w-[343px] md:w-[700px] xxl:w-[1180px] h-[38px] font-bold text-[32px] leading-[120%] text-[#201F24] order-0 flex-none flex-grow-0 mx-auto">
        recurring bills
      </p>
      <BillsWrapper bills={bills} />
    </div>
  );
}

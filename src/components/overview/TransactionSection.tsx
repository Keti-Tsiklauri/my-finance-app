"use client";
import TransactionList from "@/components/transactions/TransactionList";
import useData from "@/app/hooks/useData";
import SeeMore from "./SeeMore";

// ✅ Reusable loader (same style as others)
function Loader() {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <div className="w-12 h-12 border-4 border-[#277C78] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function TransactionSection() {
  const data = useData();

  // ✅ Show loader while fetching
  if (!data) return <Loader />;

  const { transactions } = data;
  const visibleTransactions = transactions.slice(0, 5);

  return (
    <div className="flex flex-col items-start pt-4 w-[343px] h-[360px] md:w-[700px] mx-auto mt-6 pl-[20px] pr-[20px]">
      <SeeMore section="transactions" action="view all" href="/transactions" />
      <div className="md:w-[620px] mx-auto">
        <TransactionList transactions={visibleTransactions} currentPage={1} />
      </div>
    </div>
  );
}

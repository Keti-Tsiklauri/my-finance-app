"use client";
import TransactionList from "@/components/transactions/TransactionList";
import useData from "@/app/hooks/useData";
import SeeMore from "./SeeMore";
export default function TransactionSection() {
  const data = useData();
  if (!data) return <p>Loading...</p>;
  const { transactions } = data;
  const visibleTransactions = transactions.slice(0, 5);
  return (
    <div className="flex flex-col items-start pt-4 w-[343px] h-[400px] md:w-[700px] xxl:w-[600px] bg-white rounded-[12px] mx-auto mt-6">
      <SeeMore section="transactions" action="view all" />
      <div className=" md:w-[620px] mx-auto xxl:w-[600px]">
        <TransactionList
          transactions={visibleTransactions}
          currentPage={1}
          className="xxl:w-[480px] "
        />
      </div>
    </div>
  );
}

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
    <div className="flex flex-col items-start pt-4 w-[343px] h-[360px] md:w-[700px]  mx-auto mt-6 pl-[20px] pr-[20px]">
      <SeeMore section="transactions" action="view all" href="/transactions" />
      <div className=" md:w-[620px] mx-auto ">
        <TransactionList transactions={visibleTransactions} currentPage={1} />
      </div>
    </div>
  );
}

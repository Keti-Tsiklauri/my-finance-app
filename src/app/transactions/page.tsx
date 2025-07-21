import FilterDropDown from "@/components/transactions/FilterDropDown";
import TransactionListHeader from "@/components/transactions/TransactionListHeader";
import TransactionsPageWrapper from "@/components/transactions/TransactionPageWrapper";
export default function Transactions() {
  const sort = [
    { id: 0, name: "Latest" },
    { id: 1, name: "Oldest" },
    { id: 2, name: "A to Z" },
    { id: 3, name: "Z to A" },
    { id: 4, name: "Highest" },
    { id: 5, name: "Lowest" },
  ];
  return (
    <div>
      <h1 className="w-[343px] md:w-[700px]  xxl:w-[1180px] h-[38px] font-bold text-[32px] leading-[120%] text-[#201F24] order-0 flex-none flex-grow-0 mx-auto">
        Transactions
      </h1>

      <TransactionListHeader />
      <div className="pb-[74px] md:pb-[80px]">
        <TransactionsPageWrapper />
      </div>
    </div>
  );
}

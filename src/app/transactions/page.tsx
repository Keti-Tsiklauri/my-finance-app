import TransactionsPageWrapper from "@/components/transactions/TransactionPageWrapper";
export default function Transactions() {
  return (
    <div>
      <h1 className="w-[343px] md:w-[700px]  xxl:w-[1180px] h-[38px] font-bold text-[32px] leading-[120%] text-[#201F24] order-0 flex-none flex-grow-0 mx-auto">
        Transactions
      </h1>

      <div className="pb-[74px] md:pb-[80px]">
        <TransactionsPageWrapper />
      </div>
    </div>
  );
}

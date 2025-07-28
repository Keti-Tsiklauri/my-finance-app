import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";

export default function RecurringBillsHeader() {
  return (
    <div className="hidden xxl:pt-0  mx-auto md:flex flex-row items-center py-[12px] gap-[32px] w-[660px] h-[42px] border-b border-[#F2F2F2] self-stretch order-1 flex-none box-border">
      {/* Recipient / Sender */}
      <p className="w-[340px] h-[18px] text-[12px] leading-[18px] font-normal text-[#696868] flex-none order-0 grow text-left">
        Recipient / Sender
      </p>

      {/* Due Date */}
      <p className="w-[120px] h-[18px] text-[12px] leading-[18px] font-normal text-[#696868] flex-none order-1 text-left">
        Due Date
      </p>

      {/* Amount */}
      <p className="w-[100px] h-[18px] text-[12px] leading-[18px] font-normal text-[#696868] text-right flex-none order-2">
        Amount
      </p>
    </div>
  );
}

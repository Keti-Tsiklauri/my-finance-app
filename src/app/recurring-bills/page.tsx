"use client";

import BillsWrapper from "@/components/recurring-bills/BillsWrapper";

export default function RecurringBills() {
  return (
    <div>
      <p className="w-[343px] md:w-[700px] xxl:w-[1180px] h-[38px] font-bold text-[32px] leading-[120%] text-[#201F24] order-0 flex-none flex-grow-0 mx-auto">
        recurring bills
      </p>
      <BillsWrapper />
    </div>
  );
}

"use client";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";

import Image from "next/image";
import { makePositiveNumber } from "../helperFunctions/makePositiveNumber";
import { calculateBillData } from "../helperFunctions/billHelpers";

export interface Bill {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export default function TotalBills({ bills }: { bills: Bill[] }) {
  // ✅ Destructure everything from the helper
  const {
    totalBills,
    totalPaid,
    paidCount,
    totalUpcoming,
    upcomingCount,
    totalDueSoon,
    dueSoonCount,
  } = calculateBillData(bills);

  return (
    <div className="flex flex-col w-[343px] mx-auto md:flex-row md:w-[700px] xxl:flex-col xxl:w-[340px] md:justify-between gap-3">
      {/* Total bills card */}
      <div className="flex items-center p-[24px_20px] gap-[20px] h-[118px] bg-[#201F24] rounded-[12px] md:w-[330px]">
        <Image
          src="images/recurring-bills/icon.svg"
          width={30}
          height={25}
          alt="recurring bills"
        />
        <div>
          <p className="h-[21px] font-normal text-[14px] leading-[150%] text-white">
            {capitalizeEachWord("total bills")}
          </p>
          <p className="h-[38px] font-bold text-[32px] leading-[120%] text-white">
            ${makePositiveNumber(totalBills)}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="w-[343px] px-[20px] flex flex-col gap-1  h-[118px]  p-[10px_20px]  bg-white rounded-[12px] md:w-[330px]">
        <p className="h-[24px] font-bold text-[16px] leading-[150%] text-[#201F24]">
          {capitalizeEachWord("summary")}
        </p>

        {/* Paid bills */}
        <div className="flex justify-between bg-white">
          <p className="h-[18px] font-['Public_Sans'] font-normal text-[12px] leading-[18px] text-[#696868]">
            {capitalizeEachWord("paid bills")}
          </p>
          <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[18px] text-[#201F24]">
            {paidCount} (${makePositiveNumber(totalPaid)})
          </p>
        </div>

        {/* Total upcoming */}
        <div className="flex justify-between">
          <p className="h-[18px] font-['Public_Sans'] font-normal text-[12px] leading-[18px] text-[#696868]">
            {capitalizeEachWord("total upcoming")}
          </p>
          <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[18px] text-[#201F24]">
            {upcomingCount} (${makePositiveNumber(totalUpcoming)})
          </p>
        </div>

        {/* Due soon */}
        <div className="flex justify-between">
          <p className="h-[18px] font-['Public_Sans'] font-normal text-[12px] leading-[18px] text-[#C94736]">
            {capitalizeEachWord("due soon")}
          </p>
          <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[18px] text-[#C94736]">
            {dueSoonCount} (${makePositiveNumber(totalDueSoon)})
          </p>
        </div>
      </div>
    </div>
  );
}

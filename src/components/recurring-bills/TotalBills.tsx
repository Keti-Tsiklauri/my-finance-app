"use client";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import { formatAmount } from "../helperFunctions/formatAmount";
import useData from "../../app/hooks/useData";
import Image from "next/image";
import { makePositiveNumber } from "../helperFunctions/makePositiveNumber";
export interface Bill {
  avatar: string;
  name: string;
  category: string; // should likely be "Bills" but allow any string
  date: string; // ISO string like "2025-08-02T09:25:11Z"
  amount: number; // negative for payments
  recurring: boolean;
}

export default function TotalBills({ bills }: { bills: Bill[] }) {
  //calculate total bills
  // Filter by category "Bills"

  // Calculate total
  const totalBills = bills.reduce((sum, t) => sum + t.amount, 0);

  const today = new Date();
  const soonThreshold = 7; // days for "due soon"

  const paidBills = bills.filter((t) => new Date(t.date) < today);

  const upcomingBills = bills.filter((t) => new Date(t.date) >= today);

  const dueSoonBills = upcomingBills.filter((t) => {
    const todayTime = new Date().getTime();

    const dueSoonBills = upcomingBills.filter((t) => {
      const dueDate = new Date(t.date).getTime();
      const diffDays = (dueDate - todayTime) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= soonThreshold;
    });
  });

  // Calculate totals
  //paid bills number and amount
  const totalPaid = paidBills.reduce((sum, b) => sum + b.amount, 0);
  const paidCount = paidBills.length;
  //upcoming bills number and amount
  const totalUpcoming = upcomingBills.reduce((sum, b) => sum + b.amount, 0);
  const upcomingCount = upcomingBills.length;
  //soon must pay bills number and amount
  const totalDueSoon = dueSoonBills.reduce((sum, b) => sum + b.amount, 0);
  const dueSoonCount = dueSoonBills.length;
  console.log({ totalPaid, totalUpcoming, totalDueSoon });
  console.log("biils", bills);
  return (
    <div className="flex  flex-col  w-[343px] mx-auto md:flex-row md:w-[700px] xxl:flex-col xxl:w-[340px] md:justify-between">
      <div className="flex items-center p-[24px_20px] gap-[20px] h-[118px] bg-[#201F24] rounded-[12px] md:w-[330px] ">
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
      <div className="w-[343px] px-[20px] flex flex-col gap-2 md:w-[330px]">
        <p className="h-[24px] font-bold text-[16px] leading-[150%] text-[#201F24]">
          {capitalizeEachWord("summary")}
        </p>

        {/* paid bills */}
        <div className="flex justify-between bg-white">
          <p className="h-[18px] font-['Public_Sans'] font-normal text-[12px] leading-[18px] text-[#696868]">
            {" "}
            {capitalizeEachWord("paid bills")}
          </p>
          <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[18px]  text-[#201F24]">
            {paidCount}(${makePositiveNumber(totalPaid)})
          </p>
        </div>
        {/* total upcoming */}
        <div className="flex justify-between">
          <p className="h-[18px] font-['Public_Sans'] font-normal text-[12px] leading-[18px] text-[#696868]">
            {" "}
            {capitalizeEachWord("total upcoming")}
          </p>
          <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[18px]  text-[#201F24]">
            {upcomingCount}(${makePositiveNumber(totalUpcoming)})
          </p>
        </div>
        {/* total upcoming */}
        <div className="flex justify-between">
          <p className="h-[18px] font-['Public_Sans'] font-normal text-[12px] leading-[18px] text-[#C94736]">
            {" "}
            {capitalizeEachWord("due soon")}
          </p>
          <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[18px]  text-[#C94736]">
            {dueSoonCount}(${makePositiveNumber(totalDueSoon)})
          </p>
        </div>
      </div>
    </div>
  );
}

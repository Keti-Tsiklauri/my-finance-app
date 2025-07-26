export interface Bill {
  avatar: string;
  name: string;
  category: string; // should likely be "Bills" but allow any string
  date: string; // ISO string like "2025-08-02T09:25:11Z"
  amount: number; // negative for payments
  recurring: boolean;
}
import Image from "next/image";
import { getMonthlyLabel } from "../helperFunctions/getMonthlyLabel";

import { makePositiveNumber } from "../helperFunctions/makePositiveNumber";
export default function BillsList({ bills }: { bills: Bill[] }) {
  return (
    <div className="flex flex-col gap-5 w-[300px] mx-auto  md:mt-3  md:w-[700px] xxl:mt-0">
      {bills.map((elem, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-4"
        >
          <div className="flex items-center gap-2 md:w-[340px]">
            <div className="w-8 h-8 bg-[#F8F4F0] rounded-full flex-none order-0 grow-0 relative overflow-hidden">
              <Image
                src={elem.avatar}
                alt="avatar"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            </div>

            <p className="h-[21px] font-['Public_Sans'] font-bold text-[14px] leading-[21px] text-[#201F24]">
              {elem.name}
            </p>
          </div>

          {/* month and amount */}
          <div className="flex justify-between gap-1 md:w-[260px]">
            <div className="flex gap-1 items-center">
              <p className="h-[18px] font-['Public_Sans'] font-normal text-[12px] leading-[18px] text-[#277C78]">
                {getMonthlyLabel(elem.date)}
              </p>
              <Image
                src={
                  elem.recurring
                    ? "images/recurring-bills/paid.svg"
                    : "images/recurring-bills/unpaid.svg"
                }
                alt="paid or unpaid image"
                width={13}
                height={13}
              />
            </div>
            <p
              className={`h-[21px] font-['Public_Sans'] font-bold text-[14px] leading-[21px] text-right ${
                elem.recurring ? "text-[#201F24]" : "text-[#C94736]"
              }`}
            >
              ${makePositiveNumber(elem.amount)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

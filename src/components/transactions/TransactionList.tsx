import { Transaction } from "@/types/types";
import Image from "next/image";
import { formatDate } from "../helperFunctions/formatDate";
import { formatAmount } from "../helperFunctions/formatAmount";

interface TransactionListProps {
  transactions: Transaction[];
  currentPage: number;
  className?: string; // ✅ allows overriding widths
}

export default function TransactionList({
  transactions,
  className,
}: TransactionListProps) {
  return (
    <div
      className={`w-full mx-auto  h-full bg-white rounded-[12px] px-4 py-4 ${
        className || "xxl:max-w-[996px]"
      }`}
    >
      {/* ✅ Mobile Layout */}
      <div className="md:hidden w-full max-w-[380px] mx-auto">
        {transactions.map((elem, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full mb-4"
          >
            <div className="flex items-center gap-3 w-[190px] h-[43px]">
              <Image
                src={elem.avatar}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex flex-col justify-center items-start max-w-full">
                <p className="h-[21px] font-bold text-[14px] leading-[21px] text-[#201F24] truncate max-w-[160px]">
                  {elem.name}
                </p>
                <p className="h-[18px] text-[12px] leading-[18px] font-normal text-[#696868] truncate max-w-[160px]">
                  {elem.category}
                </p>
              </div>
            </div>

            <div className="w-[112px] h-[43px] flex flex-col justify-center">
              <p className="h-[21px] text-[14px] leading-[21px] font-bold text-right text-[#201F24]">
                {formatAmount(elem.amount)}
              </p>
              <p className="h-[18px] text-[12px] leading-[18px] font-normal text-[#696868] text-right">
                {formatDate(elem.date)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Desktop Layout */}
      <div className="hidden md:flex flex-col gap-5 h-full">
        {transactions.map((elem, index) => (
          <div
            key={index}
            className={`flex items-center gap-8 rounded-[8px] self-stretch 
              md:h-[40px] 
              xxl:h-[40px] 
              ${className || "xxl:max-w-[996px]"}`}
          >
            {/* Avatar + Name */}
            <div className="flex items-center gap-4 flex-grow min-w-0">
              <Image
                src={elem.avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="font-semibold truncate">{elem.name}</p>
            </div>

            {/* Category */}
            <div className="flex flex-col justify-center items-start gap-1 min-w-[80px] max-w-[120px]">
              <p className="text-[12px] leading-[18px] font-normal text-[#696868] truncate">
                {elem.category}
              </p>
            </div>

            {/* Date */}
            <div className="flex flex-col items-start p-0 gap-2 min-w-[88px] max-w-[120px]">
              <p className="font-sans font-normal text-[12px] leading-[18px] text-[#696868] w-full">
                {formatDate(elem.date)}
              </p>
            </div>

            {/* Amount */}
            <div
              className={`flex flex-col justify-center items-end gap-2 min-w-[88px] max-w-[200px]
                ${elem.amount > 0 ? "text-[#277C78]" : "text-[#201F24]"}`}
            >
              <p className="font-semibold">{formatAmount(elem.amount)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Transaction } from "@/types/types";
import Image from "next/image";
import { formatDate } from "../helperFunctions/formatDate";
import { formatAmount } from "../helperFunctions/formatAmount";

interface TransactionListProps {
  transactions: Transaction[];
  currentPage: number;
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  return (
    <div className="w-full max-w-[996px] mx-auto px-4 h-[720px]">
      {/* Mobile Layout */}
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

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col gap-5 h-[600px]">
        {transactions.map((elem, index) => (
          <div
            key={index}
            className="flex items-center gap-8 rounded-[8px] self-stretch
            md:w-[624px] md:h-[40px] md:p-0
            xxl:w-[996px] xxl:h-[40px] xxl:px-4 xxl:py-0 mx-auto"
          >
            <div className="flex items-center gap-4 w-[272px] h-[40px] flex-grow p-0 md:w-[272px] xxl:w-[428px]">
              <Image
                src={elem.avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="font-semibold">{elem.name}</p>
            </div>

            <div className="flex flex-col justify-center items-start gap-1 h-[18px] w-[80px] md:w-[80px] xxl:w-[120px] flex-none order-1 flex-grow-0">
              <p className="text-[12px] leading-[18px] font-normal text-[#696868]">
                {elem.category}
              </p>
            </div>

            <div className="flex flex-col items-start p-0 gap-2 w-[88px] h-[18px] xxl:w-[120px] flex-none order-2 flex-grow-0">
              <p className="font-sans font-normal text-[12px] leading-[18px] text-[#696868] w-full">
                {formatDate(elem.date)}
              </p>
            </div>

            <div
              className={`flex flex-col justify-center items-end gap-2
              md:w-[88px] md:h-[21px] xxl:w-[200px] xxl:h-[21px]
              flex-none order-3 flex-grow-0 ${
                elem.amount > 0 ? "text-[#277C78]" : "text-[#201F24]"
              }`}
            >
              <p className="font-semibold">{formatAmount(elem.amount)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

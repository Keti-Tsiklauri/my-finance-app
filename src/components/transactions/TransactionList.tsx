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
  currentPage,
}: TransactionListProps) {
  const itemsPerPage = 10;

  const start = (currentPage - 1) * itemsPerPage;
  const currentTransactions = transactions.slice(start, start + itemsPerPage);

  return (
    <div className="flex flex-col gap-5 h-[600px]">
      {currentTransactions.map((elem, index) => (
        <div
          key={index}
          className="flex flex-row items-center gap-8 rounded-[8px] flex-none self-stretch
          md:w-[624px] md:h-[40px] md:p-0
          xxl:w-[996px] xxl:h-[40px] xxl:px-4 xxl:py-0 mx-auto"
        >
          <div className="flex flex-row items-center gap-[16px] w-[272px] h-[40px] flex-none order-0 flex-grow p-0 md:w-[272px] xxl:w-[428px]">
            <Image
              src={elem.avatar}
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <p>{elem.name}</p>
          </div>

          <div className="flex flex-col justify-center items-start gap-[6px] h-[18px] flex-none order-1 flex-grow-0 w-[80px] md:w-[80px] xxl:w-[120px]">
            <p>{elem.category}</p>
          </div>

          <div className="flex flex-col items-start p-0 gap-2 flex-none order-2 flex-grow-0 w-[88px] h-[18px] xxl:w-[120px]">
            <p className="w-[88px] h-[18px] font-sans font-normal text-[12px] leading-[18px] text-[#696868] flex-none order-0 self-stretch flex-grow-0">
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
            <p>{formatAmount(elem.amount)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

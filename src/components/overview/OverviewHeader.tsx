"use client";
import useData from "@/app/hooks/useData";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import { formatCurrency } from "../helperFunctions/formatAmount";

// ✅ Shared loader style
function Loader() {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <div className="w-12 h-12 border-4 border-[#277C78] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function OverviewHeader() {
  const data = useData();

  // ✅ Show loader while fetching data
  if (!data) return <Loader />;

  const { balance } = data;

  return (
    <div className="w-[343px] h-[360px] md:h-[120px] flex flex-col justify-between mx-auto md:w-[700px] md:flex-row xxl:w-[1000px] mt-3">
      {/* Current Balance */}
      <div className="flex flex-col items-start p-5 gap-3 w-[343px] h-[111px] bg-[#201F24] rounded-[12px] md:w-[210px] md:h-[110px] xxl:w-[320px] xxl:h-[120px]">
        <p className="h-[21px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-white">
          {capitalizeEachWord("current")}
        </p>
        <p className="h-[38px] font-['Public_Sans'] font-bold text-[32px] leading-[120%] text-white">
          {formatCurrency(balance.current)}
        </p>
      </div>

      {/* Income */}
      <div className="flex flex-col items-start p-5 gap-3 w-[343px] h-[111px] bg-[#FFFFFF] rounded-[12px] md:w-[210px] md:h-[110px] xxl:w-[320px] xxl:h-[120px]">
        <p className="h-[21px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#696868]">
          {capitalizeEachWord("income")}
        </p>
        <p className="h-[38px] font-['Public_Sans'] font-bold text-[32px] leading-[120%] text-[#201F24]">
          {formatCurrency(balance.income)}
        </p>
      </div>

      {/* Expenses */}
      <div className="flex flex-col items-start p-5 gap-3 w-[343px] h-[111px] bg-[#FFFFFF] rounded-[12px] md:w-[210px] md:h-[110px] xxl:w-[320px] xxl:h-[120px]">
        <p className="h-[21px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#696868]">
          {capitalizeEachWord("expenses")}
        </p>
        <p className="h-[38px] font-['Public_Sans'] font-bold text-[32px] leading-[120%] text-[#201F24]">
          {formatCurrency(balance.expenses)}
        </p>
      </div>
    </div>
  );
}

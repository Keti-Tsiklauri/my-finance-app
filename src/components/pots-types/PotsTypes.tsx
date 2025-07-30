"use client";
import useData from "../../app/hooks/useData";
import { formatDollarWithDot } from "../helperFunctions/formatAmount";
import CategoryHeader from "../shared/list-header/CategoryHeader";
import { calculatePercentage } from "../helperFunctions/calculatePercentage";
import Loader from "../modals/Loader";
export default function PotsTypes() {
  const data = useData();

  if (!data) return <Loader />;

  const { pots } = data;

  return (
    <div className="xxl:grid grid-cols-2 gap-6">
      {pots.map((pot, index) => (
        <div
          key={index}
          className="mb-4 w-[343px] md:w-[600px] xxl:w-[500px] mx-auto gap-8 bg-white rounded-[12px] p-[20px_20px]"
        >
          <CategoryHeader color={pot.theme} category={pot.name} />
          {/* Total Saved */}
          <div className="flex items-center justify-between">
            <p className="h-[21px] font-normal text-[14px] leading-[21px] text-[#696868]">
              Total Saved
            </p>
            <p className="h-[38px] font-bold text-[32px] leading-[38px] text-[#201F24]">
              ${pot.target}
            </p>
          </div>

          {/* Progress bar */}
          <div className="h-[8px] bg-[#F8F4F0] rounded-[4px] flex">
            <div
              className="h-full rounded-[4px]"
              style={{
                width: `${(pot.total / pot.target) * 100}%`,
                backgroundColor: pot.theme,
              }}
            />
          </div>

          <div className="flex justify-between">
            <p className="h-[18px] font-public-sans font-bold text-[12px] leading-[150%] text-[#696868]">
              {calculatePercentage(pot.total, pot.target)}%
            </p>
            <p className="font-public-sans font-normal text-[12px] leading-[150%] text-[#696868] h-[18px]">
              Target of {formatDollarWithDot(pot.target)}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-around mt-6">
            <button
              className="
                w-[140px] md:w-[300px] xxl:w-[220px] h-[53px]
                bg-[#F8F4F0]
                rounded-lg
                cursor-pointer
                hover:bg-[#e2dedc]
                transition-colors duration-200
              "
            >
              + Add Money
            </button>
            <button
              className="
                w-[140px] md:w-[300px] h-[53px] xxl:w-[220px]
                bg-[#F8F4F0]
                rounded-lg
                cursor-pointer
                hover:bg-[#e2dedc]
                transition-colors duration-200
              "
            >
              Withdraw
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

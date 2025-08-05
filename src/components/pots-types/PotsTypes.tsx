"use client";
import { useContext, useState } from "react";
import Delete from "../modals/Delete"; // your Delete component
import CategoryHeader from "../shared/list-header/CategoryHeader";
import Loader from "../modals/Loader";
import { GlobalContext } from "../context/GlobalContext";
import { formatDollarWithDot } from "../helperFunctions/formatAmount";
import { calculatePercentage } from "../helperFunctions/calculatePercentage";

export default function PotsTypes() {
  const { data, setData } = useContext(GlobalContext);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  if (!data) return <Loader />;

  const { pots } = data;

  const deletePot = (index: number) => {
    const updatedPots = pots.filter((_, i) => i !== index);
    const updatedData = { ...data, pots: updatedPots };
    setData(updatedData);
    localStorage.setItem("finance-data", JSON.stringify(updatedData));
    setDeleteIndex(null);
  };

  return (
    <div className="mx-auto">
      {pots.map((pot, index) => (
        <div
          key={index}
          className="mb-4 w-[343px] md:w-[700px] mx-auto gap-8 bg-white rounded-[12px] p-[20px_20px]"
        >
          <div className="mx-auto w-[300px] md:w-[600px]">
            <CategoryHeader
              color={pot.theme}
              category={pot.name}
              onMenuClick={() => setDeleteIndex(index)} // Show delete modal on click
            />
            <div className="flex items-center justify-between ">
              <p className="h-[21px] font-normal text-[14px] leading-[21px] text-[#696868]">
                Total Saved
              </p>
              <p className="h-[38px] font-bold text-[32px] leading-[38px] text-[#201F24]">
                ${pot.target}
              </p>
            </div>

            {/* Progress bar */}
            <div className="h-[8px] bg-[#F8F4F0] rounded-[4px] flex ">
              <div
                className="h-full rounded-[4px]"
                style={{
                  width: `${(pot.total / pot.target) * 100}%`,
                  backgroundColor: pot.theme,
                }}
              />
            </div>

            <div className="flex justify-between ">
              <p className="h-[18px] font-public-sans font-bold text-[12px] leading-[150%] text-[#696868]">
                {calculatePercentage(pot.total, pot.target)}%
              </p>
              <p className="font-public-sans font-normal text-[12px] leading-[150%] text-[#696868] h-[18px]">
                Target of {formatDollarWithDot(pot.target)}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6 w-[300px] md:w-[600px] mx-auto">
            <button
              className="
                w-[140px] md:w-[280px] h-[53px]
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
                w-[140px] md:w-[280px] h-[53px] 
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

          {/* Show Delete modal only for selected pot */}
          {deleteIndex === index && (
            <Delete
              text={pot.name}
              type="pot"
              // Add your own onConfirm and onCancel handlers here:
              onConfirm={() => deletePot(index)}
              onCancel={() => setDeleteIndex(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

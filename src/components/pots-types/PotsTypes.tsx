"use client";

import { useContext, useState } from "react";
import EditDelete from "../modals/EditDelete";
import Delete from "../modals/Delete";
import CategoryHeader from "../shared/list-header/CategoryHeader";
import Loader from "../modals/Loader";
import { GlobalContext } from "../context/GlobalContext";
import { formatDollarWithDot } from "../helperFunctions/formatAmount";
import { calculatePercentage } from "../helperFunctions/calculatePercentage";

export default function PotsTypes() {
  const { data, setData } = useContext(GlobalContext);
  const [selectedPotIndex, setSelectedPotIndex] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!data) return <Loader />;

  const { pots } = data;

  const deletePot = (index: number) => {
    const updatedPots = pots.filter((_, i) => i !== index);
    const updatedData = { ...data, pots: updatedPots };
    setData(updatedData);
    localStorage.setItem("finance-data", JSON.stringify(updatedData));
    setShowDeleteConfirm(false);
    setSelectedPotIndex(null);
  };

  return (
    <div className="mx-auto">
      {pots.map((pot, index) => (
        <div
          key={index}
          className="relative mb-4 w-[343px] md:w-[700px] mx-auto gap-8 bg-white rounded-[12px] p-[20px_20px]"
        >
          <div className="mx-auto w-[300px] md:w-[600px]">
            <CategoryHeader
              color={pot.theme}
              category={pot.name}
              onMenuClick={() =>
                setSelectedPotIndex(selectedPotIndex === index ? null : index)
              }
            />
            <div className="flex items-center justify-between">
              <p className="h-[21px] text-[14px] text-[#696868]">Total Saved</p>
              <p className="h-[38px] font-bold text-[32px] text-[#201F24]">
                ${pot.total}
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
              <p className="font-bold text-[12px] text-[#696868]">
                {calculatePercentage(pot.total, pot.target)}%
              </p>
              <p className="font-normal text-[12px] text-[#696868]">
                Target of {formatDollarWithDot(pot.target)}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6 w-[300px] md:w-[600px] mx-auto">
            <button className="w-[140px] md:w-[280px] h-[53px] bg-[#F8F4F0] rounded-lg hover:bg-[#e2dedc] transition-colors">
              + Add Money
            </button>
            <button className="w-[140px] md:w-[280px] h-[53px] bg-[#F8F4F0] rounded-lg hover:bg-[#e2dedc] transition-colors">
              Withdraw
            </button>
          </div>

          {/* Edit/Delete menu */}
          {selectedPotIndex === index && !showDeleteConfirm && (
            <div className="absolute top-10 right-4 z-50">
              <EditDelete
                text={pot.name}
                onEdit={() => console.log("Edit clicked")}
                onDelete={() => setShowDeleteConfirm(true)}
              />
            </div>
          )}

          {/* Delete confirmation modal */}
          {showDeleteConfirm && selectedPotIndex === index && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
              <Delete
                text={pot.name}
                type="pot"
                onConfirm={() => deletePot(index)}
                onCancel={() => {
                  setShowDeleteConfirm(false);
                  setSelectedPotIndex(null);
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

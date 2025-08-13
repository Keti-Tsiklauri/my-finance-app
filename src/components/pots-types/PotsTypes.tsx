"use client";

import { useContext, useState } from "react";
import EditDelete from "../modals/EditDelete";
import Delete from "../modals/Delete";
import EditPot from "../modals/EditPot";
import CategoryHeader from "../shared/list-header/CategoryHeader";
import Loader from "../modals/Loader";
import { GlobalContext } from "../context/GlobalContext";
import { formatDollarWithDot } from "../helperFunctions/formatAmount";
import { calculatePercentage } from "../helperFunctions/calculatePercentage";
import AddMoney from "../modals/AddMoney";
import Withdraw from "../modals/Withdraw";
const themeArray = [
  { theme: "#277C78", text: "green" },
  { theme: "#82C9D7", text: "cyan" },
  { theme: "#F2CDAC", text: "yellow" },
  { theme: "#626070", text: "navy" },
  { theme: "#C94736", text: "red" },
  { theme: "#826CB0", text: "purple" },
  { theme: "#597C7C", text: "turquoise" },
];
export default function PotsTypes() {
  const { data, setData } = useContext(GlobalContext);
  const [selectedPotIndex, setSelectedPotIndex] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editPotIndex, setEditPotIndex] = useState<number | null>(null);
  const [withdrawIndex, setWithdrawIndex] = useState<number | null>(null);
  const [addMoneyIndex, setAddMoneyIndex] = useState<number | null>(null);
  if (!data) return <Loader />;

  const { pots } = data;
  console.log(pots);
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
            <div className="h-[8px] bg-[#F8F4F0] rounded-[4px] flex mt-2">
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
            {/* Buttons */}
            <div className="flex justify-between mt-6 w-[300px] md:w-[600px] mx-auto">
              <button
                className="w-[140px] md:w-[280px] h-[53px] bg-[#F8F4F0] rounded-lg hover:bg-[#e2dedc] transition-colors"
                onClick={() => setAddMoneyIndex(index)}
              >
                + Add Money
              </button>
              <button
                className="w-[140px] md:w-[280px] h-[53px] bg-[#F8F4F0] rounded-lg hover:bg-[#e2dedc] transition-colors"
                onClick={() => setWithdrawIndex(index)}
              >
                Withdraw
              </button>
            </div>
            {addMoneyIndex !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[999]">
                <AddMoney
                  potIndex={addMoneyIndex}
                  onClose={() => setAddMoneyIndex(null)}
                />
              </div>
            )}
            {withdrawIndex !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[999]">
                <Withdraw
                  potIndex={withdrawIndex}
                  onClose={() => setWithdrawIndex(null)}
                />
              </div>
            )}
          </div>

          {/* Edit/Delete menu */}
          {selectedPotIndex === index && !showDeleteConfirm && (
            <div className="absolute top-14 right-11 z-50">
              <EditDelete
                text={pot.name}
                onEdit={() => setEditPotIndex(index)}
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

      {/* Edit Pot Modal */}
      {editPotIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <EditPot
            potName={pots[editPotIndex].name}
            currentTarget={pots[editPotIndex].target}
            currentTheme={pots[editPotIndex].theme}
            currentText={
              themeArray.find((t) => t.theme === pots[editPotIndex].theme)
                ?.text || "green"
            }
            onClose={() => setEditPotIndex(null)}
          />
        </div>
      )}
    </div>
  );
}

"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { GlobalContext } from "../context/GlobalContext";
import CategoryHeader from "../shared/list-header/CategoryHeader";
import Delete from "../modals/Delete"; // ✅ Import the Delete modal
import { formatAmount } from "../helperFunctions/formatAmount";
import { formatDate } from "../helperFunctions/formatDate";
import Loader from "../modals/Loader";
// ...Ellipse and Loader unchanged

export default function SpendingTypes() {
  const { data, setData } = useContext(GlobalContext);
  const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState<
    string | null
  >(null); // ✅ Modal state

  if (!data) return <Loader />;

  const { transactions, budgets } = data;

  const getThemeColor = (category: string) => {
    const budget = budgets.find((b) => b.category === category);
    return budget ? budget.theme : "#000";
  };

  const getBudgetSummary = () => {
    return budgets.map(({ category, maximum }) => {
      const spent = transactions
        .filter((t) => t.category === category)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const free = maximum - spent;
      return { category, spent, free, maximum };
    });
  };

  const summary = getBudgetSummary();

  const handleDeleteBudget = () => {
    if (!data || !selectedCategoryToDelete) return;

    const updatedBudgets = data.budgets.filter(
      (b) => b.category !== selectedCategoryToDelete
    );
    const updatedData = { ...data, budgets: updatedBudgets };
    setData(updatedData);
    localStorage.setItem("finance-data", JSON.stringify(updatedData));
    setSelectedCategoryToDelete(null);
  };

  return (
    <div className="w-[300px] md:w-[620px] lg:!w-[600px] mb-[100px] mx-auto">
      {summary.map(({ category, spent, free, maximum }) => {
        const color = getThemeColor(category);
        const items = transactions
          .filter((t) => t.category === category)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 3);

        return (
          <div
            key={category}
            className="mb-10 pb-4 w-[303px] md:w-[620px] lg:!w-[600px] md:m-auto xxl:w-[600px] xxl:mb-8"
          >
            <CategoryHeader
              color={color}
              category={category}
              className="w-full"
              onMenuClick={() => setSelectedCategoryToDelete(category)} // ✅ Trigger modal
            />
            <p className="text-sm text-gray-500 mb-2">
              Maximum of ${maximum.toFixed(2)}
            </p>

            <div className="flex items-start p-1 h-[32px] bg-[#F8F4F0] rounded-[4px] mb-2 w-[303px] md:w-[620px] lg:w-[600px]">
              <div
                className="h-full rounded-[4px]"
                style={{
                  width: `${(spent / maximum) * 100}%`,
                  backgroundColor: color,
                }}
              />
            </div>

            <div
              className="flex justify-between w-[150px] mb-4 pl-4 border-l-4"
              style={{ borderColor: color }}
            >
              <div>
                <p className="text-xs text-[#696868]">Spent</p>
                <p className="text-sm font-bold text-[#201F24]">
                  ${spent.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#696868]">Free</p>
                <p className="text-sm font-bold text-[#201F24]">
                  ${free < 0 ? "0.00" : free.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <p className="text-base font-bold text-[#201F24]">
                Latest Spending
              </p>
              <div className="flex items-center cursor-pointer">
                <p className="text-sm text-[#696868]">See all</p>
                <Image
                  src="/images/budgets/down-fill.svg"
                  alt="down"
                  width={12}
                  height={12}
                />
              </div>
            </div>

            {items.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm">{item.name}</p>
                  <p className="text-sm font-bold text-gray-900">
                    {formatAmount(item.amount)}
                  </p>
                </div>
                <p className="text-xs text-[#696868]">
                  {formatDate(item.date)}
                </p>
              </div>
            ))}
          </div>
        );
      })}

      {/* ✅ Delete Modal */}
      {selectedCategoryToDelete && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <Delete
            text={`budget for ${selectedCategoryToDelete}`}
            type="budget"
            onConfirm={() => {
              const updatedBudgets = data.budgets.filter(
                (b) => b.category !== selectedCategoryToDelete
              );
              const updatedData = { ...data, budgets: updatedBudgets };
              setData(updatedData);
              localStorage.setItem("finance-data", JSON.stringify(updatedData));
              setSelectedCategoryToDelete(null); // close modal
            }}
            onCancel={() => setSelectedCategoryToDelete(null)}
          />
        </div>
      )}
    </div>
  );
}

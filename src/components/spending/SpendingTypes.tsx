"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { GlobalContext } from "../context/GlobalContext";
import CategoryHeader from "../shared/list-header/CategoryHeader";
import { formatAmount } from "../helperFunctions/formatAmount";
import { formatDate } from "../helperFunctions/formatDate";
import Loader from "../modals/Loader";
import EditDelete from "../modals/EditDelete";
import Delete from "../modals/Delete";
import EditBudget from "../modals/EditBudget";
const themeArray = [
  { theme: "#277C78", text: "green" },
  { theme: "#82C9D7", text: "cyan" },
  { theme: "#F2CDAC", text: "yellow" },
  { theme: "#626070", text: "navy" },
  { theme: "#C94736", text: "red" },
  { theme: "#826CB0", text: "purple" },
  { theme: "#597C7C", text: "turquoise" },
];
export default function SpendingTypes() {
  const { data, setData } = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editCategory, setEditCategory] = useState<string | null>(null);

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
    if (!data || !selectedCategory) return;
    const updatedBudgets = data.budgets.filter(
      (b) => b.category !== selectedCategory
    );
    const updatedData = { ...data, budgets: updatedBudgets };
    setData(updatedData);
    localStorage.setItem("finance-data", JSON.stringify(updatedData));
    setSelectedCategory(null);
    setShowDeleteConfirm(false);
  };

  const handleEditBudget = (
    category: string,
    maximum: number,
    theme: string
  ) => {
    if (!data) return;
    const updatedBudgets = data.budgets.map((b) =>
      b.category === category ? { ...b, maximum, theme } : b
    );
    const updatedData = { ...data, budgets: updatedBudgets };
    setData(updatedData);
    localStorage.setItem("finance-data", JSON.stringify(updatedData));
    setEditCategory(null);
  };

  return (
    <div className="bg-white rounded-[12px] w-[343px] mx-auto md:w-[700px] mb-[20px] pt-[20px] pb-[20px]">
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
              className="relative mb-10 pb-4 w-[303px] md:w-[620px] lg:!w-[600px] md:m-auto xxl:w-[600px] xxl:mb-8"
            >
              <CategoryHeader
                color={color}
                category={category}
                className="w-full"
                onMenuClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
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

              {/* Edit/Delete menu */}
              {selectedCategory === category && (
                <div className="absolute top-10 right-0 z-50">
                  <EditDelete
                    text={category}
                    onEdit={() => setEditCategory(category)}
                    onDelete={() => setShowDeleteConfirm(true)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Delete modal with dark backdrop */}
      {showDeleteConfirm && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <Delete
            text={`budget for ${selectedCategory}`}
            type="budget"
            onConfirm={handleDeleteBudget}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        </div>
      )}

      {/* Edit budget modal with dark backdrop */}
      {editCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <EditBudget
            category={editCategory}
            currentMaximum={
              budgets.find((b) => b.category === editCategory)?.maximum || 0
            }
            currentTheme={
              budgets.find((b) => b.category === editCategory)?.theme ||
              "#277C78"
            }
            currentText={
              themeArray.find(
                (t) =>
                  t.theme ===
                  budgets.find((b) => b.category === editCategory)?.theme
              )?.text || "green"
            }
            onClose={() => setEditCategory(null)}
          />
        </div>
      )}
    </div>
  );
}

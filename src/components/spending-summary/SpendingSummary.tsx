"use client";
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Loader from "../modals/Loader";
export default function SpendingSummary({
  text = "Spending Summary",
  width = "w-full",
  limit,
}: {
  text?: string;
  width?: string;
  limit?: number; // optional limit on how many budgets to show
}) {
  const { data } = useContext(GlobalContext);

  if (!data) return <Loader />;

  const { budgets, transactions } = data;

  const getSpent = (category: string) => {
    return transactions
      .filter((tx) => tx.category === category && tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  };

  // If limit is defined, slice budgets; else show all
  const budgetsToShow =
    typeof limit === "number" ? budgets.slice(0, limit) : budgets;

  return (
    <div className="bg-white rounded-[12px] w-[343px] mx-auto md:w-[700px] mb-[20px] pt-[20px] pb-[20px] xxl:w-[440px]">
      <div className="w-[300px] md:w-[620px] xxl:w-[350px] md:mx-auto lg:w-[600px] xl:w-[300px] mx-auto xl:mx-0 flex flex-col justify-start items-start">
        <h2 className="mb-3 font-publicSans font-bold text-[20px] text-[#201F24]">
          {text}
        </h2>
        <ul className={`${width} w-full`}>
          {budgetsToShow.map((budget) => {
            const spent = getSpent(budget.category);
            return (
              <li
                key={budget.category}
                className="flex justify-between items-center w-full mb-2"
              >
                <strong
                  className="border-l-4 pl-2 text-[#696868]"
                  style={{ borderColor: budget.theme }}
                >
                  {budget.category}
                </strong>
                <span className="text-sm font-semibold text-[#201F24]">
                  <span className="pr-1">${spent.toFixed(2)}</span>
                  <span className="inline-block font-publicSans font-normal text-[12px] leading-[150%] text-[#696868]">
                    of ${budget.maximum.toFixed(2)}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

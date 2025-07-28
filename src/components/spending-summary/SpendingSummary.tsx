"use client";
import React, { useEffect, useState } from "react";

type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

type Transaction = {
  category: string;
  amount: number;
};

type Data = {
  budgets: Budget[];
  transactions: Transaction[];
};

export default function SpendingSummary({
  text,
  width,
}: {
  text?: string;
  width?: string;
}) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data: Data) => {
        setBudgets(data.budgets);
        setTransactions(data.transactions);
      })
      .catch(console.error);
  }, []);

  const getSpent = (category: string) => {
    return transactions
      .filter((tx) => tx.category === category && tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  };

  return (
    <div className="w-[300px] md:w-[620px] xxl:w-[350px]  md:mx-auto lg:w-[600px] xl:w-[300px]  mx-auto xl:mx-0 flex flex-col justify-start items-start  flex-none order-0 self-stretch flex-grow-0">
      <h2 className="w-[189px] mb-3 font-publicSans font-bold text-[20px]  text-[#201F24] flex-none order-0 flex-grow-0 pb-0">
        {text}
      </h2>
      <ul className={`w-full ${width}`}>
        {budgets.map((budget) => {
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
                <span className="w-[62px] h-[18px] font-publicSans font-normal text-[12px] leading-[150%] text-[#696868] flex-none order-1 flex-grow-0">
                  of ${budget.maximum.toFixed(2)}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

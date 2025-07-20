"use client";
import useData from "../useData";
import Image from "next/image";
import { formatAmount } from "../helperFunctions/formatAmount";
import { formatDate } from "../helperFunctions/formatDate";
function Ellipse({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        backgroundColor: color,
        marginRight: 8,
      }}
      aria-hidden="true"
    />
  );
}

export default function SpendingTypes() {
  const data = useData();

  if (!data) return <p>Loading...</p>;

  const { transactions, budgets } = data;

  // Helper functions
  const getThemeColor = (category: string) => {
    const budget = budgets.find((b) => b.category === category);
    return budget ? budget.theme : "#000";
  };

  // Calculate spent and free per category
  function getBudgetSummary() {
    return budgets.map(({ category, maximum }) => {
      const spent = transactions
        .filter((t) => t.category === category)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const free = maximum - spent;
      return { category, spent, free, maximum };
    });
  }

  const summary = getBudgetSummary();

  return (
    <div className="w-[343px] md:w-[700px] lg:!w-[600px]  mb-[100px] mx-auto  ">
      {/* Header */}

      {/* Categories and budgets */}
      {summary.map(({ category, spent, free, maximum }) => {
        const color = getThemeColor(category);
        // Filter transactions for this category to show items
        const items = transactions
          .filter((t) => t.category === category)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 3); // 👈 Only take 3 most recent

        return (
          <div
            key={category}
            className="mb-10 w-[343px] md:w-[700px] lg:!w-[600px] md:m-auto"
          >
            <div className="flex justify-between">
              <h2 className="flex items-center gap-2 mb-1">
                <Ellipse color={color} />
                <p className="h-[24px] font-public-sans font-extrabold text-[20px] leading-[1.2] text-gray-900">
                  {category}
                </p>
              </h2>
              <Image
                src="images/budgets/spread.svg"
                alt="more"
                width={14}
                height={14}
              />
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Maximum of ${maximum.toFixed(2)}
            </p>
            <div className="flex items-start p-1 h-[32px] bg-[#F8F4F0] rounded-[4px] mb-2 w-[303px] md:w-[700px] lg:w-[600px]">
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
                <p className="h-[18px] font-public-sans font-normal text-[12px] leading-[1.5] text-[#696868]">
                  Spent
                </p>
                <p className="h-[21px] font-public-sans font-bold text-[14px] leading-[1.5] text-[#201F24]">
                  ${spent.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="h-[18px] font-public-sans font-normal text-[12px] leading-[1.5] text-[#696868]">
                  Free
                </p>
                <p className="h-[21px] font-public-sans font-bold text-[14px] leading-[1.5] text-[#201F24]">
                  ${free.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="w-[126px] h-[24px] font-public-sans font-bold text-[16px] leading-[1.5] text-[#201F24]">
                Latest Spending
              </p>
              <div className="flex items-center cursor-pointer">
                <p className="w-[47px] h-[21px] font-public-sans font-normal text-[14px] leading-[1.5] text-[#696868]">
                  See all
                </p>
                <Image
                  src="/images/budgets/down-fill.svg"
                  alt="down-fill"
                  width={12}
                  height={12}
                />
              </div>
            </div>
            {items.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-center">
                  <p className="font-public-sans text-[12px] leading-[1.5]">
                    {item.name}
                  </p>
                  <p className="font-public-sans font-bold text-[12px] leading-[1.5] text-right text-gray-900">
                    {formatAmount(item.amount)}
                  </p>
                </div>
                <p className="font-public-sans text-[12px] leading-[1.5] text-[#696868]">
                  {formatDate(item.date)}
                </p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

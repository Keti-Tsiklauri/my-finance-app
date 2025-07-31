"use client";

import Loader from "./Loader";
import useData from "@/app/hooks/useData";

export default function ColorPicker({
  onPick,
}: {
  onPick?: (c: { theme: string; text: string }) => void;
}) {
  const data = useData();
  if (!data) return <Loader />;

  const { budgets } = data;

  const themeArray = [
    { theme: "#277C78", text: "green" },
    { theme: "#82C9D7", text: "cyan" },
    { theme: "#F2CDAC", text: "yellow" },
    { theme: "#626070", text: "navy" },
    { theme: "#C94736", text: "red" },
    { theme: "#826CB0", text: "purple" },
    { theme: "#597C7C", text: "turquoise" },
  ];

  return (
    <div className="md:w-[496px] w-[295px] bg-white rounded-[12px] p-[24px_20px] flex flex-col gap-2 mx-auto h-[200px] md:h-[300px] overflow-y-scroll shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
      {themeArray.map((elem, index) => {
        const isUsed = budgets.some(
          (budget: { theme: string }) =>
            budget.theme.toLowerCase() === elem.theme.toLowerCase()
        );

        return (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => onPick && onPick(elem)} // ✅ call onPick
          >
            <div className="flex items-center w-[255px] md:w-[456px] justify-between">
              <div className="flex gap-2 items-center">
                <div
                  className="w-4 h-4 flex-none rounded-full"
                  style={{ backgroundColor: elem.theme }}
                />
                <p>{elem.text}</p>
              </div>
              {isUsed && (
                <p className="h-[18px] font-['Public_Sans'] font-normal text-[12px] leading-[150%] text-right text-[#696868]">
                  already used
                </p>
              )}
            </div>
            <div className="w-[255px] md:w-[456px] h-[1px] border border-[#F2F2F2] mt-2" />
          </div>
        );
      })}
    </div>
  );
}

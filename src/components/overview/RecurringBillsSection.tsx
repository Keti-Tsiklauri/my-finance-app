"use client";
import { calculateBillData } from "../helperFunctions/billhelpers";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import { formatAmount } from "../helperFunctions/formatAmount";
import { makePositiveNumber } from "../helperFunctions/makePositiveNumber";
import TotalBills from "../recurring-bills/TotalBills";
import SeeMore from "./SeeMore";
import useData from "@/app/hooks/useData";

export default function RecurringBillsSection() {
  const data = useData();
  if (!data) return <p>Loading...</p>;

  const bills = data.transactions.filter((t) => t.category === "Bills");
  const {
    totalBills,

    totalUpcoming,
    totalDueSoon,
  } = calculateBillData(bills);
  console.log(
    totalBills,

    totalUpcoming,
    totalDueSoon
  );
  const billsArray = [
    { name: "paid bills", amount: totalBills, theme: "#277C78" },
    { name: "total upcoming", amount: totalUpcoming, theme: "#F2CDAC" },
    { name: "due soon", amount: totalDueSoon, theme: "#82C9D7" },
  ];
  return (
    <div>
      <SeeMore
        section="recurring bills"
        action="see details"
        href="/recurring-bills"
      />
      <div className="flex flex-col gap-2 mt-2 bg-white">
        {billsArray.map((elem, index) => (
          <div
            key={index}
            style={{ borderLeftColor: elem.theme }}
            className=" mx-auto box-border flex flex-row justify-between items-center p-[20px_16px] gap-[16px] w-[303px] h-[61px] bg-[#F8F4F0] border-l-[4px]  rounded-[8px]"
          >
            {" "}
            <p className="h-[21px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#696868]">
              {capitalizeEachWord(elem.name)}
            </p>
            <p className="h-[21px] font-['Public_Sans'] font-bold text-[14px] leading-[150%] text-[#201F24]">
              ${makePositiveNumber(elem.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

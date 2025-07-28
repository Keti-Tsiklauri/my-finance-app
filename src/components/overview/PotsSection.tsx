"use client";
import useData from "@/app/hooks/useData";
import SeeMore from "./SeeMore";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import Image from "next/image";
export default function PotsSection() {
  const data = useData();
  if (!data) return <p>Loading...</p>;

  const { pots } = data;
  const visiblePots = pots.slice(0, 4); // ✅ Only take first 4 items
  console.log(pots);
  const totalSavings = pots.reduce((acc, pot) => acc + pot.total, 0);

  return (
    <div className="p-[24px_20px] gap-5 w-[343px]  mt-4 mx-auto md:w-[700px] ">
      <SeeMore section="pots" action="see details" />
      <div className="md:flex">
        <div className="flex gap-4 items-center">
          <Image
            src="images/overview/total.svg"
            alt="total saved"
            width={40}
            height={45}
          />
          <div>
            <p className="h-[21px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#696868]">
              {capitalizeEachWord("total saved")}
            </p>
            <p className="h-[38px] font-['Public_Sans'] font-bold text-[32px] leading-[120%] text-[#201F24]">
              ${totalSavings}
            </p>
          </div>
        </div>
        {/* ✅ 2x2 grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-4 mx-auto w-[300px] h-[100px]">
          {visiblePots.map((elem, index) => (
            <div
              key={index}
              className="flex flex-row items-center gap-4 h-[43px] flex-grow"
            >
              {/* Color Tag */}
              <div
                className="w-[4px] h-full rounded-[8px]"
                style={{ backgroundColor: elem.theme }}
              />

              {/* Texts container */}
              <div className="flex flex-col justify-center items-start gap-1 h-[43px]">
                <p className="h-[18px] font-['Public_Sans'] font-normal text-[12px] leading-[150%] text-[#696868]">
                  {elem.name}
                </p>
                <p className="h-[21px] font-['Public_Sans'] font-bold text-[14px] leading-[150%] text-[#201F24]">
                  ${elem.total}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

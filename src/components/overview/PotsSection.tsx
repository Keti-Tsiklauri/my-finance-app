"use client";

import SeeMore from "./SeeMore";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

// ✅ Reusable loader
function Loader() {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <div className="w-12 h-12 border-4 border-[#277C78] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function PotsSection() {
  const { data } = useContext(GlobalContext);

  // ✅ Show loader while fetching
  if (!data) return <Loader />;

  const { pots } = data;
  const visiblePots = pots.slice(0, 4); // ✅ Only take first 4 items
  const totalSavings = pots.reduce((acc, pot) => acc + pot.total, 0);

  return (
    <div className="p-[24px_20px] gap-5 w-[343px] mt-4 mx-auto md:w-[700px]">
      <SeeMore section="pots" action="see details" href="/pots" />

      <div className="md:flex">
        {/* Total Saved Section */}
        <div className="flex gap-4 items-center">
          <Image
            src="./images/overview/total.svg"
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

        {/* ✅ 2x2 Grid for Pots */}
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

              {/* Texts */}
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

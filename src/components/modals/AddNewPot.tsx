"use client";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import Image from "next/image";
import AddButton from "../add-button/AddButton";
import Theme from "./Theme";
import AmountPicker from "./AmountPicker";
import InfoBox from "./InfoBox";
import { useState } from "react";
export default function AddNewოტ({
  text,
  description,
  selectedCategory,
  setSelectedCategory,
  onClose,
}: {
  text: string;
  description: string;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  onClose: () => void;
}) {
  const [theme, setTheme] = useState({ theme: "#277C78", text: "green" });
  return (
    <div className="flex flex-col mx-auto mt-5 w-[335px] md:w-[560px] h-[450px] md:h-[510px] bg-white rounded-[12px] p-[24px_20px] gap-3 md:gap-5">
      <div className="flex justify-between md:w-[496px] w-[295px] ">
        <p className="h-[38px] font-['Public_Sans'] font-bold text-[32px] leading-[120%] text-[#201F24]">
          {text}
        </p>
        <Image
          src="images/modals/close.svg"
          alt="close button"
          width={25}
          height={25}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>

      <p className="font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#696868]">
        {description}
      </p>
      <div>
        <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[150%] text-[#696868]">
          {capitalizeEachWord("pot name")}
        </p>
        <div
          className="flex flex-row items-center 
        p-[12px_20px] gap-3  w-[295px] md:w-[496px] h-[45px] bg-white border border-[#98908B] rounded-[8px] box-border"
        >
          <input
            type="text"
            placeholder="Concert Ticket"
            className="h-[21px] w-[233px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#201F24] placeholder-[#98908B] bg-transparent outline-none border-none"
          />
        </div>
      </div>

      {/* other inputs */}
      <AmountPicker text="target" />
      <Theme selectedColor={theme} text="theme" onChange={setTheme} />

      {/* Add Budget button */}
      <div className="md:w-[496px] w-[295px] mt-auto">
        <AddButton text="add budget" width="w-[295px] md:w-[496px]" />
      </div>
    </div>
  );
}

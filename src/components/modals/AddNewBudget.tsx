"use client";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import Image from "next/image";
import AddButton from "../add-button/AddButton";
import Theme from "./Theme";
import AmountPicker from "./AmountPicker";
import InfoBox from "./InfoBox";

export default function AddNewBudget({
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
  return (
    <div className="flex flex-col mx-auto mt-5 w-[335px] md:w-[560px] h-[510px] bg-white rounded-[12px] p-[24px_20px] gap-5">
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

      {/* Category InfoBox */}
      <InfoBox
        label="budget category"
        content={selectedCategory}
        onChange={(val) => setSelectedCategory(val)}
      />

      {/* other inputs */}
      <AmountPicker text="maximum spending" />
      <Theme selectedColor={{ color: "277C78", text: "green" }} text="theme" />

      {/* Add Budget button */}
      <div className="md:w-[496px] w-[295px] mt-auto">
        <AddButton text="add budget" width="w-[295px] md:w-[496px]" />
      </div>
    </div>
  );
}

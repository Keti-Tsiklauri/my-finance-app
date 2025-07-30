import Image from "next/image";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";

interface InfoBoxProps {
  label: string;
  content: string;
  onChange: (value: string) => void; // ✅ add callback
}

export default function InfoBox({ label, content, onChange }: InfoBoxProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[150%] text-[#696868]">
        {capitalizeEachWord(label)}
      </p>
      <div
        className="flex flex-row items-center justify-between
         p-[12px_20px] gap-4  w-[295px] md:w-[496px] h-[45px] bg-white border border-[#98908B] rounded-[8px] box-border"
      >
        <p className="h-[21px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#201F24]">
          {capitalizeEachWord(content)}
        </p>
        <Image
          src="images/modals/vector.svg"
          alt="vector"
          width={10}
          height={10}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* ✅ Dropdown appears below */}
      {open && (
        <div className="absolute top-[60px] left-0">
          <CategoryDropdown
            onSelect={(val) => {
              onChange(val); // update parent
              setOpen(false); // close dropdown
            }}
          />
        </div>
      )}
    </div>
  );
}

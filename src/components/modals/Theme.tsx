"use client";
import Image from "next/image";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import { useState } from "react";
import ColorPicker from "./ColorPicker";

interface SelectedColor {
  theme: string;
  text: string;
}

interface ThemeProps {
  selectedColor: SelectedColor;
  text: string;
  onChange: (color: SelectedColor) => void; // callback for parent
}

export default function Theme({ selectedColor, text, onChange }: ThemeProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[150%] text-[#696868]">
        {capitalizeEachWord(text)}
      </p>

      {/* InfoBox-style theme selector */}
      <div
        className="flex flex-row items-center justify-between p-[12px_20px] gap-4 
        w-[295px] md:w-[496px] h-[45px] bg-white border border-[#98908B] rounded-[8px] box-border cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 flex-none rounded-full"
            style={{ backgroundColor: selectedColor.theme }}
          ></div>
          <p className="h-[21px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#201F24]">
            {capitalizeEachWord(selectedColor.text)}
          </p>
        </div>
        <Image
          src="images/modals/vector.svg"
          alt="vector"
          width={10}
          height={10}
        />
      </div>

      {/* ✅ Dropdown with ColorPicker */}
      {open && (
        <div className="absolute top-[60px] left-0 z-20">
          <ColorPickerWrapper
            onSelect={(color) => {
              onChange(color);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ✅ Wrapper to handle clicks from ColorPicker */
function ColorPickerWrapper({
  onSelect,
}: {
  onSelect: (c: SelectedColor) => void;
}) {
  const themes = [
    { theme: "#277C78", text: "green" },
    { theme: "#82C9D7", text: "cyan" },
    { theme: "#F2CDAC", text: "yellow" },
    { theme: "#626070", text: "navy" },
    { theme: "#C94736", text: "red" },
    { theme: "#826CB0", text: "purple" },
    { theme: "#597C7C", text: "turquoise" },
  ];

  return (
    <ColorPicker
      onPick={(theme) => onSelect(theme)} // modify ColorPicker to support this
    />
  );
}

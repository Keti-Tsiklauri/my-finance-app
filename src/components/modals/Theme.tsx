"use client";
import Image from "next/image";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import { useState, useRef, useEffect } from "react";
import ColorPicker from "./ColorPicker";

interface SelectedColor {
  theme: string;
  text: string;
}

interface ThemeProps {
  selectedColor: SelectedColor;
  text: string;
  onChange: (color: SelectedColor) => void;
}

export default function Theme({ selectedColor, text, onChange }: ThemeProps) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const updatePosition = () => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
  };

  useEffect(() => {
    if (open) updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  return (
    <div className="flex flex-col">
      <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[150%] text-[#696868]">
        {capitalizeEachWord(text)}
      </p>

      <div
        ref={boxRef}
        className="flex flex-row items-center justify-between p-[12px_20px] gap-4 
        w-[295px] md:w-[496px] h-[45px] bg-white border border-[#98908B] rounded-[8px] box-border cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-6 h-6 rounded-full border border-[#ccc]"
            style={{ backgroundColor: selectedColor.theme }}
          />
          <p className="text-sm font-['Public_Sans']">{selectedColor.text}</p>
        </div>

        <Image
          src="./images/modals/vector.svg"
          alt="vector"
          width={10}
          height={10}
        />
      </div>

      {open && (
        <div
          className="fixed z-50"
          style={{
            top: position.top,
            left: position.left,
            width: position.width,
          }}
        >
          <ColorPicker
            onPick={(color) => {
              onChange(color);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

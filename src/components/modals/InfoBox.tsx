"use client";
import Image from "next/image";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import { useState, useRef, useEffect } from "react";
import CategoryDropdown from "./CategoryDropdown";

interface InfoBoxProps {
  label: string;
  content: string;
  onChange: (value: string) => void;
}

export default function InfoBox({ label, content, onChange }: InfoBoxProps) {
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
    <>
      <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[150%] text-[#696868]">
        {capitalizeEachWord(label)}
      </p>

      <div
        ref={boxRef}
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

      {open && (
        <div
          className="fixed z-50"
          style={{
            top: position.top,
            left: position.left,
            width: position.width,
          }}
        >
          <CategoryDropdown
            onSelect={(val) => {
              onChange(val);
              setOpen(false);
            }}
          />
        </div>
      )}
    </>
  );
}

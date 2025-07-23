"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Item = {
  id: number;
  name: string;
};

export default function FilterDropDown({
  text,
  className,
  divWidth,
  filterBased,
  filter,
  onSelect,
}: {
  text: string;
  className?: string;
  divWidth?: string;
  filterBased: string;
  filter: Item[];
  onSelect: (selected: string) => void;
}) {
  const [option, setOption] = useState(text);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number | undefined>();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Measure combined width of p + dropdown div container
  useEffect(() => {
    if (containerRef.current) {
      setDropdownWidth(containerRef.current.offsetWidth);
    }
  }, [divWidth]);

  function handleSelect(name: string) {
    setOption(name);
    setIsOpen(false);
    onSelect(name);
  }

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-between ${divWidth} relative`}
    >
      <p className="h-[21px] text-[14px] leading-[150%] font-normal text-[#696868] font-['Public_Sans'] hidden md:block">
        {filterBased}
      </p>

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-[35px] md:h-[45px] items-center bg-white border border-[#98908B] rounded-[8px] px-1 cursor-pointer justify-between ${className} w-full`}
      >
        <p className="h-[21px] font-normal text-[14px] leading-[21px] text-[#201F24]">
          {option}
        </p>
        <Image
          src="/images/transactions/down.svg"
          alt="down"
          width={16}
          height={16}
          className="ml-2"
        />
      </div>

      {isOpen && (
        <div
          style={{ width: dropdownWidth }}
          className="absolute top-[50px] left-0 bg-white border border-[#98908B] rounded-[8px] shadow-md z-10 max-h-60 overflow-auto"
        >
          {filter.map((elem) => (
            <p
              key={elem.id}
              onClick={() => handleSelect(elem.name)}
              className="px-4 py-2 text-[14px] text-[#201F24] hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              {elem.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

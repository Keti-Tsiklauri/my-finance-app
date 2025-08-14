"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SearchTransactionProps {
  placeholder?: string;
  width?: string;
  height?: string;
  onSearch: (query: string) => void;
}

export default function Search({
  placeholder = "Search Transaction",
  width = "w-full md:w-[160px]", // full width on small screens, fixed on md+
  height = "h-[45px]",
  onSearch,
}: SearchTransactionProps) {
  const [inputValue, setInputValue] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchClick = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(inputValue.trim());
    }
  };

  return (
    <div
      className={`${width} ${height} flex items-center bg-white border border-[#98908B] rounded-[8px] px-2`}
    >
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isSmallScreen ? "Search" : placeholder}
        className="flex-grow bg-transparent outline-none font-['Public_Sans'] text-[14px] placeholder:text-[#98908B]"
      />
      <button
        onClick={handleSearchClick}
        aria-label="Search"
        className="ml-2 flex items-center justify-center"
      >
        <Image
          src="./images/transactions/search.svg"
          alt="search"
          width={16}
          height={16}
          priority
        />
      </button>
    </div>
  );
}

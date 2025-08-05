"use client";
import { useContext } from "react";
import Loader from "./Loader";
import { GlobalContext } from "../context/GlobalContext";

export default function CategoryDropdown({
  onSelect,
}: {
  onSelect: (val: string) => void;
}) {
  const { data } = useContext(GlobalContext);
  if (!data) return <Loader />;

  const { transactions } = data;
  const categories = Array.from(
    new Set(transactions.map((tx: { category: string }) => tx.category))
  );

  return (
    <div className="flex flex-col mx-auto p-[12px_20px] gap-6 md:w-[496px] w-[296px] h-[200px] md:h-[300px] max-h-[300px] overflow-y-scroll bg-white shadow-[0_4px_24px_rgba(0,0,0,0.25)] rounded-lg">
      <ul className="font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#201F24]">
        {categories.map((cat, i) => (
          <li
            key={i}
            className="mb-2 cursor-pointer hover:text-[#277C78]"
            onClick={() => onSelect(cat)} // ✅ when category clicked
          >
            {cat}
            {i !== categories.length - 1 && (
              <div className="w-[255px] md:w-[456px] h-[1px] border border-[#F2F2F2] mt-2" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

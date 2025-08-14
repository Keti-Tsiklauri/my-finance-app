// CategoryHeader.tsx
"use client";

import Image from "next/image";

function Ellipse({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        backgroundColor: color,
        marginRight: 8,
      }}
      aria-hidden="true"
    />
  );
}

interface CategoryHeaderProps {
  color: string;
  category: string;
  className?: string;
  onMenuClick?: () => void; // ✅ New
}

export default function CategoryHeader({
  color,
  category,
  className = "",
  onMenuClick,
}: CategoryHeaderProps) {
  return (
    <div className={`flex justify-between ${className}`}>
      <h2 className="flex items-center gap-2 mb-1">
        <Ellipse color={color} />
        <p className="h-[24px] font-public-sans font-extrabold text-[20px] leading-[1.2] text-gray-900">
          {category}
        </p>
      </h2>
      <Image
        className="cursor-pointer"
        src="./images/budgets/spread.svg"
        alt="more"
        width={14}
        height={14}
        onClick={onMenuClick} // ✅ trigger click handler
      />
    </div>
  );
}

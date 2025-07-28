import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  section: "pots" | "budgets" | "transactions";
  action: "view all" | "see details";
  href: string; // ✅ add URL to navigate to
  width?: string;
}

export default function SeeMore({ section, action, width, href }: CardProps) {
  const safeHref = href.startsWith("/") ? href : `/${href}`;
  return (
    <Link
      href={safeHref}
      className={`flex flex-row justify-between items-center w-[303px] md:w-[620px] xxl:w-[680px] h-[24px] gap-6 mx-auto bg-white cursor-pointer ${width}`}
    >
      <p className="w-[43px] h-[24px] font-['Public_Sans'] font-bold text-[20px] leading-[120%] text-[#201F24]">
        {capitalizeEachWord(section)}
      </p>
      <div className="flex w-[100px] justify-around">
        <p className="h-[21px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#696868]">
          {capitalizeEachWord(action)}
        </p>
        <Image
          src="/images/overview/right.svg"
          alt="see more"
          width={10}
          height={10}
        />
      </div>
    </Link>
  );
}

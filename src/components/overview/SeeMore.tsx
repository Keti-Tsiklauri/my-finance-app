import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import Image from "next/image";
interface CardProps {
  section: "pots" | "budgets" | "transactions";
  action: "view all" | "see details";
}
export default function SeeMore({ section, action }: CardProps) {
  return (
    <div className="flex flex-row justify-between items-center w-[303px] md:w-[620px] xxl:w-[540px] h-[24px] gap-6 mx-auto bg-white">
      <p className="w-[43px] h-[24px] font-['Public_Sans'] font-bold text-[20px] leading-[120%] text-[#201F24]s">
        {capitalizeEachWord(section)}
      </p>
      <div className="flex w-[100px] justify-around">
        <p className="h-[21px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#696868]">
          {capitalizeEachWord(action)}
        </p>
        <Image
          src="images/overview/right.svg"
          alt="see more"
          width={10}
          height={10}
        />
      </div>
    </div>
  );
}

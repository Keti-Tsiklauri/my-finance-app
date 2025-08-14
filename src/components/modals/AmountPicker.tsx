import Image from "next/image";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";

export default function AmountPicker({
  text,
  value,
  onChange,
}: {
  text: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[150%] text-[#696868]">
        {capitalizeEachWord(text)}
      </p>
      <div
        className="flex flex-row items-center 
               p-[12px_20px] gap-3  w-[295px] md:w-[496px] h-[45px] bg-white border border-[#98908B] rounded-[8px] box-border"
      >
        <Image
          src="./images/modals/dolar.svg"
          alt="dolar"
          width={10}
          height={20}
        />
        <input
          type="text"
          placeholder="e.g. 2000"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[21px] w-[233px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#201F24] placeholder-[#98908B] bg-transparent outline-none border-none"
        />
      </div>
    </div>
  );
}

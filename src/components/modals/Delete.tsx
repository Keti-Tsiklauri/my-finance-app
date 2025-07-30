import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import Image from "next/image";
export default function Delete({ text, type }: { text: string; type: string }) {
  return (
    <div className="p-[24px_20px] flex flex-col gap-5 w-[335px] md:w-[560px] h-[300px] bg-white rounded-[12px] mx-auto">
      <div className="flex justify-between">
        <p className="h-[24px] font-['Public_Sans'] font-bold text-[20px] leading-[120%] text-[#201F24]">
          {capitalizeEachWord(`delete ${type}?`)}
        </p>
        <Image
          src="/images/modals/close.svg"
          alt="close button"
          width={25}
          height={25}
          className="cursor-pointer"
        />
      </div>
      <p className="h-[63px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#696868] self-stretch">
        Are you sure you want to delete this {text}? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </p>
      <button className="flex flex-row items-center justify-center p-4 gap-4 w-[295px] h-[53px] bg-[#C94736] rounded-[8px] md:w-[520px]">
        <p className="w-[144px] h-[21px] font-['Public_Sans'] font-bold text-[14px] leading-[150%] text-white">
          {capitalizeEachWord("Yes, Confirm Deletion")}
        </p>
      </button>
      <button className="flex flex-row items-center justify-center p-4 gap-4 w-[295px] h-[53px] bg-[#F8F4F0] rounded-[8px] md:w-[520px]">
        <p className="w-[144px] h-[21px] font-['Public_Sans'] font-bold text-[14px] leading-[150%] text-[#696868]">
          {capitalizeEachWord("No, Go Back")}
        </p>
      </button>
    </div>
  );
}

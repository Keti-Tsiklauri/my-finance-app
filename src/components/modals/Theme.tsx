import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import Image from "next/image";
interface SelectedColor {
  color: string;
  text: string;
}
export default function Theme({
  selectedColor,
  text,
}: {
  selectedColor: SelectedColor;
  text: string;
}) {
  return (
    <div>
      <p className="h-[18px] font-['Public_Sans'] font-bold text-[12px] leading-[150%] text-[#696868]">
        {capitalizeEachWord(text)}
      </p>
      <div
        className="flex flex-row items-center justify-between
             p-[12px_20px] gap-4  w-[295px] md:w-[496px] h-[45px] bg-white border border-[#98908B] rounded-[8px] box-border"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 flex-none rounded-full"
            style={{ backgroundColor: `#${selectedColor.color}` }}
          ></div>

          <p className="h-[21px] font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#201F24]">
            {capitalizeEachWord(selectedColor.text)}
          </p>
        </div>
        <Image
          src="images/modals/vector.svg"
          alt="vector"
          width={10}
          height={10}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";

type AddButtonProps = {
  text: string;
  width: string;
};

export default function AddButton({ text, width }: AddButtonProps) {
  return (
    <div
      style={{ width }}
      className="cursor-pointer flex flex-row justify-center items-center p-4 gap-4 h-[45px] bg-[#201F24] rounded-lg"
    >
      <p className="h-[21px] font-['Public_Sans'] font-bold text-[14px] leading-[150%] text-white">
        {capitalizeEachWord(text)}
      </p>
    </div>
  );
}

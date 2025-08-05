import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";

type AddButtonProps = {
  text: string;
  width: string;
  onClick?: () => void; // 👈 Add onClick prop
};

export default function AddButton({ text, width, onClick }: AddButtonProps) {
  return (
    <div
      style={{ width }}
      className="cursor-pointer flex flex-row justify-center items-center p-4 gap-4 h-[45px] bg-[#201F24] rounded-lg"
      onClick={onClick} // 👈 Trigger the click event
    >
      <p className="h-[21px] font-['Public_Sans'] font-bold text-[14px] leading-[150%] text-white">
        {capitalizeEachWord(text)}
      </p>
    </div>
  );
}

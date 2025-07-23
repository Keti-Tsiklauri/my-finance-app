import AddButton from "../../add-button/AddButton";
export default function BudgetsHeader({ text }: { text: string }) {
  return (
    <div className="flex justify-between w-auto min-w-[344px] mx-auto px-4 xxl:gap-20">
      <p className="h-[38px] font-publicSans font-bold text-[32px] leading-[120%] text-[#201F24] w-[128px]">
        {text}
      </p>
      <AddButton text={`+ add new ${text}`} />
    </div>
  );
}

import AddButton from "../../add-button/AddButton";
export default function BudgetsHeader({ text }: { text: string }) {
  return (
    <div className="w-[343px] md:w-[700px]  xxl:w-[1180px]  order-0 flex-none flex-grow-0 mx-auto flex justify-between">
      <p className="h-[38px] font-publicSans font-bold text-[32px] leading-[120%] text-[#201F24] w-[128px]">
        {text}
      </p>
      <AddButton text={`+ add new ${text}`} />
    </div>
  );
}

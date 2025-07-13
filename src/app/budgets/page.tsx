import AddButton from "../components/add-button/AddButton";

export default function Budgets() {
  return (
    <div>
      <div className="mt-2 flex flex-row justify-between items-center py-2 gap-6 w-full max-w-[1440px] h-[56px] flex-none order-0 self-stretch flex-grow-0 px-4 md:px-6 lg:px-8">
        <p className="mx-auto w-[128px] h-[38px] font-publicSans font-bold text-[32px] leading-[120%] text-[#201F24] flex-none order-0 flex-grow-0">
          budgets
        </p>
        <AddButton text="+ add new budget" />
      </div>
    </div>
  );
}

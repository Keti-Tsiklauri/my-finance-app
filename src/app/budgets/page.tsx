import SpendingSummary from "@/components/spending-summary/SpendingSummary";
import SpendingTypes from "@/components/spending/SpendingTypes";
import BudgetsHeader from "@/components/shared/headers/Header";
export default function Budgets() {
  return (
    <div>
      <div className="mb-5 ">
        <BudgetsHeader text="Budgets " />
      </div>
      <div className="xxl:flex">
        <div className="bg-white rounded-[12px] w-[343px] mx-auto md:w-[700px] pt-[20px] pb-[20px] mb-[20px] xxl:w-[440px] xxl:h-[220px]">
          <SpendingSummary text=" Spending Summary" />
        </div>
        <div className="bg-white rounded-[12px] w-[343px] mx-auto md:w-[700px] pt-[10px] pb-[10px] xxl:w-[640px]">
          <SpendingTypes />
        </div>
      </div>
    </div>
  );
}

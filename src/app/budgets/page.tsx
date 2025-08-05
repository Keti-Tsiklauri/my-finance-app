import SpendingSummary from "@/components/spending-summary/SpendingSummary";
import SpendingTypes from "@/components/spending/SpendingTypes";
import BudgetsHeader from "@/components/shared/headers/Header";
export default function Budgets() {
  return (
    <div>
      <div className="mb-5 ">
        <BudgetsHeader type="budget" />
      </div>
      <div className="xxl:flex gap-6 items-start">
        {/* Left column */}
        <div className="w-full xxl:w-[350px]">
          <SpendingSummary text="Spending Summary" />
        </div>

        {/* Right column */}
        <div className="bg-white rounded-[12px] w-full xxl:w-[640px] mx-auto pt-[30px] pb-[10px]">
          <SpendingTypes />
        </div>
      </div>
    </div>
  );
}

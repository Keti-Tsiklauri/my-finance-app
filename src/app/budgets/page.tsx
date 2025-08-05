import SpendingSummary from "@/components/spending-summary/SpendingSummary";
import SpendingTypes from "@/components/spending/SpendingTypes";
import BudgetsHeader from "@/components/shared/headers/Header";
export default function Budgets() {
  return (
    <div className="xxl:flex flex-col mx-auto xxl:w-[1200px] justify-between">
      <div className="mb-5 ">
        <BudgetsHeader type="budget" />
      </div>
      <div className="xxl:flex gap-6 items-start">
        {/* Left column */}
        <div className="w-full xxl:w-[350px]">
          <SpendingSummary text="Spending Summary" limit={undefined} />
        </div>

        {/* Right column */}
        <div className="w-full xxl:w-[640px] mx-auto ">
          <SpendingTypes />
        </div>
      </div>
    </div>
  );
}

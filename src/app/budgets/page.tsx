import SpendingSummary from "@/components/spending-summary/SpendingSummary";
import SpendingTypes from "@/components/spending/SpendingTypes";
import BudgetsHeader from "@/components/headers/BudgetsHeader";
export default function Budgets() {
  return (
    <div>
      <BudgetsHeader text="Budgets " />

      <div className="px-4 lg:px-12 xl:px-10 ">
        <div className="flex flex-col xxl:gap-20 xxl:flex-row">
          <SpendingSummary />
          <SpendingTypes />
        </div>
      </div>
    </div>
  );
}

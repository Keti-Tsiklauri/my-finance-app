import SpendingSummary from "../spending-summary/SpendingSummary";
import SeeMore from "./SeeMore";

export default function BudgetsSection() {
  return (
    <div className="flex flex-col  p-[24px_20px] gap-[20px] w-[343px]  bg-white rounded-[12px] ">
      <div className="mx-auto p-[24px_20px]">
        <SeeMore section="budgets" action="see details" href="/budgets" />
        <SpendingSummary />
      </div>
    </div>
  );
}

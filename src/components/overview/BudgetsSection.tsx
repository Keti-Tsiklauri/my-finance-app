import SpendingSummary from "../spending-summary/SpendingSummary";
import SeeMore from "./SeeMore";

export default function BudgetsSection() {
  return (
    <div className="flex flex-col gap-4">
      <SeeMore section="budgets" action="see details" href="/budgets" />
      <div className="flex justify-center items-center w-full">
        <SpendingSummary limit={4} />
      </div>
    </div>
  );
}

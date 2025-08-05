import SpendingSummary from "../spending-summary/SpendingSummary";
import SeeMore from "./SeeMore";

export default function BudgetsSection() {
  return (
    <div className="flex flex-col   ">
      <SeeMore section="budgets" action="see details" href="/budgets" />

      <SpendingSummary limit={4} />
    </div>
  );
}

import BudgetsSection from "@/components/overview/BudgetsSection";
import OverviewHeader from "@/components/overview/OverviewHeader";
import PotsSection from "@/components/overview/PotsSection";
import TransactionSection from "@/components/overview/TransactionSection";

export default function OverView() {
  return (
    <div>
      <p className="w-[343px] md:w-[700px] xxl:w-[1180px] h-[38px] font-bold text-[32px] leading-[120%] text-[#201F24] mx-auto">
        Overview
      </p>
      <OverviewHeader />
      {/* <div>
        <PotsSection />
        <TransactionSection />
      </div> */}
      <div>
        <BudgetsSection />
      </div>
    </div>
  );
}

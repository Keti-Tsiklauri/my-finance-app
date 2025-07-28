import BudgetsSection from "@/components/overview/BudgetsSection";
import OverviewHeader from "@/components/overview/OverviewHeader";
import PotsSection from "@/components/overview/PotsSection";
import RecurringBillsSection from "@/components/overview/RecurringBillsSection";
import TransactionSection from "@/components/overview/TransactionSection";

export default function OverView() {
  return (
    <div>
      <p className="w-[343px] md:w-[700px] xxl:w-[1180px] h-[38px] font-bold text-[32px] leading-[120%] text-[#201F24] mx-auto">
        Overview
      </p>
      <OverviewHeader />

      <div className=" bg-white rounded-[12px] md:w-[700px] mx-auto xxl:w-[1000px] w-[343px]">
        <PotsSection />
      </div>
      <div className=" bg-white rounded-[12px] xxl:w-[1000px] mx-auto md:w-[700px] w-[343px] mt-5">
        <TransactionSection />
      </div>
      <div className=" bg-white rounded-[12px] xxl:w-[1000px] mx-auto md:w-[700px] w-[343px] mt-5 pt-[16px]">
        <BudgetsSection />
      </div>
      <div className=" bg-white rounded-[12px] xxl:w-[1000px] mx-auto md:w-[700px] w-[343px] mt-5 pt-[16px] pb-[20px] mb-[80px] md:mb-[100px] m:mb-[70px]">
        <RecurringBillsSection />
      </div>
    </div>
  );
}

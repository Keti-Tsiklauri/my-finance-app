"use client";
import { useState } from "react";
import TotalBills from "./TotalBills";
import SearchBills from "./SearchBills";
import RecurringBillsHeader from "./RecurringBillsHeader";
import BillsList, { Bill } from "./BillsList";

export default function BillsWrapper({ bills }: { bills: Bill[] }) {
  const [filteredBills, setFilteredBills] = useState<Bill[]>(bills);

  return (
    <div className="flex flex-col xxl:flex-row gap-8 mt-6 xxl:w-[1100px] xxl:mx-auto">
      <div>
        <TotalBills bills={bills} />
      </div>
      <div className=" bg-white rounded-[12px] p-[24px_20px] w-[343px] mx-auto md:w-[700px]">
        <SearchBills bills={bills} onFilter={setFilteredBills} />
        <RecurringBillsHeader />
        <BillsList bills={filteredBills} />
      </div>
    </div>
  );
}

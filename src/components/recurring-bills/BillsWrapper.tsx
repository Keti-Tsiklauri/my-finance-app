"use client";
import { useContext, useState, useEffect, useMemo } from "react";
import TotalBills from "./TotalBills";
import SearchBills from "./SearchBills";
import RecurringBillsHeader from "./RecurringBillsHeader";
import BillsList, { Bill } from "./BillsList";
import { GlobalContext } from "../context/GlobalContext";
import Loader from "../modals/Loader";

export default function BillsWrapper() {
  const { data } = useContext(GlobalContext);

  // ✅ Hooks are always called in the same order
  const bills = useMemo(
    () => (data ? data.transactions.filter((t) => t.category === "Bills") : []),
    [data]
  );

  const [filteredBills, setFilteredBills] = useState<Bill[]>(bills);

  useEffect(() => {
    setFilteredBills(bills);
  }, [bills]);

  if (!data) return <Loader />; // ✅ Early return after hooks

  return (
    <div className="flex flex-col xxl:flex-row gap-8 mt-6 xxl:w-[1100px] xxl:mx-auto">
      <div>
        <TotalBills bills={bills} />
      </div>
      <div className="bg-white rounded-[12px] p-[24px_20px] w-[343px] mx-auto md:w-[700px]">
        <SearchBills bills={bills} onFilter={setFilteredBills} />
        <RecurringBillsHeader />
        <BillsList bills={filteredBills} />
      </div>
    </div>
  );
}

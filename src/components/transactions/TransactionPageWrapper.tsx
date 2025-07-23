"use client";
import { useState, useEffect } from "react";
import useData from "../useData";
import Pagination from "./Pagination";
import TransactionList from "./TransactionList";
import FilterDropDown from "./FilterDropDown";
import SearchTransaction from "./SearchTransaction";
import TransactionListHeader from "./TransactionListHeader";

export default function TransactionsWrapper() {
  const data = useData();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTransactions, setFilteredTransactions] = useState<
    typeof data extends null ? never[] : typeof data.transactions
  >([]);

  // Filter selections
  const [sortOption, setSortOption] = useState("Latest");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const itemsPerPage = 10;

  // Initialize filtered transactions when data arrives
  useEffect(() => {
    if (!data) return;
    setFilteredTransactions(data.transactions);
  }, [data]);

  // Update filtered & sorted transactions when sort/category changes
  useEffect(() => {
    if (!data) return;

    let filtered = [...data.transactions];

    // Filter by category if not 'All'
    if (categoryFilter !== "All") {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    // Sort according to sortOption
    switch (sortOption) {
      case "Latest":
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "Oldest":
        filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "Highest Amount":
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case "Lowest Amount":
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      default:
        break;
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset page on filter/sort change
  }, [sortOption, categoryFilter, data]);

  if (!data) return <p>Loading...</p>;

  // Build category options including 'All'
  const categories = [
    { id: -1, name: "All" },
    ...Array.from(new Set(data.transactions.map((t) => t.category))).map(
      (cat, idx) => ({ id: idx, name: cat })
    ),
  ];

  // Pagination calculations
  const totalItems = filteredTransactions.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredTransactions.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex justify-between xxl:w-[1000px] mx-auto mb-[20px] mt-[20px]">
        <SearchTransaction />
        <div className="md:flex w-[430px] justify-between hidden ">
          <FilterDropDown
            text="Latest"
            className="w-[113px]"
            divWidth="w-[170px]"
            filterBased="Sort by"
            filter={[
              { id: 0, name: "Latest" },
              { id: 1, name: "Oldest" },
              { id: 2, name: "Highest Amount" },
              { id: 3, name: "Lowest Amount" },
            ]}
            onSelect={setSortOption}
          />

          <FilterDropDown
            text="All"
            className="w-[177px]"
            divWidth="w-[245px]"
            filterBased="Category"
            filter={categories}
            onSelect={setCategoryFilter}
          />
        </div>
      </div>
      <TransactionListHeader />
      <TransactionList transactions={currentItems} currentPage={currentPage} />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}

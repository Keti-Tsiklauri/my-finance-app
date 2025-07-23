"use client";
import { useState, useEffect } from "react";
import useData from "../useData";
import Pagination from "./Pagination";
import TransactionList from "./TransactionList";
import FilterDropDown from "./FilterDropDown";
import SearchTransaction from "../search/Search";
import TransactionListHeader from "./TransactionListHeader";
import type { Transaction } from "@/types/types";

export default function TransactionsWrapper() {
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const data = useData();

  const [currentPage, setCurrentPage] = useState(1);

  // Filter selections
  const [sortOption, setSortOption] = useState("Latest");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const itemsPerPage = 10;

  // Initialize filtered transactions when data arrives
  useEffect(() => {
    if (!data) return;
    setFilteredTransactions(data.transactions);
  }, [data]);

  // Update filtered & sorted transactions when sort/category/search changes
  useEffect(() => {
    if (!data) return;

    let filtered = [...data.transactions];

    // Filter by category
    if (categoryFilter !== "All") {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
      case "Highest":
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case "Lowest":
        filtered.sort((a, b) => a.amount - b.amount);
        break;
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset page on filter/sort/search change
  }, [sortOption, categoryFilter, searchQuery, data]);

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
  const currentItems = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="flex justify-between xxl:w-[1000px] mx-auto mb-[20px] mt-[20px] w-[343px] md:w-[620px]">
        <SearchTransaction
          placeholder="Search Transaction"
          width="w-[100px] md:w-[160px] xxl:w-[320px]"
          height="h-[35px] md:h-[45px]"
          onSearch={setSearchQuery}
        />

        <div className="flex md:w-[430px] w-[230px] justify-between">
          <FilterDropDown
            text="Latest"
            className="w-[80px] md:w-[113px]"
            divWidth="w-[84px] md:w-[170px]"
            filterBased="Sort by"
            filter={[
              { id: 0, name: "Latest" },
              { id: 1, name: "Oldest" },
              { id: 2, name: "Highest" },
              { id: 3, name: "Lowest" },
            ]}
            onSelect={setSortOption}
          />

          <FilterDropDown
            text="All"
            filterBased="Category"
            className="w-[125px] md:w-[177px]"
            divWidth="w-[140px] md:w-[245px]"
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

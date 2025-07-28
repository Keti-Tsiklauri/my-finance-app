"use client";
import { useState, useEffect } from "react";
import Search from "../shared/search/Search";
import useSearch from "@/app/hooks/useSearch";
import useFilter from "@/app/hooks/useFilter";
import FilterDropDown from "../transactions/FilterDropDown";
import type { Bill } from "./BillsList";

interface SearchBillsProps {
  bills: Bill[];
  onFilter: (filtered: Bill[]) => void; // ✅ send filtered list up
}

export default function SearchBills({ bills, onFilter }: SearchBillsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { query, setQuery, searchedItems } = useSearch(bills, "name");
  const { filteredItems, sortOption, setSortOption, category, setCategory } =
    useFilter(searchedItems);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortOption, category]);

  // ✅ send filtered list to parent whenever it changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    onFilter(currentItems);
  }, [filteredItems, currentPage, itemsPerPage, onFilter]);

  const categories = [
    { id: -1, name: "All" },
    ...Array.from(new Set(bills.map((b) => b.category))).map((cat, idx) => ({
      id: idx,
      name: cat,
    })),
  ];

  return (
    <div className="flex justify-around  mx-auto mb-4 md:w-[660px] md:justify-between">
      <Search
        placeholder="Search Bills"
        width="w-[130px] md:w-[320px] xxl:w-[320px]"
        height="h-[35px] md:h-[45px]"
        onSearch={setQuery}
      />

      <FilterDropDown
        text={sortOption}
        className="w-[80px] md:w-[113px]"
        divWidth="w-[130px] md:w-[170px]"
        filterBased="Sort by"
        filter={[
          { id: 0, name: "Latest" },
          { id: 1, name: "Oldest" },
          { id: 2, name: "Highest" },
          { id: 3, name: "Lowest" },
        ]}
        onSelect={setSortOption}
      />
    </div>
  );
}

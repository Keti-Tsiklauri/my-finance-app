"use client";
import { useState, useEffect } from "react";
import useData from "../../app/hooks/useData";
import Pagination from "./Pagination";
import TransactionList from "./TransactionList";
import FilterDropDown from "./FilterDropDown";
import Search from "../shared/search/Search";

import useSearch from "../../app/hooks/useSearch";
import useFilter from "../../app/hooks/useFilter";

// ✅ Reusable Loader Component
function Loader() {
  return (
    <div className="flex justify-center items-center h-[400px]">
      <div className="w-12 h-12 border-4 border-[#277C78] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function TransactionsWrapper() {
  const data = useData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Search Hook
  const { query, setQuery, searchedItems } = useSearch(
    data?.transactions,
    "name"
  );

  // ✅ Filter Hook
  const { filteredItems, sortOption, setSortOption, category, setCategory } =
    useFilter(searchedItems);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortOption, category]);

  // ✅ Show loader while fetching data
  if (!data) return <Loader />;

  const categories = [
    { id: -1, name: "All" },
    ...Array.from(new Set(data.transactions.map((t) => t.category))).map(
      (cat, idx) => ({ id: idx, name: cat })
    ),
  ];

  const totalItems = filteredItems.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      {/* Search & Filters */}
      <div className="flex justify-between xxl:w-[1000px] mx-auto mb-[20px] mt-[20px] w-[343px] md:w-[700px]">
        <Search
          placeholder="Search Transaction"
          width="w-[100px] md:w-[160px] xxl:w-[320px]"
          height="h-[35px] md:h-[45px]"
          onSearch={setQuery}
        />

        <div className="flex md:w-[430px] w-[230px] justify-between">
          <FilterDropDown
            text={sortOption}
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
            text={category}
            filterBased="Category"
            className="w-[125px] md:w-[177px]"
            divWidth="w-[140px] md:w-[245px]"
            filter={categories}
            onSelect={setCategory}
          />
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-[12px] justify-between xxl:w-[1000px] mx-auto">
        <div className="w-[343px] md:w-[700px] mx-auto h-[600px] md:h-[600px]">
          <TransactionList
            transactions={currentItems}
            currentPage={currentPage}
          />
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}

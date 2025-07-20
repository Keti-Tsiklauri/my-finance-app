"use client";
import { useState } from "react";
import useData from "../useData";
import Pagination from "./Pagination";
import TransactionList from "./TransactionList";

export default function TransactionsWrapper() {
  const data = useData();

  const [currentPage, setCurrentPage] = useState(1);
  if (!data) return <p>Loading...</p>;

  const { transactions } = data;
  const itemsPerPage = 10;
  const totalItems = transactions.length;

  // Calculate sliced data for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = transactions.slice(startIndex, endIndex);

  return (
    <>
      <TransactionList
        transactions={data.transactions}
        currentPage={currentPage}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}

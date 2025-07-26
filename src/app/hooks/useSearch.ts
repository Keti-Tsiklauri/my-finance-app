"use client";
import { useState, useEffect } from "react";

export default function useSearch<T>(
  data: T[] | undefined,
  searchField: keyof T
) {
  const [query, setQuery] = useState("");
  const [searchedItems, setSearchedItems] = useState<T[]>([]);

  useEffect(() => {
    if (!data) return;
    if (query.trim() === "") {
      setSearchedItems(data);
    } else {
      const lowerQuery = query.toLowerCase();
      setSearchedItems(
        data.filter((item) =>
          String(item[searchField]).toLowerCase().includes(lowerQuery)
        )
      );
    }
  }, [data, query, searchField]);

  return { query, setQuery, searchedItems };
}

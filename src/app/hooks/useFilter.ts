"use client";
import { useState, useEffect } from "react";

interface Item {
  category: string;
  date: string;
  amount: number;
}

export default function useFilter<T extends Item>(data: T[] | undefined) {
  const [filteredItems, setFilteredItems] = useState<T[]>([]);
  const [sortOption, setSortOption] = useState("Latest");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (!data) return;

    let items = [...data];

    if (category !== "All") {
      items = items.filter((i) => i.category === category);
    }

    switch (sortOption) {
      case "Latest":
        items.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "Oldest":
        items.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "Highest":
        items.sort((a, b) => b.amount - a.amount);
        break;
      case "Lowest":
        items.sort((a, b) => a.amount - b.amount);
        break;
    }

    setFilteredItems(items);
  }, [data, sortOption, category]);

  return { filteredItems, sortOption, setSortOption, category, setCategory };
}

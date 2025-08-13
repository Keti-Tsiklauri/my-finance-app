"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

type Transaction = {
  name: string;
  amount: number;
  category: string;
  date: string;
  avatar: string;
  recurring: boolean;
};

type Pot = {
  name: string;
  target: number;
  total: number;
  theme: string;
  themeText?: string; // add this
};

type Balance = {
  current: number;
  income: number;
  expenses: number;
};

type GlobalData = {
  balance: Balance;
  transactions: Transaction[];
  budgets: Budget[];
  pots: Pot[];
};

type GlobalContextType = {
  data: GlobalData | null;
  setData: React.Dispatch<React.SetStateAction<GlobalData | null>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  data: null,
  setData: () => {},
});

export const GlobalDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<GlobalData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const stored = localStorage.getItem("finance-data");
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        const res = await fetch("/data.json");
        const json = await res.json();
        setData(json);
        localStorage.setItem("finance-data", JSON.stringify(json));
      }
    };

    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

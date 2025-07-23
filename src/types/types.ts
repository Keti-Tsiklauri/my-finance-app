export interface Transaction {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface Budgets {
  category: string;
  maximum: number;
  theme: string;
}

export interface Balance {
  current: number;
  income: number;
  expenses: number;
}
export interface Pots {
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface Data {
  balance: Balance;
  budgets: Budgets[];
  transactions: Transaction[];
  pots: Pots[];
}

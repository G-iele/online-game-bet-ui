export type TransactionTypes = "bet" | "price";

export type Transaction = {
  id: string;
  createdAt: string;
  amount: number;
  type: TransactionTypes;
};

export type Transactions = {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
};

export type TransactionsQuery = {
  page: number;
  limit: number;
  id?: string;
  type?: TransactionTypes | null;
};

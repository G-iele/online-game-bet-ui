import { Transactions, TransactionsQuery, TransactionTypes } from "./transactions";

export type WalletContextProps = {
  transactions: Transactions | null;
  limit: number;
  setLimit: (limit: number) => void;
  page: number;
  onPageChange: (newPage: number, totalPages: number) => void;
  typeFilter: TransactionTypes | null;
  setTypeFilter: (type: TransactionTypes | null) => void;
  getTransactions: () => Promise<void>;
};

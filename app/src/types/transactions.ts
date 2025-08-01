export type TransactionType = "bet" | "win" | "cancel";

export type TransactionQuery = {
  page: number;
  limit: number;
  id?: string;
  type?: TransactionType;
};

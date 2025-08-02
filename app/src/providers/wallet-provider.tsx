import { useCallback, useEffect, useState } from "react";
import { HttpService } from "../services/http-service";
import { usePagination } from "../hooks/use-paginator";
import { Transactions, TransactionsQuery, TransactionTypes } from "../types/transactions";
import { WalletContext } from "../context/wallet-context";

export const WalletProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transactions | null>(null);
  const [typeFilter, setTypeFilter] = useState<TransactionTypes | null>(null);

  const { page, limit, setLimit, onPageChange } = usePagination(1, 5);

  const getTransactions = useCallback(async () => {
    const query: TransactionsQuery = { page, limit, type: typeFilter };
    const response = await HttpService.getTransactions(query);
    setTransactions(response.data);
  }, [page, limit, typeFilter]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <WalletContext.Provider
      value={{
        transactions,
        limit,
        setLimit,
        page,
        onPageChange,
        typeFilter,
        setTypeFilter,
        getTransactions,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

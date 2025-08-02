import { useCallback, useEffect, useState } from "react";
import { BetsContext } from "../context/bets-context";
import { HttpService } from "../services/http-service";
import { BetQuery, Bets, BetStatus } from "../types/bets";
import { usePagination } from "../hooks/use-paginator";

import { useAuthContext } from "../hooks/use-auth-context";

export const BetsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [bets, setBets] = useState<Bets | null>(null);
  const [statusFilter, setStatusFilter] = useState<BetStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const { setUser } = useAuthContext();

  const { page, limit, setLimit, onPageChange } = usePagination(1, 5);

  const onBet = async (amount: number) => {
    const res = await Promise.all([
      HttpService.bet(amount),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);

    setUser((prevUser) => (prevUser ? { ...prevUser, balance: res[0].data.balance } : prevUser));
    getBets();
  };

  const getBets = useCallback(async () => {
    setLoading(true);

    const query: BetQuery = { page, limit, status: statusFilter };
    const response = await HttpService.getBets(query);
    setBets(response.data);

    setLoading(false);
  }, [page, limit, statusFilter]);

  useEffect(() => {
    getBets();
  }, [getBets]);

  return (
    <BetsContext.Provider
      value={{
        onBet,
        bets,
        limit,
        setLimit,
        page,
        onPageChange,
        statusFilter,
        setStatusFilter,
        loading,
        getBets,
      }}
    >
      {children}
    </BetsContext.Provider>
  );
};

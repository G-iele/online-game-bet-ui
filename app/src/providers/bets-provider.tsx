import { useCallback, useEffect, useState } from "react";
import { BetsContext } from "../context/bets-context";
import { HttpService } from "../services/http-service";
import { Bet, BetQuery, Bets, BetStatus } from "../types/bets";
import { usePagination } from "../hooks/use-paginator";

import { useAuthContext } from "../hooks/use-auth-context";

export const BetsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [bets, setBets] = useState<Bets | null>(null);
  const [statusFilter, setStatusFilter] = useState<BetStatus | null>(null);

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
    const query: BetQuery = { page, limit, status: statusFilter };
    const response = await HttpService.getBets(query);
    setBets(response.data);
  }, [page, limit, statusFilter]);

  useEffect(() => {
    getBets();
  }, [getBets]);

  const onCancel = async (id: string) => {
    setBets((prevBets) =>
      prevBets
        ? {
            ...prevBets,
            data: prevBets.data.map((bet) => (bet.id === id ? { ...bet, loading: true } : bet)),
          }
        : prevBets,
    );

    const res = await Promise.all([
      HttpService.deleteBet(id),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);

    setUser((prevUser) => (prevUser ? { ...prevUser, balance: res[0].data.balance } : prevUser));
    getBets();

    setBets((prevBets) =>
      prevBets
        ? {
            ...prevBets,
            data: prevBets.data.map((bet) => (bet.id === id ? { ...bet, loading: false } : bet)),
          }
        : prevBets,
    );
  };

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
        getBets,
        onCancel,
      }}
    >
      {children}
    </BetsContext.Provider>
  );
};

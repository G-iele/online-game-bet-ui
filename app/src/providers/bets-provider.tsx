import { useCallback, useEffect, useState } from "react";
import { BetsContext } from "../context/bets-context";
import { HttpService } from "../services/http-service";
import { BetQuery, Bets, BetStatus } from "../types/bets";
import { usePagination } from "../hooks/use-paginator";

export const BetsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [bets, setBets] = useState<Bets | null>(null);
  const [statusFilter, setStatusFilter] = useState<BetStatus | null>(null);

  const { page, limit, setLimit, onPageChange } = usePagination(1, 5);

  const onBet = async (amount: number) => {
    await Promise.all([
      HttpService.bet(amount),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);

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

  return (
    <BetsContext.Provider
      value={{
        onBet,
        getBets,
        bets,
        limit,
        setLimit,
        page,
        onPageChange,
        statusFilter,
        setStatusFilter,
      }}
    >
      {children}
    </BetsContext.Provider>
  );
};

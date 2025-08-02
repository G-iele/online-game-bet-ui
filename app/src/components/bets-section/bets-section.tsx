import { useState, useMemo } from "react";
import { useBetsContext } from "../../hooks/use-bets-context";
import { BetsDisplay } from "../bets-display/bets-display";
import { BetsStatusSelector } from "../bets-status-selector/bets-status-selector";
import { BetsLimitPerPage } from "../bets-limit-per-page-selector/bets-limit-per-page-selector";
import { BetForm } from "../bet-form/bet-form";
import { useWalletContext } from "../../hooks/use-wallet-context";

export const BetsSection: React.FC = () => {
  const [betAmount, setBetAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getTransactions } = useWalletContext();

  const {
    loading,
    onBet,
    bets,
    limit,
    setLimit,
    page,
    onPageChange,
    statusFilter,
    setStatusFilter,
  } = useBetsContext();

  const totalPages = useMemo(() => Math.ceil((bets?.total ?? 0) / limit), [bets?.total, limit]);

  const handleSubmitBet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await onBet(betAmount);
      await getTransactions();
      setBetAmount(1);
    } catch (error) {
      console.error("Error placing bet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <BetForm
        handleSubmitBet={handleSubmitBet}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        isLoading={isLoading}
      />

      <BetsLimitPerPage
        limit={limit}
        setLimit={setLimit}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />

      <BetsStatusSelector
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />

      <BetsDisplay
        bets={bets?.data}
        onPageChange={onPageChange}
        page={page}
        totalPages={totalPages}
        loading={loading}
      />
    </section>
  );
};

import { BetForm } from "../../components/bet-form/bet-form";
import { useState } from "react";
import { useWalletContext } from "../../hooks/use-wallet-context";
import { useBetsContext } from "../../hooks/use-bets-context";

import classes from "./online-game-bet-page.module.scss";

export const OnlineGameBetScreen = () => {
  const [betAmount, setBetAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getTransactions } = useWalletContext();

  const { onBet } = useBetsContext();

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
    <div className={classes.container}>
      <h1>Bet!</h1>
      <BetForm
        handleSubmitBet={handleSubmitBet}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        isLoading={isLoading}
      />
    </div>
  );
};

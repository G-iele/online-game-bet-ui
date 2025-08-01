import { useAuthContext } from "../../hooks/use-auth-context";

type BetFormProps = {
  handleSubmitBet: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  betAmount: number;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
};

export const BetForm: React.FC<BetFormProps> = ({
  isLoading,
  setBetAmount,
  handleSubmitBet,
  betAmount,
}) => {
  const { user } = useAuthContext();

  const balance = user?.balance;

  return (
    <form onSubmit={handleSubmitBet}>
      <div>
        <label htmlFor="bet-amount">Place your bet:</label>
        <input
          id="bet-amount"
          type="number"
          name="bet"
          value={betAmount}
          onChange={(e) => {
            let amount = Number(e.target.value);

            if (amount < 1) {
              amount = 1;
            }

            if (balance && amount > balance) {
              amount = balance;
            }

            setBetAmount(amount < 1 ? 1 : amount);
          }}
          disabled={isLoading}
          required
          min={1}
          step={0.01}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Betting..." : "Bet!"}
      </button>
    </form>
  );
};

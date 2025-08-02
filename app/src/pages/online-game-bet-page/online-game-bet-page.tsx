import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/use-auth-context";
import { useBetsContext } from "../../hooks/use-bets-context";
import { useMemo, useState } from "react";
import { BetStatus } from "../../types/bets";
import { useCurrencyFormatting } from "../../hooks/use-currency-formatting";

export const OnlineGameBetScreen = () => {
  const { logout } = useAuthContext();
  const { onBet, bets, limit, setLimit, page, onPageChange, statusFilter, setStatusFilter } =
    useBetsContext();
  const navigate = useNavigate();
  const { formatCurrency } = useCurrencyFormatting();

  const [betAmount, setBetAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const totalPages = useMemo(() => Math.ceil((bets?.total ?? 0) / limit), [bets?.total, limit]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSubmitBet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await onBet(betAmount);
      setBetAmount(1);
    } catch (error) {
      console.error("Error placing bet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Good luck!</h1>

      <form onSubmit={handleSubmitBet}>
        <div>
          <label htmlFor="bet">Place your bet:</label>
          <input
            id="bet"
            type="number"
            name="bet"
            value={betAmount}
            onChange={(e) => {
              const amount = Number(e.target.value);
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

      <section>
        <div>
          <label htmlFor="limit-select">Bets per page: </label>
          <select
            id="limit-select"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              onPageChange(1, totalPages);
            }}
          >
            {[5, 10, 20].map((limit) => (
              <option key={limit} value={limit}>
                {limit}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status-select">Filter by status:</label>
          <select
            id="status-select"
            value={statusFilter ?? ""}
            onChange={(e) => {
              const value = e.target.value as BetStatus | "";
              setStatusFilter(value === "" ? null : value);
              onPageChange(1, totalPages);
            }}
          >
            <option value="">All</option>
            <option value="win">Win</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <table>
          <caption>
            <h2>Your Bets</h2>
          </caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Date/Time</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Prize</th>
            </tr>
          </thead>
          <tbody>
            {bets?.data.map((bet) => (
              <tr key={bet.id}>
                <th scope="row">{bet.id}</th>
                <td>{new Date(bet.createdAt).toLocaleString()}</td>
                <td>{formatCurrency(bet.amount)}</td>
                <td>{bet.status}</td>
                <td>{bet.winAmount != null ? formatCurrency(bet.amount) : "-"}</td>
              </tr>
            ))}
            {bets?.data.length === 0 && (
              <tr>
                <td colSpan={5}>No bets found.</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <div>
                  <button onClick={() => onPageChange(page - 1, totalPages)} disabled={page === 1}>
                    ◀
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => onPageChange(i + 1, totalPages)}>
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => onPageChange(page + 1, totalPages)}
                    disabled={page === totalPages}
                  >
                    ▶
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
      <div>
        <h2>Wallet</h2>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

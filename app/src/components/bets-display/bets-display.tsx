import { useBetsContext } from "../../hooks/use-bets-context";
import { useCurrencyFormatting } from "../../hooks/use-currency-formatting";
import { Bet } from "../../types/bets";

import classes from "./bets-display.module.scss";

type BetsDisplayProps = {
  bets: Bet[] | undefined;
  onPageChange: (newPage: number, totalPages: number) => void;
  page: number;
  totalPages: number;
};

export const BetsDisplay: React.FC<BetsDisplayProps> = ({
  bets,
  onPageChange,
  page,
  totalPages,
}) => {
  const { formatCurrency } = useCurrencyFormatting();
  const { onCancel } = useBetsContext();

  return (
    <div>
      <ul className={classes.card}>
        {bets && bets.length > 0 ? (
          bets.map((bet) => (
            <li key={bet.id}>
              <h4>ID</h4>
              <p>{bet.id}</p>
              <h4>Date/Time</h4>
              <p>{new Date(bet.createdAt).toLocaleString()}</p>
              <h4>Amount</h4>
              <p>{formatCurrency(bet.amount)}</p>
              <h4>Status</h4>
              <p>{bet.status}</p>
              <h4>Prize</h4>
              <p>{bet.winAmount != null ? formatCurrency(bet.winAmount) : "-"}</p>

              <button
                onClick={() => {
                  onCancel(bet.id);
                }}
                disabled={bet.status === "canceled" || bet.loading}
                className={classes.cancelButton}
              >
                {bet.loading ? "Loading..." : bet.status === "canceled" ? "Canceled" : "Cancel"}
              </button>
            </li>
          ))
        ) : (
          <li>No bets found.</li>
        )}
      </ul>

      <div className={classes.paginator}>
        <button onClick={() => onPageChange(page - 1, totalPages)} disabled={page === 1}>
          {`<`}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => onPageChange(i + 1, totalPages)}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => onPageChange(page + 1, totalPages)} disabled={page === totalPages}>
          {`>`}
        </button>
      </div>
    </div>
  );
};

import { useCurrencyFormatting } from "../../hooks/use-currency-formatting";
import { Transactions } from "../../types/transactions";

import classes from "./transaction-display.module.scss";

type TransactionDisplayProps = {
  transactions: Transactions | null;
  onPageChange: (newPage: number, totalPages: number) => void;
  page: number;
  totalPages: number;
};

export const TransactionDisplay: React.FC<TransactionDisplayProps> = ({
  transactions,
  onPageChange,
  page,
  totalPages,
}) => {
  const { formatCurrency } = useCurrencyFormatting();

  return (
    <div>
      <ul className={classes.card}>
        {transactions && transactions?.total > 0 ? (
          transactions.data.map((transaction) => (
            <li key={transaction.id}>
              <h4>ID</h4>
              <p>{transaction.id}</p>
              <h4>Date/Time</h4>
              <p>{new Date(transaction.createdAt).toLocaleString()}</p>
              <h4>Tipe</h4>
              <p>{transaction.type}</p>
              <h4>Amount</h4>
              <p>{formatCurrency(transaction.amount)}</p>
            </li>
          ))
        ) : (
          <li>No Transaction found.</li>
        )}
      </ul>

      <div className={classes.paginator}>
        <button onClick={() => onPageChange(page - 1, totalPages)} disabled={page === 1}>
          {`<`}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => onPageChange(i + 1, totalPages)} disabled={page === i + 1}>
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

import { useCurrencyFormatting } from "../../hooks/use-currency-formatting";
import { Transactions } from "../../types/transactions";

type TransactionDisplayProps = {
  transactions: Transactions | null;
  onPageChange: (newPage: number, totalPages: number) => void;
  page: number;
  totalPages: number;
  loading: boolean;
};

export const TransactionDisplay: React.FC<TransactionDisplayProps> = ({
  transactions,
  onPageChange,
  page,
  totalPages,
  loading,
}) => {
  const { formatCurrency } = useCurrencyFormatting();

  return (
    <div>
      <table>
        <caption>
          <h2>Your Transactions</h2>
        </caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Date/Time</th>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          ) : transactions?.total ? (
            transactions.data.map((transaction) => (
              <tr key={transaction.id}>
                <th scope="row">{transaction.id}</th>
                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                <td>{transaction.type}</td>
                <td>{formatCurrency(transaction.amount)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No transactions found.</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
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
    </div>
  );
};

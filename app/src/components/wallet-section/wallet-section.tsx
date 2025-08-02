import { useMemo } from "react";
import { useCurrencyFormatting } from "../../hooks/use-currency-formatting";
import { useWalletContext } from "../../hooks/use-wallet-context";
import { TransactionTypes } from "../../types/transactions";
import { useAuthContext } from "../../hooks/use-auth-context";

export const WalletSection: React.FC = () => {
  const { formatCurrency } = useCurrencyFormatting();

  const { setLimit, loading, transactions, typeFilter, settypeFilter, onPageChange, limit, page } =
    useWalletContext();

  const { user } = useAuthContext();
  const balance = user?.balance;

  const totalPages = useMemo(
    () => Math.ceil((transactions?.total ?? 0) / limit),
    [transactions?.total, limit],
  );

  return (
    <section>
      <div>Balance: {formatCurrency(balance ? balance : 0)}</div>

      <div>
        <label htmlFor="transactions-limit-select">Bets per page: </label>
        <select
          id="transactions-limit-select"
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
        <label htmlFor="type-select">Filter by type:</label>
        <select
          id="type-select"
          value={typeFilter ?? ""}
          onChange={(e) => {
            const value = e.target.value as TransactionTypes | "";
            settypeFilter(value === "" ? null : value);
            onPageChange(1, totalPages);
          }}
        >
          <option value="">All</option>
          <option value="bet">Bet</option>
          <option value="win">Win</option>
        </select>
      </div>

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
    </section>
  );
};

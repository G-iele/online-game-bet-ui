import { useCurrencyFormatting } from "../../hooks/use-currency-formatting";
import { Bet } from "../../types/bets";

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

  return (
    <div>
      {bets ? (
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
            {bets.map((bet) => (
              <tr key={bet.id}>
                <th scope="row">{bet.id}</th>
                <td>{new Date(bet.createdAt).toLocaleString()}</td>
                <td>{formatCurrency(bet.amount)}</td>
                <td>{bet.status}</td>
                <td>{bet.winAmount != null ? formatCurrency(bet.winAmount) : "-"}</td>
              </tr>
            ))}
            {bets.length === 0 && (
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
      ) : (
        <div>'There is no bets YET!'</div>
      )}
    </div>
  );
};

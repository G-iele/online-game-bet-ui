import { BetStatus } from "../../types/bets";

type TransactionLimitPerPageSelectorProps = {
  limit: number;
  setLimit: (limit: number) => void;
  onPageChange: (newPage: number, totalPages: number) => void;
  totalPages: number;
};

export const TransactionLimitPerPage: React.FC<TransactionLimitPerPageSelectorProps> = ({
  limit,
  setLimit,
  onPageChange,
  totalPages,
}) => {
  return (
    <div>
      <label htmlFor="transactions-limit-select">Transactions per page: </label>
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
  );
};

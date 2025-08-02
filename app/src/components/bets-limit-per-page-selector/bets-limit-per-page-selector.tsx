import { BetStatus } from "../../types/bets";

type BetsLimitPerPageSelectorProps = {
  limit: number;
  setLimit: (limit: number) => void;
  onPageChange: (newPage: number, totalPages: number) => void;
  totalPages: number;
};

export const BetsLimitPerPage: React.FC<BetsLimitPerPageSelectorProps> = ({
  limit,
  setLimit,
  onPageChange,
  totalPages,
}) => {
  return (
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
  );
};

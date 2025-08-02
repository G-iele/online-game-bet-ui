import { TransactionTypes } from "../../types/transactions";

type TransactionTypeSelectorProps = {
  setTypeFilter: (status: TransactionTypes | null) => void;
  typeFilter: TransactionTypes | null;
  onPageChange: (newPage: number, totalPages: number) => void;
  totalPages: number;
};

export const TransactionTypeSelector: React.FC<TransactionTypeSelectorProps> = ({
  setTypeFilter,
  typeFilter,
  onPageChange,
  totalPages,
}) => {
  return (
    <div>
      <label htmlFor="type-select">Filter by type:</label>
      <select
        id="type-select"
        value={typeFilter ?? ""}
        onChange={(e) => {
          const value = e.target.value as TransactionTypes | "";
          setTypeFilter(value === "" ? null : value);
          onPageChange(1, totalPages);
        }}
      >
        <option value="">All</option>
        <option value="bet">Bet</option>
        <option value="win">Win</option>
      </select>
    </div>
  );
};

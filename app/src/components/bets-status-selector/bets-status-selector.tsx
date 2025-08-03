import { BetStatus } from "../../types/bets";
import classes from "./bets-status-selector.module.scss";

type BetsStatusSelectorProps = {
  setStatusFilter: (status: BetStatus | null) => void;
  statusFilter: BetStatus | null;
  onPageChange: (newPage: number, totalPages: number) => void;
  totalPages: number;
};

export const BetsStatusSelector: React.FC<BetsStatusSelectorProps> = ({
  setStatusFilter,
  statusFilter,
  onPageChange,
  totalPages,
}) => {
  return (
    <div className={classes.container}>
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
        <option value="canceled">Canceled</option>
      </select>
    </div>
  );
};

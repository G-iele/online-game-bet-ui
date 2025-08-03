import classes from "./transaction-limit-per-page-selector.module.scss";

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
    <div className={classes.container}>
      <label htmlFor="transactions-limit-select" className={classes.label}>
        Transactions per page:
      </label>
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

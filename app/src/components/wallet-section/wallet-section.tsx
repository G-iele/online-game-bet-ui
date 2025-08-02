import { useMemo } from "react";
import { useWalletContext } from "../../hooks/use-wallet-context";
import { TransactionLimitPerPage } from "../transaction-limit-per-page-selector/transaction-limit-per-page-selector";
import { TransactionTypeSelector } from "../transaction-type-selector/transaction-type-selector";
import { TransactionDisplay } from "../transaction-display/transaction-display";

export const WalletSection: React.FC = () => {
  const { setLimit, loading, transactions, typeFilter, setTypeFilter, onPageChange, limit, page } =
    useWalletContext();

  const totalPages = useMemo(
    () => Math.ceil((transactions?.total ?? 0) / limit),
    [transactions?.total, limit],
  );

  return (
    <section>
      <TransactionLimitPerPage
        limit={limit}
        setLimit={setLimit}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />

      <TransactionTypeSelector
        setTypeFilter={setTypeFilter}
        typeFilter={typeFilter}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />

      <TransactionDisplay
        transactions={transactions}
        onPageChange={onPageChange}
        page={page}
        totalPages={totalPages}
        loading={loading}
      />
    </section>
  );
};

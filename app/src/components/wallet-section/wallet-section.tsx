import { useMemo } from "react";
import { useCurrencyFormatting } from "../../hooks/use-currency-formatting";
import { useWalletContext } from "../../hooks/use-wallet-context";
import { useAuthContext } from "../../hooks/use-auth-context";
import { TransactionLimitPerPage } from "../transaction-limit-per-page-selector/transaction-limit-per-page-selector";
import { TransactionTypeSelector } from "../transaction-type-selector/transaction-type-selector";
import { TransactionDisplay } from "../transaction-display/transaction-display";

export const WalletSection: React.FC = () => {
  const { formatCurrency } = useCurrencyFormatting();

  const { setLimit, loading, transactions, typeFilter, setTypeFilter, onPageChange, limit, page } =
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

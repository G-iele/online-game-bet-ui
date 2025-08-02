import { useMemo } from "react";
import { useBetsContext } from "../../hooks/use-bets-context";
import { BetsDisplay } from "../bets-display/bets-display";
import { BetsStatusSelector } from "../bets-status-selector/bets-status-selector";
import { BetsLimitPerPage } from "../bets-limit-per-page-selector/bets-limit-per-page-selector";

export const BetsSection: React.FC = () => {
  const { bets, limit, setLimit, page, onPageChange, statusFilter, setStatusFilter } =
    useBetsContext();

  const totalPages = useMemo(() => Math.ceil((bets?.total ?? 0) / limit), [bets?.total, limit]);

  return (
    <section>
      <BetsLimitPerPage
        limit={limit}
        setLimit={setLimit}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />

      <BetsStatusSelector
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />

      <BetsDisplay
        bets={bets?.data}
        onPageChange={onPageChange}
        page={page}
        totalPages={totalPages}
      />
    </section>
  );
};

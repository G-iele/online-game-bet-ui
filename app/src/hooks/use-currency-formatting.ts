import { useMemo } from "react";

export const useCurrencyFormatting = () => {
  const formattingSettings: Intl.NumberFormatOptions = useMemo(
    () => ({
      currency: "EUR",
      currencyDisplay: "code",
      style: "currency",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
    [],
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("lt-LT", formattingSettings).format(value);

  return { formatCurrency };
};

import { useContext } from "react";
import { BetsContext } from "../context/bets-context";

export const useBetsContext = () => {
  const betsContext = useContext(BetsContext);

  if (!betsContext) {
    throw new Error("No bets context");
  }

  return betsContext;
};

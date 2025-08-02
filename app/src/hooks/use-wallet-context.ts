import { useContext } from "react";
import { WalletContext } from "../context/wallet-context";

export const useWalletContext = () => {
  const authContext = useContext(WalletContext);

  if (!authContext) {
    throw new Error("No wallet context");
  }

  return authContext;
};

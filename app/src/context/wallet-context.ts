import { createContext } from "react";
import { WalletContextProps } from "../types/wallet";

export const WalletContext = createContext<WalletContextProps | undefined>(undefined);

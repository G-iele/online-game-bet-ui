import { createContext } from "react";
import { BetsContextProps } from "../types/bets";

export const BetsContext = createContext<BetsContextProps | undefined>(undefined);

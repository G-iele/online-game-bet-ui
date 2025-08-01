import { LoginPayload, RegisterPayload } from "../types/auth";
import { BetQuery } from "../types/bets";
import { TransactionQuery } from "../types/transactions";
import { httpClient } from "./base-http-client";

export const HttpService = {
  register: async (data: RegisterPayload) => {
    return httpClient.post("/register", data);
  },
  login: async (data: LoginPayload) => {
    return httpClient.post("/login", data);
  },
  bet: async (amount: number) => {
    return httpClient.post("/bet", { amount });
  },
  deleteBet: async (id: string) => {
    return httpClient.delete(`/my-bet/${id}`);
  },
  getBets: async (params: BetQuery) => {
    return httpClient.get("/my-bets", { params });
  },
  getTransactions: async (params: TransactionQuery) => {
    return httpClient.get("/my-transactions", { params });
  },
};

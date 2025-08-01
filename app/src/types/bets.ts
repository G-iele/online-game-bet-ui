export type BetStatus = "win" | "lost" | "cancel";

export type BetQuery = {
  page: number;
  limit: number;
  id?: string;
  status?: BetStatus;
};

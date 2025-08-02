export type BetStatus = "win" | "lost" | "canceled";

export type BetQuery = {
  page: number;
  limit: number;
  id?: string;
  status?: BetStatus | null;
};

export type BetsContextProps = {
  onBet: (amount: number) => Promise<void>;
  bets: Bets | null;
  limit: number;
  setLimit: (limit: number) => void;
  page: number;
  onPageChange: (newPage: number, totalPages: number) => void;
  statusFilter: BetStatus | null;
  setStatusFilter: (status: BetStatus | null) => void;
  getBets: () => Promise<void>;
  onCancel: (id: string) => Promise<void>;
};

export type Bet = {
  id: string;
  createdAt: string;
  amount: number;
  winAmount: number;
  status: string;
  loading?: boolean;
};

export type Bets = {
  data: Bet[];
  total: number;
  page: number;
  limit: number;
};

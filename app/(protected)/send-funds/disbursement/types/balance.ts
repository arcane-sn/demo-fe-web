// Balance Types based on tooltips
export interface BalanceData {
  activeBalance: number;      // Funds available for disbursement
  pendingBalance: number;     // Funds not yet released, awaiting approval or processing
  holdBalance: number;        // Funds held by internal team, not available for disbursement
  totalBalance: number;       // Sum of Active Balance and Pending Balance
}

export interface BalanceOverview {
  merchant: string;
  balances: BalanceData;
  lastUpdated: string;
}


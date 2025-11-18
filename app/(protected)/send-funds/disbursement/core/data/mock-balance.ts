import { BalanceOverview } from '../../types/balance';

export const mockBalanceData: BalanceOverview = {
  merchant: 'FLYPAY PG',
  balances: {
    activeBalance: 200000000,      // IDR 200.000.000 - Funds available for disbursement
    pendingBalance: 10000000,      // IDR 10.000.000 - Funds not yet released
    holdBalance: 5000000,          // IDR 5.000.000 - Funds held by internal team
    totalBalance: 210000000        // IDR 210.000.000 - Sum of Active + Pending
  },
  lastUpdated: '2025-01-16 14:30:00'
};

export const mockMerchantBalances: BalanceOverview[] = [
  {
    merchant: 'FLYPAY PG',
    balances: {
      activeBalance: 200000000,
      pendingBalance: 10000000,
      holdBalance: 5000000,
      totalBalance: 210000000
    },
    lastUpdated: '2025-01-16 14:30:00'
  },
  {
    merchant: 'FLYPAY DISBURSEMENT',
    balances: {
      activeBalance: 150000000,
      pendingBalance: 25000000,
      holdBalance: 10000000,
      totalBalance: 175000000
    },
    lastUpdated: '2025-01-16 14:25:00'
  },
  {
    merchant: 'FLYPAY MERCHANT',
    balances: {
      activeBalance: 75000000,
      pendingBalance: 5000000,
      holdBalance: 2000000,
      totalBalance: 80000000
    },
    lastUpdated: '2025-01-16 14:20:00'
  }
];


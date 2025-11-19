import { ApexOptions } from "apexcharts";

// Balance Overview
export interface BalanceOverviewData {
  value: string;
  title: string;
}

// Merchant
export interface Merchant {
  id: string;
  name: string;
  volume: number;
  amount: number;
}

export type MerchantSortBy = "byAmount" | "byVolume";

// Payment Channel
export interface PaymentChannel {
  label: string;
  value: number;
  color: string;
}

// Quick Access
export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

// Transaction
export interface TransactionSeries {
  name: string;
  data: number[];
}

export interface TransactionChartState {
  series: TransactionSeries[];
  options: ApexOptions;
}


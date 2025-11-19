import { BalanceOverviewData, Merchant } from "../models";

/**
 * Mock balance overview data for dashboard
 * In production, this would be replaced with API calls
 */
export const MOCK_BALANCE_OVERVIEW: BalanceOverviewData[] = [
  {
    value: "600",
    title: "Total Transaction",
  },
  {
    value: "IDR 155.000.000",
    title: "Total Flypay Revenue",
  },
  {
    value: "IDR 624.000.000",
    title: "Total Vendor Admin Fee",
  },
];

/**
 * Get mock balance overview data
 * In production, this would be replaced with API calls
 */
export const getMockBalanceOverview = (): BalanceOverviewData[] => {
  return MOCK_BALANCE_OVERVIEW;
};

/**
 * Mock merchants data for dashboard
 * In production, this would be replaced with API calls
 */
export const MOCK_MERCHANTS: Merchant[] = [
  {
    id: "MERCH001",
    name: "PT AAAAA AAAAA AAAAA",
    volume: 200,
    amount: 369000000,
  },
  {
    id: "MERCH002",
    name: "PT BBBBB BBBBB BBBBB",
    volume: 500,
    amount: 235000000,
  },
  {
    id: "MERCH003",
    name: "PT CCCC CCCC CCCC",
    volume: 100,
    amount: 100000000,
  },
  {
    id: "MERCH004",
    name: "PT AAAAA AAAAA AAAAA",
    volume: 120,
    amount: 80000000,
  },
  {
    id: "MERCH005",
    name: "PT AAAAA AAAAA AAAAA",
    volume: 200,
    amount: 50000000,
  },
];

/**
 * Get mock merchants data
 * In production, this would be replaced with API calls
 */
export const getMockMerchants = (): Merchant[] => {
  return MOCK_MERCHANTS;
};


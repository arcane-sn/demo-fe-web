"use client";

import { SettlementHistoryData } from "./models";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number | string) => {
  const amount = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(amount)) {
    return value.toString();
  }

  return currencyFormatter
    .format(amount)
    .replace("Rp", "IDR")
    .replace(/\u00A0/g, " ");
};

export const createSettlementRow = (
  base: Partial<SettlementHistoryData>,
  index: number,
): SettlementHistoryData => ({
  id: index.toString(),
  settlementDate: "Thu, Dec 16, 2025",
  settlementTime: "23:12:02 (GMT +7)",
  reportDate: "Thu, Dec 16, 2025",
  reportTime: "23:12:02 (GMT +7)",
  updatedDate: "Thu, Dec 16, 2025",
  updatedTime: "23:12:32 (GMT +7)",
  settlementId: `SS121019293012${index}`,
  reportId: `SR121019293012${index}`,
  merchantName: "DigStore",
  clientId: "FP202501990001",
  channel: "BCA",
  totalTransaction: 2,
  totalPaidAmount: 10_000_000,
  netSettlementAmount: 8_500_000,
  mdr: 1_500_000,
  mdrPercentage: 1.5,
  providerFee: 700_000,
  providerPercentage: 0.7,
  merchantFee: 300_000,
  merchantPercentage: 0.3,
  flypayFee: 100_000,
  flypayPercentage: 0.1,
  resellerFee: 500_000,
  resellerPercentage: 0.5,
  merchantReferralFee: 50_000,
  merchantReferralPercentage: 0.1,
  salesReferralFee: 50_000,
  salesReferralPercentage: 0.05,
  settlementStatus: "success",
  reportingStatus: "success",
  ...base,
});


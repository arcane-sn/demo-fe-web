"use client";

import type { KeeniconsStyle } from "@/components/keenicons/types";

export type SettlementStatus = "success" | "pending" | "failed";

export interface SettlementHistoryData {
  id: string;
  settlementDate: string;
  settlementTime: string;
  reportDate: string;
  reportTime: string;
  settlementStatus: SettlementStatus;
  reportingStatus: SettlementStatus;
  merchantName: string;
  clientId: string;
  channel: string;
  totalTransaction: number;
  totalPaidAmount: number;
  netSettlementAmount: number;
  mdr: number;
  mdrPercentage: number;
  providerFee: number;
  providerPercentage: number;
  merchantFee: number;
  merchantPercentage: number;
  flypayFee: number;
  flypayPercentage: number;
  resellerFee: number;
  resellerPercentage: number;
  merchantReferralFee: number;
  merchantReferralPercentage: number;
  salesReferralFee: number;
  salesReferralPercentage: number;
  settlementId: string;
  reportId: string;
  updatedDate: string;
  updatedTime: string;
}

export interface ProviderBalanceSummary {
  active: string;
  pending: string;
  total: string;
  hold: string;
}

export interface BalanceDetailItem {
  label: string;
  value: string;
  iconName: string;
  iconStyle?: KeeniconsStyle;
  iconColor?: string;
}

export interface OverviewStat {
  value: string;
  title: string;
}

export interface ProviderOption {
  label: string;
  value: string;
}


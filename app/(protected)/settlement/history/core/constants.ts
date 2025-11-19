"use client";

import { ProviderBalanceSummary, BalanceDetailItem, OverviewStat, ProviderOption } from "./models";

export const PROVIDER_BALANCE_SUMMARY: ProviderBalanceSummary = {
  active: "IDR 200.000.000",
  pending: "IDR 100.000.000",
  total: "IDR 300.000.000",
  hold: "IDR 1.000.000",
};

export const PROVIDER_BALANCE_DETAIL_ITEMS: BalanceDetailItem[] = [
  {
    label: "Active Balance",
    value: PROVIDER_BALANCE_SUMMARY.active,
    iconName: "rocket",
    iconStyle: "outline",
    iconColor: "text-success",
  },
  {
    label: "Pending Balance",
    value: PROVIDER_BALANCE_SUMMARY.pending,
    iconName: "watch",
    iconStyle: "outline",
    iconColor: "text-orange-500",
  },
  {
    label: "Total Balance",
    value: PROVIDER_BALANCE_SUMMARY.total,
    iconName: "briefcase",
    iconStyle: "outline",
    iconColor: "text-primary",
  },
  {
    label: "Hold Balance",
    value: PROVIDER_BALANCE_SUMMARY.hold,
    iconName: "shield-cross",
    iconStyle: "outline",
    iconColor: "text-red-500",
  },
];

export const PROVIDER_OPTIONS: ProviderOption[] = [
  { label: "Alto Premium", value: "alto-premium" },
  { label: "Alto Standard", value: "alto-standard" },
  { label: "Alto Basic", value: "alto-basic" },
  { label: "Flip", value: "flip" },
];

export const SETTLEMENT_OVERVIEW_STATS: OverviewStat[] = [
  { value: "1000", title: "Total Transaction" },
  { value: "IDR 155.000.000", title: "Total Net Settlement Amount" },
  { value: "IDR 9.000.000", title: "Total MDR Flypay" },
  { value: "IDR 369.000.000", title: "Total Paid Amount" },
];

export const SETTLEMENT_SEARCH_FIELDS = [
  { label: "Merchant Name", value: "merchantName" },
  { label: "Client ID", value: "clientId" },
  { label: "Settlement ID", value: "settlementId" },
  { label: "Report ID", value: "reportId" },
  { label: "Channel", value: "channel" },
] as const;

export const SETTLEMENT_STATUS_OPTIONS = [
  { id: "success", label: "Success" },
  { id: "pending", label: "Pending" },
  { id: "failed", label: "Failed" },
] as const;

export const SETTLEMENT_FILTER_KEYS = {
  STATUS: "settlementStatus",
} as const;

export const SETTLEMENT_FILTER_LABELS = {
  STATUS: "Settlement Status",
} as const;

export const SETTLEMENT_SEARCH_PLACEHOLDER =
  "Search merchant, client, settlement ID, report ID, or channel...";

export const SETTLEMENT_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy";
export const SETTLEMENT_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";
export const SETTLEMENT_DEFAULT_DATE_TYPE = "settlementDate";
export const SETTLEMENT_PAGE_SIZE = 10;
export const SETTLEMENT_PAGE_SIZE_OPTIONS = [10, 20, 50];

export const SETTLEMENT_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const SETTLEMENT_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const SETTLEMENT_DATE_FILTER_PLACEHOLDER = "Settlement Date";
export const SETTLEMENT_DATE_TYPE_OPTIONS = [
  { label: "Settlement Date", value: "settlementDate" },
  { label: "Report Date", value: "reportDate" },
] as const;

export const SETTLEMENT_EMPTY_STATE = {
  defaultTitle: "No Settlement History",
  defaultDescription: "You don't have any settlement records yet.",
  filteredTitle: "No Results Found",
  filteredDescription: "No settlements match your filters. Try adjusting search or filters.",
} as const;


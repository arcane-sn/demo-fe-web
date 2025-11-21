import { PayInTransaction, PaymentStatus } from "./_models";
import type { CheckboxOption } from "@/components/reusable/CheckboxList";
import { MOCK_PAY_IN_TRANSACTIONS } from "./_mock-data";

// Single source of truth for Pay-In statistics
// Contains all data needed for both StatisticsCard and Modal Summary Detail
export type PayInStatData = {
  label: string;
  number: string; // For StatisticsCard (displayed as number)
  value: string; // For Modal Summary Detail (displayed as value)
  icon: string; // For Modal Summary Detail
};

// Complete data - first 4 items for StatisticsCard, all items for Modal
export const PAY_IN_STAT_DATA: PayInStatData[] = [
  {
    label: "Total Trans. Volume",
    number: "624.000",
    value: "624.000",
    icon: "file-sheet",
  },
  {
    label: "Total Trans. Amount",
    number: "IDR 369.000.000",
    value: "IDR 369.000.000",
    icon: "bill",
  },
  {
    label: "Total MDR",
    number: "IDR 60.700.000",
    value: "IDR 60.700.000",
    icon: "discount",
  },
  {
    label: "Total Flypay Rate",
    number: "IDR 60.700.000",
    value: "IDR 60.700.000",
    icon: "discount",
  },
  {
    label: "Total Transaction",
    number: "10.000",
    value: "10.000",
    icon: "cheque",
  },
  {
    label: "Total Merchant Rate",
    number: "IDR 60.700.000",
    value: "IDR 60.700.000",
    icon: "discount",
  },
  {
    label: "Total Provider Rate",
    number: "IDR 15.700.000",
    value: "IDR 15.700.000",
    icon: "discount",
  },
  {
    label: "Total Reseller Rate",
    number: "IDR 15.700.000",
    value: "IDR 15.700.000",
    icon: "discount",
  },
  {
    label: "Total Merch. Ref Fee",
    number: "IDR 10.000.000",
    value: "IDR 10.000.000",
    icon: "discount",
  },
  {
    label: "Total Sales Ref. Fee",
    number: "IDR 15.700.000",
    value: "IDR 15.700.000",
    icon: "discount",
  },
];

export type PayInStatItem = {
  number: string;
  label: string;
};

export type PayInSummaryDetailItem = {
  label: string;
  value: string;
  icon: string;
};

export const getPayInStats = (data: PayInStatData[]): PayInStatItem[] => {
  return data.map((item) => ({
    number: item.number,
    label: item.label,
  }));
};

export const getPayInSummaryDetailItems = (
  data: PayInStatData[]
): PayInSummaryDetailItem[] => {
  return data.map((item) => ({
    label: item.label,
    value: item.value,
    icon: item.icon,
  }));
};

export const PAY_IN_STATS: PayInStatItem[] = getPayInStats(
  PAY_IN_STAT_DATA.slice(0, 4)
);

const MODAL_ORDER_INDICES = [4, 1, 2, 5, 3, 6, 7, 8, 9]; // Zero-based indices
export const PAY_IN_SUMMARY_DETAIL_ITEMS: PayInSummaryDetailItem[] =
  getPayInSummaryDetailItems(
    MODAL_ORDER_INDICES.map((index) => PAY_IN_STAT_DATA[index])
  );

export const PAYMENT_METHODS = [
  { label: "All Payment Methods", value: "all" },
  { label: "Debit/Credit Card", value: "debit_credit_card" },
  { label: "VA", value: "va" },
  { label: "e-Wallet", value: "e_wallet" },
  { label: "QR Code", value: "qr_code" },
];

export const TRANSACTION_ACTIONS = [
  {
    label: "Resend Callback",
    value: "resend_callback",
    icon: "message-programming",
  },
  {
    label: "Force Update Status",
    value: "force_update_status",
    icon: "switch",
  },
  {
    label: "Refund",
    value: "refund",
    icon: "arrow-right-left",
  },
  {
    label: "Chargeback",
    value: "chargeback",
    icon: "shield-cross",
  },
  {
    label: "Void",
    value: "void",
    icon: "cross-circle",
  },
  {
    label: "Cancel",
    value: "cancel",
    icon: "trash",
  },
] as const;

// Mock data is now imported from _mock-data.ts
// This keeps the constants file clean and focused on configuration
export { MOCK_PAY_IN_TRANSACTIONS } from "./_mock-data";

// Filter options for pay-in transactions
export const PAY_IN_FILTER_OPTIONS = [
  {
    id: "paymentStatus",
    label: "Payment Status",
    type: "multiselect" as const,
    options: [
      { label: "Pending", value: "Pending", count: 8 },
      { label: "Success", value: "Success", count: 8 },
      { label: "Failed", value: "Failed", count: 0 },
      { label: "Expired", value: "Expired", count: 0 },
    ],
  },
  {
    id: "paymentMethod",
    label: "Payment Method",
    type: "multiselect" as const,
    options: [
      { label: "e-Wallet", value: "e-Wallet", count: 9 },
      { label: "Credit Card", value: "Credit Card", count: 0 },
      { label: "Bank Transfer", value: "Bank Transfer", count: 0 },
      { label: "QR Code", value: "QR Code", count: 0 },
    ],
  },
  {
    id: "paymentChannel",
    label: "Payment Channel",
    type: "multiselect" as const,
    options: [
      { label: "DANA", value: "DANA", count: 9 },
      { label: "OVO", value: "OVO", count: 0 },
      { label: "GoPay", value: "GoPay", count: 0 },
      { label: "ShopeePay", value: "ShopeePay", count: 0 },
    ],
  },
];

// Search fields for pay-in transactions
export const PAY_IN_SEARCH_FIELDS: (keyof PayInTransaction)[] = [
  "referenceNumber",
  "partnerReferenceNumber",
  "merchantName",
  "clientId",
  "activityId",
  "customerEmail",
];

// Table configuration constants
export const PAY_IN_TABLE_CONFIG = {
  pageSize: 10,
  searchPlaceholder: "Search transactions...",
  enableRowSelection: true,
  enableSorting: true,
  enablePagination: true,
  searchable: true,
} as const;

// Filter options for modal filter
export const PAY_IN_PAYMENT_STATUS_OPTIONS: CheckboxOption[] = [
  { id: "pending", label: "Pending", checked: false },
  { id: "success", label: "Success", checked: false },
  { id: "failed", label: "Failed", checked: false },
  { id: "expired", label: "Expired", checked: false },
];

export const PAY_IN_ACTIVITY_OPTIONS: CheckboxOption[] = [
  { id: "payment-gateway", label: "Payment Gateway", checked: false },
  { id: "sales-invoice", label: "Sales Invoice", checked: false },
];

export const PAY_IN_PROVIDER_NAME_OPTIONS: CheckboxOption[] = [
  { id: "piye", label: "PIYE", checked: false },
  { id: "piro", label: "PIRO", checked: false },
];

// VA specific filter options
export const PAY_IN_VA_TYPE_OPTIONS: CheckboxOption[] = [
  { id: "open-va", label: "Open VA", checked: false },
  { id: "close-va", label: "Close VA", checked: false },
];

export const PAY_IN_VA_STATUS_OPTIONS: CheckboxOption[] = [
  { id: "active", label: "Active", checked: false },
  { id: "inactive", label: "Inactive", checked: false },
  { id: "expired", label: "Expired", checked: false },
  { id: "deleted", label: "Deleted", checked: false },
];

export const PAY_IN_VA_BANKS_OPTIONS: CheckboxOption[] = [
  { id: "bri-va", label: "BRI VA", checked: false },
  { id: "mandiri-va", label: "Mandiri VA", checked: false },
  { id: "bca-va", label: "BCA VA", checked: false },
];

// QRIS specific filter options
export const PAY_IN_QRIS_ACQUIRER_OPTIONS: CheckboxOption[] = [
  { id: "piye", label: "PIYE", checked: false },
  { id: "nobu", label: "Nobu", checked: false },
];

export const PAY_IN_PAYMENT_METHOD_OPTIONS: CheckboxOption[] = [
  {
    id: "debit-credit-card",
    label: "DEBIT/CREDIT CARD",
    checked: false,
    children: [
      {
        id: "payment-channel",
        label: "Payment Channel",
        checked: false,
        children: [
          { id: "cimbpg", label: "CIMBPG", checked: false },
          { id: "bricc", label: "BRICC", checked: false },
          { id: "permatacc", label: "PermataCC", checked: false },
        ],
      },
      {
        id: "payment-mode",
        label: "Payment Mode",
        checked: false,
        children: [
          { id: "close", label: "Close", checked: false },
          { id: "jumpapp", label: "Jumpapp", checked: false },
          { id: "recurring", label: "Recurring", checked: false },
        ],
      },
      {
        id: "channel-type",
        label: "Channel Type",
        checked: false,
        children: [
          { id: "not-aggregator", label: "Not Aggregator", checked: false },
          { id: "aggregator", label: "Aggregator", checked: false },
        ],
      },
      {
        id: "type-of-payment",
        label: "Type of Payment",
        checked: false,
        children: [
          { id: "on-us", label: "ON US", checked: false },
          { id: "off-us", label: "OFF US", checked: false },
        ],
      },
    ],
  },
  {
    id: "e-wallet",
    label: "E-WALLET",
    checked: false,
    children: [
      {
        id: "e-wallet-payment-channel",
        label: "Payment Channel",
        checked: false,
        children: [
          { id: "dana", label: "DANA", checked: false },
          { id: "shopeepay", label: "ShopeePay", checked: false },
          { id: "ovo", label: "OVO", checked: false },
          { id: "gopay", label: "GoPay", checked: false },
          { id: "linkaja", label: "LinkAja", checked: false },
        ],
      },
    ],
  },
  {
    id: "virtual-account",
    label: "VIRTUAL ACCOUNT",
    checked: false,
    children: [
      {
        id: "va-payment-channel",
        label: "Payment Channel",
        checked: false,
        children: [
          { id: "va-bca", label: "BCA VA", checked: false },
          { id: "va-mandiri", label: "Mandiri VA", checked: false },
          { id: "va-bni", label: "BNI VA", checked: false },
        ],
      },
    ],
  },
  {
    id: "qr-code",
    label: "QR CODE",
    checked: false,
    children: [
      {
        id: "qr-payment-channel",
        label: "Payment Channel",
        checked: false,
        children: [{ id: "qris", label: "QRIS", checked: false }],
      },
    ],
  },
];

export const INITIAL_IS_MODAL_PAY_IN = {
  filter: false,
  export: false,
  resendCallback: false,
  forceUpdateStatus: false,
  refundRequest: false,
  chargebackRequest: false,
  voidTransaction: false,
  cancelTransaction: false,
};

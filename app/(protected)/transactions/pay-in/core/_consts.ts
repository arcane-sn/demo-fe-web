import { PayInTransaction, CheckboxOption } from "./_models";

export type PayInStatItem = {
  number: string;
  label: string;
};

export const PAY_IN_STATS: PayInStatItem[] = [
  {
    number: "624.000",
    label: "Total Trans. Volume",
  },
  {
    number: "IDR 369.000.000",
    label: "Total Trans. Amount",
  },
  {
    number: "IDR 60.700.000",
    label: "Total MDR",
  },
  {
    number: "IDR 60.700.000",
    label: "Total Merch. Ref Fee",
  },
  {
    number: "IDR 60.700.000",
    label: "Total Sales Ref Fee",
  },
];

export const PAYMENT_METHODS = [
  { label: "All Payment Methods", value: "all" },
  { label: "Debit/Credit Card", value: "debit_credit_card" },
  { label: "VA", value: "va" },
  { label: "e-Wallet", value: "e_wallet" },
  { label: "QR Code", value: "qr_code" },
];

export const TRANSACTION_ACTIONS = [
  { label: "Resend Callback", value: "resend_callback" },
  { label: "Force Update Status", value: "force_update_status" },
  // { label: "Refund", value: "refund" },
  // { label: "Chargeback", value: "chargeback" },
  // { label: "Void", value: "void" },
  // { label: "Cancel", value: "cancel" },
];

// Mock data for pay-in transactions
export const MOCK_PAY_IN_TRANSACTIONS: PayInTransaction[] = [
  {
    id: "1",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    transactionId: "TRX123123123123-1222",
    paymentStatus: "Success",
    activity: "Payment Gateway",
    activityId: "PG-123123123123-1222",
    paymentMethod: "e-Wallet",
    paymentChannel: "DANA",
    amount: 2500000,
    customerEmail: "wakwaw@gmail.com",
    customerPhone: "081234567890",
  },
  {
    id: "2",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    transactionId: "TRX123123123123-1223",
    paymentStatus: "Request",
    activity: "Payment Gateway",
    activityId: "PG-123123123123-1223",
    paymentMethod: "e-Wallet",
    paymentChannel: "DANA",
    amount: 2500000,
    customerEmail: "wakwaw@gmail.com",
    customerPhone: "081234567890",
  },
  {
    id: "3",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    transactionId: "TRX123123123123-1224",
    paymentStatus: "Success",
    activity: "Payment Gateway",
    activityId: "PG-123123123123-1224",
    paymentMethod: "e-Wallet",
    paymentChannel: "DANA",
    amount: 2500000,
    customerEmail: "wakwaw@gmail.com",
    customerPhone: "081234567890",
  },
  {
    id: "4",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    transactionId: "TRX123123123123-1225",
    paymentStatus: "Success",
    activity: "Payment Gateway",
    activityId: "PG-123123123123-1225",
    paymentMethod: "e-Wallet",
    paymentChannel: "DANA",
    amount: 2500000,
    customerEmail: "wakwaw@gmail.com",
    customerPhone: "081234567890",
  },
  {
    id: "5",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    transactionId: "TRX123123123123-1226",
    paymentStatus: "Success",
    activity: "Payment Gateway",
    activityId: "PG-123123123123-1226",
    paymentMethod: "e-Wallet",
    paymentChannel: "DANA",
    amount: 2500000,
    customerEmail: "wakwaw@gmail.com",
    customerPhone: "081234567890",
  },
  {
    id: "6",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    transactionId: "TRX123123123123-1227",
    paymentStatus: "Success",
    activity: "Payment Gateway",
    activityId: "PG-123123123123-1227",
    paymentMethod: "e-Wallet",
    paymentChannel: "DANA",
    amount: 2500000,
    customerEmail: "wakwaw@gmail.com",
    customerPhone: "081234567890",
  },
  {
    id: "7",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    transactionId: "TRX123123123123-1228",
    paymentStatus: "Success",
    activity: "Payment Gateway",
    activityId: "PG-123123123123-1228",
    paymentMethod: "e-Wallet",
    paymentChannel: "DANA",
    amount: 2500000,
    customerEmail: "wakwaw@gmail.com",
    customerPhone: "081234567890",
  },
  {
    id: "8",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    transactionId: "TRX123123123123-1229",
    paymentStatus: "Success",
    activity: "Payment Gateway",
    activityId: "PG-123123123123-1229",
    paymentMethod: "e-Wallet",
    paymentChannel: "DANA",
    amount: 2500000,
    customerEmail: "wakwaw@gmail.com",
    customerPhone: "081234567890",
  },
  {
    id: "9",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    transactionId: "TRX123123123123-1230",
    paymentStatus: "Success",
    activity: "Payment Gateway",
    activityId: "PG-123123123123-1230",
    paymentMethod: "e-Wallet",
    paymentChannel: "DANA",
    amount: 2500000,
    customerEmail: "wakwaw@gmail.com",
    customerPhone: "081234567890",
  },
];

// Filter options for pay-in transactions
export const PAY_IN_FILTER_OPTIONS = [
  {
    id: "paymentStatus",
    label: "Payment Status",
    type: "multiselect" as const,
    options: [
      { label: "Success", value: "Success", count: 8 },
      { label: "Request", value: "Request", count: 1 },
      { label: "Failed", value: "Failed", count: 0 },
      { label: "Pending", value: "Pending", count: 0 },
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
  "transactionId",
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
  { id: "request", label: "Request", checked: false },
  { id: "unpaid", label: "Unpaid", checked: false },
  { id: "paid", label: "Paid", checked: false },
  { id: "failed", label: "Failed", checked: false },
  { id: "expired", label: "Expired", checked: false },
  { id: "canceled", label: "Canceled", checked: false },
  { id: "payment-error", label: "Payment Error", checked: false },
  { id: "processing", label: "Processing", checked: false },
];

export const PAY_IN_ACTIVITY_OPTIONS: CheckboxOption[] = [
  { id: "payment-gateway", label: "Payment Gateway", checked: false },
  { id: "sales-invoice", label: "Sales Invoice", checked: false },
];

export const PAY_IN_PAYMENT_METHOD_OPTIONS: CheckboxOption[] = [
  {
    id: "debit-credit-card",
    label: "DEBIT/CREDIT CARD",
    checked: true,
    children: [
      {
        id: "payment-channel",
        label: "Payment Channel",
        checked: true,
        children: [
          { id: "cimbpg", label: "CIMBPG", checked: true },
          { id: "bricc", label: "BRICC", checked: true },
          { id: "permatacc", label: "PermataCC", checked: true },
        ],
      },
      {
        id: "payment-mode",
        label: "Payment Mode",
        checked: true,
        children: [
          { id: "close", label: "Close", checked: true },
          { id: "jumpapp", label: "Jumpapp", checked: true },
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
    checked: true,
  },
  {
    id: "virtual-account",
    label: "VIRTUAL ACCOUNT",
    checked: false,
  },
  {
    id: "qr-code",
    label: "QR CODE",
    checked: false,
  },
];

export const INITIAL_IS_MODAL_PAY_IN = {
  filter: false,
  export: false,
  resendCallback: false,
  forceUpdateStatus: false,
};

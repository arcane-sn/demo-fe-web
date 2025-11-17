import { MessageSquareMore, Search } from "lucide-react";
import {
  PayOutStatItem,
  PayOutTransactionAction,
  PayOutTransaction,
  PayOutDetailTransaction,
  IsModalPayout,
} from "./_models";

export const PAY_OUT_STATS: PayOutStatItem[] = [
  {
    number: "624.000",
    label: "Total Trans. Amount",
  },
  {
    number: "IDR 369.000.000",
    label: "Total Trans. Volume",
  },
];

export const PAY_OUT_PAYMENT_METHODS = [
  { label: "All Payment Methods", value: "all" },
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "e-Wallet", value: "e_wallet" },
  { label: "Cash Pickup", value: "cash_pickup" },
];

export const PAY_OUT_TRANSACTION_ACTIONS: PayOutTransactionAction[] = [
  {
    label: "Action",
    value: "action",
  },
  {
    label: "Resend Callback",
    value: "resend_callback",
    icon: MessageSquareMore,
    color: "text-blue-500",
  },
  {
    label: "See Detail",
    value: "see_detail",
    icon: Search,
    color: "text-slate-800",
  },
];

// Mock data for pay-out transactions
export const MOCK_PAY_OUT_TRANSACTIONS: PayOutTransaction[] = [
  {
    id: "1",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    status: "Success",
    referenceNumber: "RN123123123123-1222",
    partnerReferenceNumber: "PRN99923232991111",
    transactionType: "Disbursement",
    transferAmount: 10000000,
    adminFee: 5000,
    totalTransferAmount: 10005000,
    beneficiaryAccountNumber: "1234 5678 9012 3456",
    bankName: "BANK ACB",
    remark: "Payroll",
    servedDate: "Thu, Dec 16, 2025",
    servedTime: "23:12:32 (GMT +7)",
  },
  {
    id: "2",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    status: "Init",
    referenceNumber: "RN123123123123-1223",
    partnerReferenceNumber: "PRN99923232991112",
    transactionType: "Disbursement",
    transferAmount: 10000000,
    adminFee: 5000,
    totalTransferAmount: 10005000,
    beneficiaryAccountNumber: "1234 5678 9012 3456",
    bankName: "BANK ACB",
    remark: "Payroll",
    servedDate: "Thu, Dec 16, 2025",
    servedTime: "23:12:32 (GMT +7)",
  },
  // Add more mock data...
  {
    id: "3",
    transactionDate: "Thu, Dec 16, 2025",
    transactionTime: "23:12:32 (GMT +7)",
    merchantName: "DigiStore",
    clientId: "UP2025091900001",
    status: "Success",
    referenceNumber: "RN123123123123-1224",
    partnerReferenceNumber: "PRN99923232991113",
    transactionType: "Disbursement",
    transferAmount: 10000000,
    adminFee: 5000,
    totalTransferAmount: 10005000,
    beneficiaryAccountNumber: "1234 5678 9012 3456",
    bankName: "BANK ACB",
    remark: "Payroll",
    servedDate: "Thu, Dec 16, 2025",
    servedTime: "23:12:32 (GMT +7)",
  },
];

// Filter options for pay-out transactions
export const PAY_OUT_STATUS_OPTIONS = [
  { id: "success", label: "Success", checked: false },
  { id: "init", label: "Init", checked: false },
  { id: "canceled", label: "Canceled", checked: false },
  { id: "scheduled", label: "Scheduled", checked: false },
];

export const PAY_OUT_TRANSACTION_TYPE_OPTIONS = [
  { id: "disbursement", label: "Disbursement", checked: false },
  { id: "account-inquiry", label: "Account Inquiry", checked: false },
];

export const PAY_OUT_DATE_FILTER_OPTIONS = [
  { label: "Transaction Date", value: "transaction" },
  { label: "Served Date", value: "served" },
];

export const PAY_OUT_FILTER_OPTIONS = [
  {
    id: "status",
    label: "Status",
    type: "multiselect" as const,
    options: [
      { label: "Success", value: "Success", count: 2 },
      { label: "Init", value: "Init", count: 1 },
      { label: "Canceled", value: "Canceled", count: 0 },
      { label: "Scheduled", value: "Scheduled", count: 0 },
    ],
  },
  {
    id: "transactionType",
    label: "Transaction Type",
    type: "multiselect" as const,
    options: [
      { label: "Disbursement", value: "Disbursement", count: 2 },
      { label: "Account Inquiry", value: "Account Inquiry", count: 1 },
    ],
  },
];

// Search fields for pay-out transactions
export const PAY_OUT_SEARCH_FIELDS: (keyof PayOutTransaction)[] = [
  "referenceNumber",
  "partnerReferenceNumber",
  "merchantName",
  "clientId",
  "beneficiaryAccountNumber",
  "bankName",
];

// Table configuration constants
export const PAY_OUT_TABLE_CONFIG = {
  pageSize: 10,
  searchPlaceholder: "Search pay-out transactions...",
  enableRowSelection: true,
  enableSorting: true,
  enablePagination: true,
  searchable: true,
} as const;

// Sample Response Vendor Data
export const SAMPLE_RESPONSE_VENDOR_DATA = {
  url: "Trx-1209123asdkj12038",
  status: "Success" as const,
  responseCode: "200",
  responseMessage: "Success Transfer",
  retryLimit: 5,
};

// Mock Pay-Out Detail Transaction Data
export const MOCK_PAY_OUT_DETAIL_TRANSACTION: PayOutDetailTransaction = {
  id: "1",
  referenceNumber: "Trx-1209123asdkj12038",
  partnerReferenceNumber: "PR-209123asdkj12038",
  status: "Paid",
  transactionType: "Disbursement",
  transactionSource: "Single Transfer",

  // Transfer Details
  transferAmount: 10000000,
  adminFee: 4000,
  totalTransferAmount: 10054000,

  // Beneficiary Information
  beneficiaryAccountStatus: "Active",
  beneficiaryBankName: "ACB",
  beneficiaryBankCode: "014",
  beneficiaryAccountNumber: "1234 5678 9012 3456",
  beneficiaryAccountName: "JOJON DOOHN",
  beneficiaryCountry: "Indonesia",
  beneficiaryCity: "Semarang",
  beneficiaryEmail: "jojon@mail.com",

  // Sender Information
  senderName: "John Doe",
  senderNickname: "John",
  senderPlaceOfBirth: "Semarang",
  senderDateOfBirth: "31 January 1990",
  senderGender: "Men",
  senderPhoneNumber: "081234567890",
  senderIdentityType: "ID Card",
  senderIdentityNumber: "3*****4",
  senderTaxPayerRegistration: "3*****4",
  senderCountry: "Indonesia",
  senderCity: "Semarang",
  senderAddress: "Address full address here",
  senderBankCode: "014",
  senderBankName: "BCA",

  // Status & Callback
  responseStatus: "Success",
  responseReason: "-",
  responseCode: "500",
  responseMessage: "Success Transfer to beneficiary account",

  // Transfer Info
  direction: "Domestic Transfer",
  currency: "IDR",
  originCountry: "ID",
  sourceOfFunds: "-",
  transactionPurpose: "Transfer Funds",

  // Merchant Info
  merchantName: "Domestic Transfer",
  clientId: "CL-1209123asdkj12038",

  // Timestamps
  transactionDate: "Thu, Dec 16, 2025",
  transactionTime: "23:12:32 (GMT +7)",
  updatedDate: "Thu, Dec 16, 2025",
  updatedTime: "23:12:32 (GMT +7)",
  servedDate: "Thu, Dec 16, 2026",
  servedTime: "23:12:32 (GMT +7)",

  // Status History
  statusHistory: [
    {
      id: "1",
      status: "Disbursed",
      timestamp: "10 Mar 2026, 12:49:28",
      description: "Sent to beneficiary account",
      details: "description",
      badge: {
        variant: "primary",
        label: "Disbursed",
      },
      hasDetail: true,
    },
    {
      id: "2",
      status: "Account Inquiry",
      timestamp: "8 Mar 2026, 12:49:28",
      description: "Account Name Verified",
      details: "description",
      badge: {
        variant: "success",
        label: "Success",
      },
      hasDetail: false,
    },
    {
      id: "3",
      status: "Disbursement Approved",
      timestamp: "8 Mar 2026, 12:49:28",
      description: "Approved Disbursement",
      details: "DS-oasodidjwqldke",
      badge: {
        variant: "info",
        label: "Approved",
      },
      hasDetail: true,
    },
    {
      id: "4",
      status: "Disbursement Created",
      timestamp: "8 Mar 2026, 12:49:28",
      description: "Created Disbursement",
      details: "description",
      badge: {
        variant: "warning",
        label: "Created",
      },
      hasDetail: false,
    },
  ],
};

export const INITIAL_IS_MODAL_PAYOUT: IsModalPayout = {
  filter: false,
  export: false,
  responseVendor: false,
  forceUpdateStatus: false,
};

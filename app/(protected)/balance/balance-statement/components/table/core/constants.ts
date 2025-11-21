import { BalanceStatementData } from "../../../core/_model";

// Search field options
export const BALANCE_STATEMENT_SEARCH_FIELDS = [
  { value: "merchantName", label: "Merchant Name" },
  { value: "clientId", label: "Client ID" },
  { value: "referenceNumber", label: "Reference Number" },
  { value: "partnerReferenceNumber", label: "Partner Reference" },
  { value: "transactionRemark", label: "Transaction Remark" },
];

// Filter keys
export const BALANCE_STATEMENT_FILTER_KEYS = {
  TRANSACTION_TYPE: "transactionType",
  STATUS: "status",
} as const;

// Filter labels
export const BALANCE_STATEMENT_FILTER_LABELS = {
  TRANSACTION_TYPE: "Transaction Type",
  STATUS: "Status",
} as const;

// Transaction Type options
export const BALANCE_STATEMENT_TRANSACTION_TYPE_OPTIONS = [
  { value: "transfer", label: "Transfer" },
  { value: "topup", label: "Top Up" },
  { value: "withdrawal", label: "Withdrawal" },
  { value: "adjustment", label: "Adjustment" },
];

// Status options
export const BALANCE_STATEMENT_STATUS_OPTIONS = [
  { value: "success", label: "Success" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "cancelled", label: "Cancelled" },
];

// Date filter options
export const BALANCE_STATEMENT_DATE_TYPE_OPTIONS = [
  { value: "transactionDate", label: "Transaction Date" },
];

// Default date type
export const BALANCE_STATEMENT_DEFAULT_DATE_TYPE = "transactionDate";

// Date format
export const BALANCE_STATEMENT_DATA_DATE_FORMAT = "yyyy-MM-dd";
export const BALANCE_STATEMENT_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";

// Search placeholder
export const BALANCE_STATEMENT_SEARCH_PLACEHOLDER =
  "Search transaction details...";

// Page size
export const BALANCE_STATEMENT_PAGE_SIZE = 10;

// Page size options
export const BALANCE_STATEMENT_PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

// Date filter placeholder
export const BALANCE_STATEMENT_DATE_FILTER_PLACEHOLDER = "Select date range";

// Empty state messages
export const BALANCE_STATEMENT_EMPTY_STATE = {
  defaultTitle: "No Balance Statement Data",
  defaultDescription:
    "Looks like you don't have any balance statement data yet. Transactions will appear here once merchants start transacting.",
  filteredTitle: "No balance statements match your filters",
  filteredDescription:
    "Try adjusting your search or filter criteria to see more results.",
};

// Toolbar actions
export const BALANCE_STATEMENT_TOOLBAR_ACTIONS = [
  {
    id: "filter",
    label: "Filter",
    variant: "outline" as const,
  },
  {
    id: "export",
    label: "Export",
    variant: "outline" as const,
  },
];

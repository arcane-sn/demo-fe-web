import { MerchantBalanceData } from "../../../core/_model";

// Search field options
export const MERCHANT_BALANCE_SEARCH_FIELDS = [
  { value: "merchantName", label: "Merchant Name" },
  { value: "clientId", label: "Client ID" },
  { value: "status", label: "Status" },
  { value: "merchantLevel", label: "Merchant Level" },
  { value: "lastActivity", label: "Last Activity" },
];

// Filter keys
export const MERCHANT_BALANCE_FILTER_KEYS = {
  MERCHANT_LEVEL: "merchantLevel",
  STATUS: "status",
} as const;

// Filter labels
export const MERCHANT_BALANCE_FILTER_LABELS = {
  MERCHANT_LEVEL: "Merchant Level",
  STATUS: "Status",
} as const;

// Merchant Level options
export const MERCHANT_BALANCE_MERCHANT_LEVEL_OPTIONS = [
  { value: "Level 0", label: "Level 0" },
  { value: "Level 1", label: "Level 1" },
  { value: "Level 2", label: "Level 2" },
];

// Status options
export const MERCHANT_BALANCE_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

// Date filter options
export const MERCHANT_BALANCE_DATE_TYPE_OPTIONS = [
  { value: "lastActivityDate", label: "Last Activity Date" },
];

// Default date type
export const MERCHANT_BALANCE_DEFAULT_DATE_TYPE = "lastActivityDate";

// Date format
export const MERCHANT_BALANCE_DATA_DATE_FORMAT = "yyyy-MM-dd";
export const MERCHANT_BALANCE_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";

// Search placeholder
export const MERCHANT_BALANCE_SEARCH_PLACEHOLDER = "Search merchant name...";

// Page size
export const MERCHANT_BALANCE_PAGE_SIZE = 10;

// Page size options
export const MERCHANT_BALANCE_PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

// Date filter placeholder
export const MERCHANT_BALANCE_DATE_FILTER_PLACEHOLDER = "Select date range";

// Empty state messages
export const MERCHANT_BALANCE_EMPTY_STATE = {
  defaultTitle: "No Merchant Balances Yet",
  defaultDescription:
    "Looks like you don't have any merchant balance data. Merchants will appear here once they start transacting.",
  filteredTitle: "No merchant balances match your filters",
  filteredDescription:
    "Try adjusting your search or filter criteria to see more results.",
};

// Toolbar actions
export const MERCHANT_BALANCE_TOOLBAR_ACTIONS = [
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

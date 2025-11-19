"use client";

export const ACCOUNT_INQUIRY_SEARCH_FIELDS = [
  { label: "Account Number", value: "accountNumber" },
  { label: "Bank Name / Code", value: "bankNameCode" },
  { label: "Account Name", value: "accountName" },
];

export const ACCOUNT_INQUIRY_STATUS_OPTIONS = [
  { label: "Valid", value: "valid" },
  { label: "Init", value: "init" },
  { label: "Invalid", value: "invalid" },
  { label: "Failed", value: "failed" },
];

export const ACCOUNT_INQUIRY_FILTER_KEYS = {
  STATUS: "status",
};

export const ACCOUNT_INQUIRY_FILTER_LABELS = {
  STATUS: "Status",
};

export const ACCOUNT_INQUIRY_SEARCH_PLACEHOLDER =
  "Search account number, bank, or name...";

export const ACCOUNT_INQUIRY_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy";
export const ACCOUNT_INQUIRY_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";
export const ACCOUNT_INQUIRY_DEFAULT_DATE_TYPE = "activityDate";
export const ACCOUNT_INQUIRY_PAGE_SIZE = 10;
export const ACCOUNT_INQUIRY_PAGE_SIZE_OPTIONS = [10, 20, 50];

export const ACCOUNT_INQUIRY_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const ACCOUNT_INQUIRY_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const ACCOUNT_INQUIRY_DATE_FILTER_PLACEHOLDER = "Activity Date";

export const ACCOUNT_INQUIRY_EMPTY_STATE = {
  defaultTitle: "No Account Inquiries",
  defaultDescription: "You don't have any account inquiry records yet.",
  filteredTitle: "No Results Found",
  filteredDescription: "No account inquiries match your filters. Try adjusting search or filters.",
} as const;


"use client";

export const MERCHANT_CALLBACK_LOG_SEARCH_FIELDS = [
  { label: "Merchant Name", value: "merchantName" },
  { label: "Client ID", value: "clientId" },
  { label: "Reference Number", value: "referenceNumber" },
  { label: "Partner Reference Number", value: "partnerReferenceNumber" },
  { label: "URL", value: "url" },
] as const;

export const MERCHANT_CALLBACK_LOG_STATUS_OPTIONS = [
  { label: "Success", value: "success" },
  { label: "Failed", value: "failed" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
] as const;

export const MERCHANT_CALLBACK_LOG_FILTER_KEYS = {
  STATUS: "status",
} as const;

export const MERCHANT_CALLBACK_LOG_FILTER_LABELS = {
  STATUS: "Status",
} as const;

export const MERCHANT_CALLBACK_LOG_SEARCH_PLACEHOLDER =
  "Search merchant name, client ID, reference number, partner reference number, or URL...";

export const MERCHANT_CALLBACK_LOG_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy";
export const MERCHANT_CALLBACK_LOG_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";
export const MERCHANT_CALLBACK_LOG_DEFAULT_DATE_TYPE = "createdDate";
export const MERCHANT_CALLBACK_LOG_DATE_TYPE_OPTIONS = [
  { label: "Created Date", value: "createdDate" },
  { label: "Updated Date", value: "updatedDate" },
] as const;

export const MERCHANT_CALLBACK_LOG_PAGE_SIZE = 10;
export const MERCHANT_CALLBACK_LOG_PAGE_SIZE_OPTIONS = [
  10, 20, 50, 100,
] as const;

export const MERCHANT_CALLBACK_LOG_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const MERCHANT_CALLBACK_LOG_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const MERCHANT_CALLBACK_LOG_DATE_FILTER_PLACEHOLDER = "Date Range";

export const MERCHANT_CALLBACK_LOG_EMPTY_STATE = {
  defaultTitle: "No Callback Logs Found",
  defaultDescription:
    "You don't have any callback logs yet. Callback logs will appear here as merchant callbacks occur.",
  filteredTitle: "No Results Found",
  filteredDescription:
    "No callback logs match your filters. Try adjusting search or filters.",
} as const;

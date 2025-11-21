import { BalanceRequestData } from "../../../core/_model";

// Search field options
export const BALANCE_REQUEST_SEARCH_FIELDS = [
  { value: "merchantName", label: "Merchant Name" },
  { value: "clientId", label: "Client ID" },
  { value: "notesReason", label: "Notes/Reason" },
  { value: "requestedBy", label: "Requested By" },
];

// Filter keys
export const BALANCE_REQUEST_FILTER_KEYS = {
  STATUS: "status",
  ACTIVITY_TYPE: "activityType",
} as const;

// Filter labels
export const BALANCE_REQUEST_FILTER_LABELS = {
  STATUS: "Status",
  ACTIVITY_TYPE: "Activity Type",
} as const;

// Status options
export const BALANCE_REQUEST_STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "processing", label: "Processing" },
];

// Activity Type options
export const BALANCE_REQUEST_ACTIVITY_TYPE_OPTIONS = [
  { value: "topup", label: "Top Up" },
  { value: "withdrawal", label: "Withdrawal" },
  { value: "adjustment", label: "Adjustment" },
  { value: "hold", label: "Hold" },
  { value: "release", label: "Release" },
];

// Date filter options
export const BALANCE_REQUEST_DATE_TYPE_OPTIONS = [
  { value: "lastActivityDate", label: "Last Activity Date" },
  { value: "createdDate", label: "Created Date" },
];

// Default date type
export const BALANCE_REQUEST_DEFAULT_DATE_TYPE = "lastActivityDate";

// Date format
export const BALANCE_REQUEST_DATA_DATE_FORMAT = "yyyy-MM-dd";
export const BALANCE_REQUEST_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";

// Search placeholder
export const BALANCE_REQUEST_SEARCH_PLACEHOLDER = "Search balance requests...";

// Page size
export const BALANCE_REQUEST_PAGE_SIZE = 10;

// Page size options
export const BALANCE_REQUEST_PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

// Date filter placeholder
export const BALANCE_REQUEST_DATE_FILTER_PLACEHOLDER = "Select date range";

// Empty state messages
export const BALANCE_REQUEST_EMPTY_STATE = {
  defaultTitle: "No balance requests found",
  defaultDescription:
    "There are no balance requests in the system yet. Requests will appear here once merchants submit them.",
  filteredTitle: "No balance requests match your filters",
  filteredDescription:
    "Try adjusting your search or filter criteria to see more results.",
};

// Toolbar actions
export const BALANCE_REQUEST_TOOLBAR_ACTIONS = [
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

// Data grid options
export const BALANCE_REQUEST_DATA_GRID_OPTIONS = {
  enableColumnResizing: false,
  enableColumnReordering: true,
};

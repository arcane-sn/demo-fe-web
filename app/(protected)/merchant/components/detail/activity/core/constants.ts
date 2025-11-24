"use client";

export const ACTIVITY_SEARCH_FIELDS = [
  { label: "Action", value: "action" },
  { label: "Description", value: "description" },
  { label: "User", value: "user" },
  { label: "IP Address", value: "ipAddress" },
];

export const ACTIVITY_STATUS_OPTIONS = [
  { label: "Success", value: "success" },
  { label: "Failed", value: "failed" },
  { label: "Pending", value: "pending" },
] as const;

export const ACTIVITY_ACTION_OPTIONS = [
  { label: "Login", value: "Login" },
  { label: "Logout", value: "Logout" },
  { label: "Update Profile", value: "Update Profile" },
  { label: "API Call", value: "API Call" },
  { label: "Transaction", value: "Transaction" },
  { label: "Password Change", value: "Password Change" },
  { label: "Settings Update", value: "Settings Update" },
  { label: "Data Export", value: "Data Export" },
  { label: "System Check", value: "System Check" },
] as const;

export const ACTIVITY_FILTER_KEYS = {
  STATUS: "status",
  ACTION: "action",
} as const;

export const ACTIVITY_FILTER_LABELS = {
  STATUS: "Status",
  ACTION: "Action",
} as const;

export const ACTIVITY_SEARCH_PLACEHOLDER =
  "Search action, description, user, or IP address...";

export const ACTIVITY_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy";
export const ACTIVITY_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";
export const ACTIVITY_DEFAULT_DATE_TYPE = "timestamp";
export const ACTIVITY_DATE_TYPE_OPTIONS = [
  { label: "Timestamp", value: "timestamp" },
] as const;

export const ACTIVITY_PAGE_SIZE = 10;
export const ACTIVITY_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const ACTIVITY_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const ACTIVITY_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const ACTIVITY_DATE_FILTER_PLACEHOLDER = "Timestamp";

export const ACTIVITY_EMPTY_STATE = {
  defaultTitle: "No Activity Logs Found",
  defaultDescription:
    "You don't have any activity logs yet. Activities will appear here as they occur.",
  filteredTitle: "No Results Found",
  filteredDescription:
    "No activity logs match your filters. Try adjusting search or filters.",
} as const;


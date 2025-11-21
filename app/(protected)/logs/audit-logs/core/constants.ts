"use client";

export const AUDIT_LOG_SEARCH_FIELDS = [
  { label: "User ID", value: "userId" },
  { label: "User", value: "user" },
  { label: "Section Type", value: "sectionType" },
  { label: "Section ID", value: "sectionId" },
  { label: "IP Address", value: "ipAddress" },
] as const;

export const AUDIT_LOG_ACTION_OPTIONS = [
  { label: "Login", value: "LOGIN" },
  { label: "Create", value: "CREATE" },
  { label: "Update", value: "UPDATE" },
  { label: "Delete", value: "DELETE" },
  { label: "Review", value: "REVIEW" },
] as const;

export const AUDIT_LOG_SECTION_TYPE_OPTIONS = [
  { label: "User Management", value: "User Management" },
  { label: "Account Settings", value: "Account Settings" },
  { label: "Merchant Data", value: "Merchant Data" },
  { label: "System Config", value: "System Config" },
  { label: "Payment Gateway", value: "Payment Gateway" },
  { label: "Merchant Profile", value: "Merchant Profile" },
  { label: "Business Profile", value: "Business Profile" },
  { label: "Product Catalog", value: "Product Catalog" },
  { label: "Payment Settings", value: "Payment Settings" },
  { label: "User Access", value: "User Access" },
  { label: "Support Ticket", value: "Support Ticket" },
] as const;

export const AUDIT_LOG_FILTER_KEYS = {
  ACTION: "action",
  SECTION_TYPE: "sectionType",
} as const;

export const AUDIT_LOG_FILTER_LABELS = {
  ACTION: "Action Type",
  SECTION_TYPE: "Section Type",
} as const;

export const AUDIT_LOG_SEARCH_PLACEHOLDER =
  "Search user ID, user, section type, section ID, or IP address...";

export const AUDIT_LOG_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy";
export const AUDIT_LOG_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";
export const AUDIT_LOG_DEFAULT_DATE_TYPE = "activityDate";
export const AUDIT_LOG_DATE_TYPE_OPTIONS = [
  { label: "Activity Date", value: "activityDate" },
] as const;

export const AUDIT_LOG_PAGE_SIZE = 10;
export const AUDIT_LOG_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const AUDIT_LOG_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const AUDIT_LOG_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const AUDIT_LOG_DATE_FILTER_PLACEHOLDER = "Activity Date";

export const AUDIT_LOG_EMPTY_STATE = {
  defaultTitle: "No Audit Logs Found",
  defaultDescription:
    "You don't have any audit logs yet. Audit logs will appear here as system activities occur.",
  filteredTitle: "No Results Found",
  filteredDescription:
    "No audit logs match your filters. Try adjusting search or filters.",
} as const;


import { AccountData } from "./types";

// Search field options
export const ACCOUNT_LIST_SEARCH_FIELDS = [
  { value: "userID", label: "User ID" },
  { value: "userName", label: "Username" },
  { value: "name", label: "Full Name" },
  { value: "email", label: "Email" },
  { value: "phoneNumber", label: "Phone Number" },
  { value: "clientID", label: "Client ID" },
];

// Filter keys
export const ACCOUNT_LIST_FILTER_KEYS = {
  ACCESS_LEVEL: "accessLevel",
  ROLE: "role",
  ACCOUNT_STATUS: "accountStatus",
  ADDITIONAL_STATUS: "additionalStatus",
} as const;

// Filter labels
export const ACCOUNT_LIST_FILTER_LABELS = {
  ACCESS_LEVEL: "Access Level",
  ROLE: "Role",
  ACCOUNT_STATUS: "Account Status",
  ADDITIONAL_STATUS: "Additional Status",
} as const;

// Access Level options
export const ACCOUNT_LIST_ACCESS_LEVEL_OPTIONS = [
  { value: "internal", label: "Internal" },
  { value: "parent", label: "Parent & Sub-Merchant" },
  { value: "merchant", label: "Own Merchant Only" },
];

// Role options
export const ACCOUNT_LIST_ROLE_OPTIONS = [
  { value: "super_admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "maker", label: "Maker" },
  { value: "approver", label: "Approver" },
];

// Account Status options
export const ACCOUNT_LIST_ACCOUNT_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

// Additional Status options
export const ACCOUNT_LIST_ADDITIONAL_STATUS_OPTIONS = [
  { value: "need_confirmation", label: "Need Confirmation" },
  { value: "deleted", label: "Deleted" },
  { value: "updated", label: "Updated" },
];

// Date filter options
export const ACCOUNT_LIST_DATE_TYPE_OPTIONS = [
  { value: "created_date", label: "Created Date" },
  { value: "updated_date", label: "Updated Date" },
  { value: "last_login", label: "Last Login Date" },
];

// Default date type
export const ACCOUNT_LIST_DEFAULT_DATE_TYPE = "created_date";

// Date format - Account dates are in UTC ISO format, we'll parse them differently
export const ACCOUNT_LIST_DATE_FORMAT = "EEE, MMM dd, yyyy"; // Format for display
export const ACCOUNT_LIST_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy"; // Format in data (UTC ISO strings)

// Search placeholder
export const ACCOUNT_LIST_SEARCH_PLACEHOLDER = "Search accounts...";

// Page size
export const ACCOUNT_LIST_PAGE_SIZE = 10;

// Page size options
export const ACCOUNT_LIST_PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

// Date filter placeholder
export const ACCOUNT_LIST_DATE_FILTER_PLACEHOLDER = "Select date range";

// Empty state messages
export const ACCOUNT_LIST_EMPTY_STATE = {
  defaultTitle: "No accounts found",
  defaultDescription: "There are no accounts in the system yet.",
  filteredTitle: "No accounts match your filters",
  filteredDescription:
    "Try adjusting your search or filter criteria to see more results.",
};

// Toolbar actions
export const ACCOUNT_LIST_TOOLBAR_ACTIONS = [
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

export const ACCOUNT_LIST_DISPLAY_DATE_FORMAT = "EEE, MMM dd, yyyy";

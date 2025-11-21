"use client";

export const USER_MANAGEMENT_SEARCH_FIELDS = [
  { label: "User ID", value: "userID" },
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "User Name", value: "userName" },
  { label: "Phone Number", value: "phoneNumber" },
  { label: "Client ID", value: "clientID" },
] as const;

export const USER_MANAGEMENT_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
] as const;

export const USER_MANAGEMENT_ROLE_OPTIONS = [
  { label: "Super Admin", value: "Super Admin" },
  { label: "Admin", value: "Admin" },
  { label: "Maker", value: "Maker" },
  { label: "Approver", value: "Approver" },
] as const;

export const USER_MANAGEMENT_FILTER_KEYS = {
  STATUS: "accountStatus",
  ROLE: "role",
} as const;

export const USER_MANAGEMENT_FILTER_LABELS = {
  STATUS: "Account Status",
  ROLE: "Role",
} as const;

export const USER_MANAGEMENT_SEARCH_PLACEHOLDER =
  "Search user ID, name, email, user name, phone number, or client ID...";

export const USER_MANAGEMENT_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy";
export const USER_MANAGEMENT_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";
export const USER_MANAGEMENT_DEFAULT_DATE_TYPE = "createdDate";
export const USER_MANAGEMENT_DATE_TYPE_OPTIONS = [
  { label: "Created Date", value: "createdDate" },
  { label: "Updated Date", value: "updateDate" },
  { label: "Last Login Date", value: "loginDate" },
] as const;

export const USER_MANAGEMENT_PAGE_SIZE = 10;
export const USER_MANAGEMENT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const USER_MANAGEMENT_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const USER_MANAGEMENT_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const USER_MANAGEMENT_DATE_FILTER_PLACEHOLDER = "Created Date";

export const USER_MANAGEMENT_EMPTY_STATE = {
  defaultTitle: "No Accounts Found",
  defaultDescription:
    "You don't have any accounts yet. Invite your first user to get started.",
  filteredTitle: "No Results Found",
  filteredDescription:
    "No accounts match your filters. Try adjusting search or filters.",
} as const;


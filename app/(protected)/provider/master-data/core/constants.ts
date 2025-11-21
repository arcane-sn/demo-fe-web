"use client";

export const PROVIDER_MASTER_DATA_SEARCH_FIELDS = [
  { label: "Provider ID", value: "providerId" },
  { label: "Provider Name", value: "providerName" },
  { label: "Provider Type", value: "providerType" },
];

export const PROVIDER_MASTER_DATA_STATUS_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

export const PROVIDER_MASTER_DATA_PROVIDER_TYPE_OPTIONS = [
  { label: "QR", value: "QR" },
  { label: "VA", value: "VA" },
  { label: "e-Wallet", value: "e-Wallet" },
  { label: "Card", value: "Card" },
  { label: "Disbursement", value: "Disbursement" },
] as const;

export const PROVIDER_MASTER_DATA_FILTER_KEYS = {
  STATUS: "status",
  PROVIDER_TYPE: "providerType",
};

export const PROVIDER_MASTER_DATA_FILTER_LABELS = {
  STATUS: "Provider Status",
  PROVIDER_TYPE: "Provider Type",
};

export const PROVIDER_MASTER_DATA_SEARCH_PLACEHOLDER =
  "Search provider ID, name, or type...";

export const PROVIDER_MASTER_DATA_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy";
export const PROVIDER_MASTER_DATA_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";
export const PROVIDER_MASTER_DATA_DEFAULT_DATE_TYPE = "registeredDate";
export const PROVIDER_MASTER_DATA_DATE_TYPE_OPTIONS = [
  { label: "Registered Date", value: "registeredDate" },
  { label: "Updated Date", value: "updatedDate" },
] as const;
export const PROVIDER_MASTER_DATA_PAGE_SIZE = 10;
export const PROVIDER_MASTER_DATA_PAGE_SIZE_OPTIONS = [10, 20, 50];

export const PROVIDER_MASTER_DATA_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const PROVIDER_MASTER_DATA_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const PROVIDER_MASTER_DATA_DATE_FILTER_PLACEHOLDER = "Registered Date";

export const PROVIDER_MASTER_DATA_EMPTY_STATE = {
  defaultTitle: "No Providers Found",
  defaultDescription:
    "You don't have any providers yet. Create your first provider to get started.",
  filteredTitle: "No Results Found",
  filteredDescription:
    "No providers match your filters. Try adjusting search or filters.",
} as const;


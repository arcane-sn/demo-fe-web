"use client";

export const DISBURSEMENT_SEARCH_FIELDS = [
  { label: "Bank Code", value: "bankCode" },
  { label: "Bank Name", value: "bankName" },
];

export const DISBURSEMENT_STATUS_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

export const DISBURSEMENT_FILTER_KEYS = {
  STATUS: "status",
};

export const DISBURSEMENT_FILTER_LABELS = {
  STATUS: "Status",
};

export const DISBURSEMENT_SEARCH_PLACEHOLDER =
  "Search bank code or bank name...";

export const DISBURSEMENT_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy 'GMT +7'";
export const DISBURSEMENT_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";
export const DISBURSEMENT_DEFAULT_DATE_TYPE = "createdDate";
export const DISBURSEMENT_DATE_TYPE_OPTIONS = [
  { label: "Created Date", value: "createdDate" },
  { label: "Updated Date", value: "updatedDate" },
] as const;
export const DISBURSEMENT_PAGE_SIZE = 10;
export const DISBURSEMENT_PAGE_SIZE_OPTIONS = [10, 25, 50];

export const DISBURSEMENT_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const DISBURSEMENT_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const DISBURSEMENT_DATE_FILTER_PLACEHOLDER = "Created Date";

export const DISBURSEMENT_EMPTY_STATE = {
  defaultTitle: "No Banks Found",
  defaultDescription:
    "You don't have any banks configured yet. Add your first bank to get started.",
  filteredTitle: "No Results Found",
  filteredDescription:
    "No banks match your filters. Try adjusting search or filters.",
} as const;


"use client";

export const MERCHANT_REVIEW_SEARCH_FIELDS = [
  { label: "Company Name", value: "companyName" },
  { label: "Brand Name", value: "brandName" },
  { label: "Client ID", value: "clientId" },
] as const;

export const MERCHANT_REVIEW_SEARCH_PLACEHOLDER =
  "Search company name, brand name, or client ID...";

export const MERCHANT_REVIEW_FILTER_KEYS = {
  REVIEW_STATUS: "reviewStatus",
  MERCHANT_LEVEL: "merchantLevel",
} as const;

export const MERCHANT_REVIEW_FILTER_LABELS = {
  REVIEW_STATUS: "Review Status",
  MERCHANT_LEVEL: "Merchant Level",
} as const;

export const MERCHANT_REVIEW_STATUS_OPTIONS = [
  { label: "Draft", value: "draft" },
  { label: "Pending Review", value: "pending-review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
] as const;

export const MERCHANT_REVIEW_LEVEL_OPTIONS = [
  { label: "Level 0", value: "Level 0" },
  { label: "Level 1", value: "Level 1" },
  { label: "Level 2", value: "Level 2" },
] as const;

export const MERCHANT_REVIEW_DATE_DISPLAY_FORMAT = "MMM dd, yyyy";
export const MERCHANT_REVIEW_DATA_DATE_FORMAT = "yyyy-MM-dd";
export const MERCHANT_REVIEW_DEFAULT_DATE_TYPE = "createdDate";

export const MERCHANT_REVIEW_DATE_TYPE_OPTIONS = [
  { label: "Created Date", value: "createdDate" },
  { label: "Submitted Date", value: "submittedAt" },
] as const;

export const MERCHANT_REVIEW_DATE_FILTER_PLACEHOLDER = "Created Date";

export const MERCHANT_REVIEW_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const MERCHANT_REVIEW_PAGE_SIZE = 10;
export const MERCHANT_REVIEW_PAGE_SIZE_OPTIONS = [10, 20, 50];

export const MERCHANT_REVIEW_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const MERCHANT_REVIEW_EMPTY_STATE = {
  defaultTitle: "No Merchants Found",
  defaultDescription:
    "You don't have any merchants pending review. Try refreshing or updating filters.",
  filteredTitle: "No Results Found",
  filteredDescription:
    "No merchants match your filters. Try adjusting search or filters.",
} as const;


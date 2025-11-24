// Search fields configuration
export const DISBURSEMENT_PRICING_SEARCH_FIELDS = [
  { label: "Bank Code", value: "bankCode" },
  { label: "Bank Name", value: "bankName" },
  { label: "Sales Referral ID", value: "salesReferralId" },
  { label: "Merchant Referral ID", value: "merchantReferralId" },
] as const;

// Status options for filtering
export const DISBURSEMENT_PRICING_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
] as const;

// Filter keys
export const DISBURSEMENT_PRICING_FILTER_KEYS = {
  STATUS: "status",
} as const;

// Filter labels
export const DISBURSEMENT_PRICING_FILTER_LABELS = {
  STATUS: "Status",
} as const;

// Search placeholder
export const DISBURSEMENT_PRICING_SEARCH_PLACEHOLDER =
  "Search bank code, bank name, or referral ID...";

// Page size configuration
export const DISBURSEMENT_PRICING_PAGE_SIZE = 10;
export const DISBURSEMENT_PRICING_PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

// Toolbar actions
export const DISBURSEMENT_PRICING_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

// Data grid options
export const DISBURSEMENT_PRICING_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
  columnsPinnable: true,
  columnsMovable: true,
  columnsVisibility: true,
  cellBorder: true,
  },
} as const;

// Empty state messages
export const DISBURSEMENT_PRICING_EMPTY_STATE = {
  defaultTitle: "No Banks Found",
  defaultDescription:
    "You don't have any banks configured yet. Add your first bank to get started.",
  filteredTitle: "No Results Found",
  filteredDescription:
    "No banks match your filters. Try adjusting search or filters.",
} as const;


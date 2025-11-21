export const MERCHANT_LIST_SEARCH_FIELDS = [
  { label: "Company Name", value: "companyName" },
  { label: "Brand Name", value: "brandName" },
  { label: "Client ID", value: "clientId" },
] as const;

export const MERCHANT_LIST_SEARCH_PLACEHOLDER =
  "Search company name, brand name, or client ID...";

export const MERCHANT_LIST_FILTER_KEYS = {
  MERCHANT_LEVEL: "merchantLevel",
  PRODUCTION_STATUS: "productionStatus",
  SANDBOX_STATUS: "sandboxStatus",
} as const;

export const MERCHANT_LIST_FILTER_LABELS = {
  MERCHANT_LEVEL: "Merchant Level",
  PRODUCTION_STATUS: "Production Status",
  SANDBOX_STATUS: "Sandbox Status",
} as const;

export const MERCHANT_LIST_LEVEL_OPTIONS = [
  { label: "Level 0", value: "Level 0" },
  { label: "Level 1", value: "Level 1" },
  { label: "Level 2", value: "Level 2" },
  { label: "Level 3", value: "Level 3" },
] as const;

export const MERCHANT_LIST_PRODUCTION_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
] as const;

export const MERCHANT_LIST_SANDBOX_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
] as const;

export const MERCHANT_LIST_DATE_DISPLAY_FORMAT = "MMM dd, yyyy";
export const MERCHANT_LIST_DATA_DATE_FORMAT = "yyyy-MM-dd";
export const MERCHANT_LIST_DEFAULT_DATE_TYPE = "registeredDate";

export const MERCHANT_LIST_DATE_TYPE_OPTIONS = [
  { label: "Registered Date", value: "registeredDate" },
  { label: "Updated Date", value: "updatedDate" },
] as const;

export const MERCHANT_LIST_DATE_FILTER_PLACEHOLDER = "01/01/2025 - 31/12/2025";

export const MERCHANT_LIST_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const MERCHANT_LIST_PAGE_SIZE = 10;
export const MERCHANT_LIST_PAGE_SIZE_OPTIONS = [10, 20, 50];

export const MERCHANT_LIST_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const MERCHANT_LIST_EMPTY_STATE = {
  defaultTitle: "No Merchants Found",
  defaultDescription:
    "You don't have any merchants yet. Add a merchant to get started.",
  filteredTitle: "No Results Found",
  filteredDescription:
    "No merchants match your filters. Try adjusting search or filters.",
} as const;

export type MerchantListRowActionKey =
  | "view"
  | "edit"
  | "deactivateProduction"
  | "deactivateSandbox"
  | "delete";

export type MerchantListRowActionSection = 'primary' | 'deactivate' | 'danger';

export type MerchantListRowActionConfig = {
  id: string;
  label: string;
  icon: { name: string; className?: string };
  colorClass: string;
  actionKey: MerchantListRowActionKey;
  section: MerchantListRowActionSection;
};

export const MERCHANT_LIST_ROW_ACTIONS: ReadonlyArray<MerchantListRowActionConfig> = [
  {
    id: "view",
    label: "See Detail",
    icon: { name: "magnifier", className: "text-gray-500" },
    colorClass: "text-gray-700",
    actionKey: "view",
    section: "primary",
  },
  {
    id: "edit",
    label: "Edit Merchant",
    icon: { name: "notepad-edit", className: "text-blue-600" },
    colorClass: "text-blue-600",
    actionKey: "edit",
    section: "primary",
  },
  {
    id: "deactivate-prod",
    label: "Deactivated Production",
    icon: { name: "technology-4", className: "text-rose-500" },
    colorClass: "text-rose-500",
    actionKey: "deactivateProduction",
    section: "deactivate",
  },
  {
    id: "deactivate-sandbox",
    label: "Deactivated Sandbox",
    icon: { name: "technology-2", className: "text-rose-500" },
    colorClass: "text-rose-500",
    actionKey: "deactivateSandbox",
    section: "deactivate",
  },
  {
    id: "delete",
    label: "Delete Merchant",
    icon: { name: "trash", className: "text-rose-600" },
    colorClass: "text-rose-600",
    actionKey: "delete",
    section: "danger",
  },
] as const;


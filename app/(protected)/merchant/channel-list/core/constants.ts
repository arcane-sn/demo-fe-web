 "use client";

import type { CheckboxOption } from "@/components/reusable/CheckboxList";

export const CHANNEL_LIST_SEARCH_FIELDS = [
  { label: "Merchant Name", value: "merchantName" },
  { label: "Client ID", value: "clientId" },
  { label: "Provider", value: "provider" },
] as const;

export const CHANNEL_LIST_SEARCH_PLACEHOLDER =
  "Search merchant name, client ID, or provider...";

export const CHANNEL_LIST_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const CHANNEL_LIST_FILTER_KEYS = {
  STATUS: "status",
  PAYMENT_METHOD: "paymentMethod",
  PROVIDER: "provider",
  MDR_PRICE_TYPE: "mdrPriceType",
  SALES_PRICE_TYPE: "salesRefPriceType",
  MERCHANT_PRICE_TYPE: "merchantRefPriceType",
} as const;

export const CHANNEL_LIST_FILTER_LABELS = {
  STATUS: "Status",
  PAYMENT_METHOD: "Payment Method",
  PROVIDER: "Provider",
  MDR_PRICE_TYPE: "MDR Price Type",
  SALES_PRICE_TYPE: "Sales Ref Price Type",
  MERCHANT_PRICE_TYPE: "Merchant Ref Price Type",
} as const;

export const CHANNEL_LIST_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },

] as const;

export const CHANNEL_LIST_PAYMENT_METHOD_OPTIONS: CheckboxOption[] = [
  {
    id: "payment:qr-code",
    label: "QR CODE",
    children: [{ id: "payment:qr-code:qris", label: "QRIS" }],
  },
  {
    id: "payment:virtual-account",
    label: "VIRTUAL ACCOUNT",
    children: [
      { id: "payment:virtual-account:bca", label: "BCA VA" },
      { id: "payment:virtual-account:mandiri", label: "MANDIRI VA" },
      { id: "payment:virtual-account:bni", label: "BNI VA" },
    ],
  },
  {
    id: "payment:e-wallet",
    label: "E-WALLET",
    children: [
      { id: "payment:e-wallet:dana", label: "DANA" },
      { id: "payment:e-wallet:ovo", label: "OVO" },
      { id: "payment:e-wallet:linkaja", label: "LinkAja" },
      { id: "payment:e-wallet:gopay", label: "GoPay" },
      { id: "payment:e-wallet:paypal", label: "PayPal" },
      { id: "payment:e-wallet:tcash", label: "Tcash" },
      { id: "payment:e-wallet:jenius", label: "Jenius" },
      { id: "payment:e-wallet:cash", label: "Cash" },
      { id: "payment:e-wallet:alipay", label: "Alipay" },
      { id: "payment:e-wallet:zelle", label: "Zelle" },
    ],
  },
  {
    id: "payment:debit-credit",
    label: "DEBIT/CREDIT CARD",
    children: [
      { id: "payment:debit-credit:debit", label: "Debit Card" },
      { id: "payment:debit-credit:credit", label: "Credit Card" },
    ],
  },
] as const;

type DescendantMap = Record<string, string[]>;

const buildDescendantMap = (
  options: readonly CheckboxOption[],
  map: DescendantMap = {},
): DescendantMap => {
  options.forEach((option) => {
    if (option.children?.length) {
      const descendants: string[] = [];
      option.children.forEach((child) => {
        descendants.push(child.id);
        const childDesc = buildDescendantMap([child], map)[child.id] ?? [];
        descendants.push(...childDesc);
      });
      map[option.id] = descendants;
    } else if (!map[option.id]) {
      map[option.id] = [];
    }
  });
  return map;
};

export const CHANNEL_LIST_PAYMENT_METHOD_DESCENDANTS = buildDescendantMap(
  CHANNEL_LIST_PAYMENT_METHOD_OPTIONS,
);

export const CHANNEL_LIST_PROVIDER_OPTIONS = [
  { label: "PIRO", value: "PIRO" },
  { label: "PIYE", value: "PIYE" },
] as const;

export const CHANNEL_LIST_PRICE_TYPE_OPTIONS = [
  { label: "Mixed Price", value: "mixed" },
  { label: "Fixed Price", value: "fixed" },
  { label: "Percentage Price", value: "percentage" },
] as const;

export const CHANNEL_LIST_DATE_DISPLAY_FORMAT = "EEE, MMM dd, yyyy";
export const CHANNEL_LIST_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy";
export const CHANNEL_LIST_DEFAULT_DATE_TYPE = "registeredDate";

export const CHANNEL_LIST_DATE_TYPE_OPTIONS = [
  { label: "Registered Date", value: "registeredDate" },
  { label: "Updated Date", value: "updatedAt" },
] as const;

export const CHANNEL_LIST_DATE_FILTER_PLACEHOLDER = "Registered Date";
export const CHANNEL_LIST_DATE_RANGE_PLACEHOLDER = "01/01/2020 - 31/01/2025";

export const CHANNEL_LIST_PAGE_SIZE = 10;
export const CHANNEL_LIST_PAGE_SIZE_OPTIONS = [10, 20, 50];

export const CHANNEL_LIST_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const CHANNEL_LIST_EMPTY_STATE = {
  defaultTitle: "No Channels Found",
  defaultDescription:
    "You don't have any channels yet. Create your first channel to get started.",
  filteredTitle: "No Results Found",
  filteredDescription:
    "No channels match your filters. Try adjusting search or filters.",
} as const;


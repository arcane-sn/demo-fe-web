import { PaymentChannel, QuickAccessItem } from "./models";

// Quick Access
export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    id: "merchant-list",
    title: "Merchant List",
    description: "View and manage merchants",
    icon: "shop",
    href: "/merchant/list",
  },
  {
    id: "settlement-request",
    title: "Settlement Request List",
    description: "Approve or reject settlement requests",
    icon: "document",
    href: "/settlement/history",
  },
  {
    id: "create-disbursement",
    title: "Create Disbursement",
    description: "Create single or batch disbursement",
    icon: "rocket",
    href: "/send-funds/disbursement",
  },
];

// Chart
export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const CHART_COLORS = {
  PAID: "#10B981",
  SETTLED: "#3B82F6",
} as const;

export const CHART_CONFIG = {
  HEIGHT: 350,
  Y_AXIS_MIN: 0,
  Y_AXIS_MAX: 40,
  GRADIENT_OPACITY_FROM: 0.6,
  GRADIENT_OPACITY_TO: 0.1,
} as const;

// Payment Channel
export const PAYMENT_CHANNEL_COLORS = {
  QRIS: "#3B82F6",
  VA_BCA: "#10B981",
  DANA: "#F59E0B",
  SHOPEEPAY: "#EF4444",
  VA_PERMATA: "#8B5CF6",
} as const;

export const DEFAULT_PAYMENT_CHANNELS: PaymentChannel[] = [
  { label: "QRIS", value: 35, color: PAYMENT_CHANNEL_COLORS.QRIS },
  { label: "VA BCA", value: 25, color: PAYMENT_CHANNEL_COLORS.VA_BCA },
  { label: "DANA", value: 20, color: PAYMENT_CHANNEL_COLORS.DANA },
  { label: "ShopeePay", value: 12, color: PAYMENT_CHANNEL_COLORS.SHOPEEPAY },
  { label: "VA Permata", value: 8, color: PAYMENT_CHANNEL_COLORS.VA_PERMATA },
];

// Merchant
export const MERCHANT_SORT_OPTIONS = {
  BY_AMOUNT: "byAmount",
  BY_VOLUME: "byVolume",
} as const;


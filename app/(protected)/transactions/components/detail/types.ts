export interface PayInInfoCardItem {
  label: string;
  value: string;
  copyable?: boolean;
  info?: boolean;
  isHighlighted?: boolean;
  showDivider?: boolean;
}

export interface PayOutInfoCardItem {
  label: string;
  value: string;
  copyable?: boolean;
  badge?: {
    variant: "primary" | "success" | "warning" | "info" | "destructive";
    label: string;
  };
}

export type InfoCardItem = PayInInfoCardItem | PayOutInfoCardItem;

export interface PayInStatusHistoryItem {
  status: string;
  date: string;
  badge: string;
  badgeType: "primary" | "success" | "warning" | "info" | "secondary" | "destructive";
  description: string;
  note: string;
  hasDetail?: boolean;
  detailText?: string;
}

export interface PayOutStatusHistoryItem {
  id: string;
  status: string;
  timestamp: string;
  description: string;
  details?: string;
  badge: {
    variant: "primary" | "success" | "warning" | "info" | "destructive";
    label: string;
  };
  hasDetail?: boolean;
}

export type StatusHistoryItem = PayInStatusHistoryItem | PayOutStatusHistoryItem;


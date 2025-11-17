import { BaseTableData } from "@/components/table";

// Pay-in transaction data interface
export interface PayInTransaction extends BaseTableData {
  transactionDate: string;
  transactionTime: string;
  merchantName: string;
  clientId: string;
  transactionId: string;
  paymentStatus: "Success" | "Request" | "Failed" | "Pending";
  activity: string;
  activityId: string;
  paymentMethod: string;
  paymentChannel: string;
  amount: number;
  customerEmail: string;
  customerPhone: string;
}

// Payment status type
export type PaymentStatus = PayInTransaction["paymentStatus"];

// Payment method type
export type PaymentMethod =
  | "e-Wallet"
  | "Credit Card"
  | "Bank Transfer"
  | "QR Code"
  | "Debit Card";

// Payment channel type
export type PaymentChannel =
  | "DANA"
  | "OVO"
  | "GoPay"
  | "ShopeePay"
  | "LinkAja"
  | "BRICC";

// Filter options for the table
export interface PayInFilterOptions {
  paymentStatus: PaymentStatus[];
  paymentMethod: PaymentMethod[];
  paymentChannel: PaymentChannel[];
  dateRange?: {
    from: Date;
    to: Date;
  };
  amountRange?: {
    min: number;
    max: number;
  };
}

// Table action types
export type PayInTableAction =
  | "view"
  | "export"
  | "refund"
  | "void"
  | "resend_callback";

// Export format types
export type ExportFormat = "csv" | "xlsx" | "pdf";

// Modal Refund Request Props
export interface ModalRefundRequestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface ModalSubmittedProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string;
  description?: string;
}

// Modal Void Transaction Props
export interface ModalVoidTransactionProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  onVoid?: (notes: string) => void;
}

export interface ModalCancelTransactionProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  onCancel?: (notes: string) => void;
}

// Checkbox option interface
export interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
  children?: CheckboxOption[];
}

// Modal state interface for pay-in
export interface IsModalPayIn {
  filter: boolean;
  export: boolean;
  resendCallback: boolean;
  forceUpdateStatus: boolean;
}

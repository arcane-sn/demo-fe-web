import { BaseTableData } from "@/components/table";

export type PaymentStatus = "Pending" | "Success" | "Failed" | "Expired" | "Request";

export interface AmountDetail {
  value: number | null;
  breakdown?: string | null;
}

// Pay-in transaction data interface
export interface PayInTransaction extends BaseTableData {
  transactionDate: string;
  transactionTime: string;
  merchantName: string;
  clientId: string;
  referenceNumber: string;
  partnerReferenceNumber: string;
  providerRefNumber: string;
  paymentStatus: PaymentStatus;
  activity: string;
  activityId: string;
  paymentMethod: string;
  paymentChannel: string;
  providerName: string;
  amount: number;
  mdr: AmountDetail;
  providerRate: AmountDetail;
  merchantRate: AmountDetail;
  flypayRate: AmountDetail;
  resellerRate: AmountDetail;
  merchantReferralFee: AmountDetail;
  salesReferralFee: AmountDetail;
  customerEmail: string;
  customerPhone: string;
  // VA specific fields
  vaNumber?: string;
  vaId?: string;
  vaType?: string;
  vaStatus?: string;
  bankName?: string;
  // QRIS specific fields
  channel?: string;
  issuingBank?: string;
  acquirerBank?: string;
  acquirerRefNumber?: string;
  // Common date fields
  createdDate?: string;
  expiryDate?: string;
  lastUpdatedDate?: string;
}

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
  onSubmit?: () => void;
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

// Modal state interface for pay-in
export interface IsModalPayIn {
  filter: boolean;
  export: boolean;
  resendCallback: boolean;
  forceUpdateStatus: boolean;
  refundRequest: boolean;
  chargebackRequest: boolean;
  voidTransaction: boolean;
  cancelTransaction: boolean;
}

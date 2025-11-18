import { LucideIcon } from "lucide-react";

export type PayOutStatItem = {
  number: string;
  label: string;
};

export type PayOutTransactionAction = {
  label: string;
  value: string;
  icon?: LucideIcon;
  color?: string;
};

export interface AmountDetail {
  value: number | null;
  breakdown?: string | null;
}

export type PayOutTransaction = {
  id: string;
  transactionDate: string;
  transactionTime: string;
  merchantName: string;
  clientId: string;
  status:
    | "Success"
    | "Init"
    | "Canceled"
    | "Scheduled"
    | "Request"
    | "Failed"
    | "Pending";
  referenceNumber: string;
  partnerReferenceNumber: string;
  transactionType: "Disbursement" | "Account Inquiry";
  transferAmount: number;
  adminFee: number;
  totalTransferAmount: number;
  beneficiaryAccountNumber: string;
  bankName: string;
  beneficiaryAccountName?: string;
  virtualAccount?: boolean;
  providerRefNumber?: string;
  providerName?: string;
  providerRate?: AmountDetail;
  merchantReferralRate?: AmountDetail;
  flypayRate?: AmountDetail;
  merchantReferralFee?: AmountDetail;
  salesReferralFee?: AmountDetail;
  remark: string;
  servedDate: string;
  servedTime: string;
};

export interface FilterOption {
  id: string;
  label: string;
  type: "multiselect" | "select";
  options: Array<{
    label: string;
    value: string;
    count?: number;
  }>;
}

export interface DateFilterState {
  dateType: "transaction" | "served";
  startDate: string;
  endDate: string;
}

export interface PayOutFilterState {
  dateFilter: DateFilterState;
  status: string[];
  transactionType: string[];
}

// Pay-Out Detail Models
export interface PayOutDetailTransaction {
  id: string;
  referenceNumber: string;
  partnerReferenceNumber: string;
  status: "Paid" | "Success" | "Failed" | "Pending" | "Canceled";
  transactionType: "Disbursement" | "Account Inquiry";
  transactionSource: "Single Transfer" | "Bulk Transfer";

  // Transfer Details
  transferAmount: number;
  adminFee: number;
  totalTransferAmount: number;

  // Beneficiary Information
  beneficiaryAccountStatus: "Active" | "Inactive";
  beneficiaryBankName: string;
  beneficiaryBankCode: string;
  beneficiaryAccountNumber: string;
  beneficiaryAccountName: string;
  beneficiaryCountry: string;
  beneficiaryCity: string;
  beneficiaryEmail: string;

  // Sender Information
  senderName: string;
  senderNickname: string;
  senderPlaceOfBirth: string;
  senderDateOfBirth: string;
  senderGender: "Men" | "Women";
  senderPhoneNumber: string;
  senderIdentityType: "ID Card" | "Passport" | "Driver License";
  senderIdentityNumber: string;
  senderTaxPayerRegistration: string;
  senderCountry: string;
  senderCity: string;
  senderAddress: string;
  senderBankCode: string;
  senderBankName: string;

  // Status & Callback
  responseStatus: "Success" | "Failed" | "Pending";
  responseReason: string;
  responseCode: string;
  responseMessage: string;

  // Transfer Info
  direction: "Domestic Transfer" | "International Transfer";
  currency: "IDR" | "USD" | "EUR";
  originCountry: string;
  sourceOfFunds: string;
  transactionPurpose: string;

  // Merchant Info
  merchantName: string;
  clientId: string;

  // Timestamps
  transactionDate: string;
  transactionTime: string;
  updatedDate: string;
  updatedTime: string;
  servedDate: string;
  servedTime: string;

  // Status History
  statusHistory: PayOutStatusHistoryItem[];
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

export interface PayOutDetailInfoItem {
  label: string;
  value: string;
  copyable?: boolean;
  badge?: {
    variant: "primary" | "success" | "warning" | "info" | "destructive";
    label: string;
  };
}

export interface IsModalPayout {
  filter: boolean;
  export: boolean;
  responseVendor: boolean;
  forceUpdateStatus: boolean;
}

export interface QueryRequestContextType {
  isModal: IsModalPayout;
  setIsModal: (value: IsModalPayout) => void;
}

export interface IsModalPayIn {
  filter: boolean;
  export: boolean;
  resendCallback: boolean;
  forceUpdateStatus: boolean;
}

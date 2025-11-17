import { BaseTableData } from "@/components/table/types";

// Balance Statement Data interface
export interface BalanceStatementData extends BaseTableData {
  // Transaction Information
  transactionDate: {
    date: string;
    time: string;
    timezone: string;
  };

  // Merchant Information
  merchantName: string;
  clientId: string;

  // Reference Numbers
  referenceNumber: string;
  partnerReferenceNumber: string;

  // Transaction Details
  transactionType: {
    type: string;
    label: string;
  };
  status: {
    status: "success" | "pending" | "failed" | "cancelled";
    label: string;
  };

  // Financial Information
  transferAmount: {
    amount: number;
    currency: string;
    formatted: string;
  };
  adminFee: {
    amount: number;
    currency: string;
    formatted: string;
  };
  tax: {
    amount: number;
    currency: string;
    formatted: string;
  };
  totalAmount: {
    amount: number;
    currency: string;
    formatted: string;
  };

  // Balance Information
  balanceBefore: {
    amount: number;
    currency: string;
    formatted: string;
  };
  balanceAfter: {
    amount: number;
    currency: string;
    formatted: string;
  };

  // Revenue Information
  vendorAdminFee: {
    amount: number;
    currency: string;
    formatted: string;
  };
  flypayRevenue: {
    amount: number;
    currency: string;
    formatted: string;
  };

  // Additional Information
  transactionRemark: string;
}

export interface BalanceStatementTableConfig {
  searchPlaceholder?: string;
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
}

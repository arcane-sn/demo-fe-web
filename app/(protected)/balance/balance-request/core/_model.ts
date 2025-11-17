import { BaseTableData } from "@/components/table/types";

// Balance Request Data interface
export interface BalanceRequestData extends BaseTableData {
  // Activity Information
  lastActivityDate: {
    date: string;
    time: string;
    timezone: string;
  };

  // Status Information
  status: {
    status: "pending" | "approved" | "rejected" | "processing";
    label: string;
  };

  // Merchant Information
  merchantName: string;
  clientId: string;

  // Activity Details
  activityType: {
    type: string;
    label: string;
  };
  activityAmount: {
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

  // Additional Information
  notesReason: string;

  // User Information
  requestedBy: {
    username: string;
    email: string;
    abbreviation: string;
  };
  reviewerUser: {
    username: string;
    email: string;
    abbreviation: string;
  } | null;
}

export interface BalanceRequestTableConfig {
  searchPlaceholder?: string;
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
}

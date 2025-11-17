import { BaseTableData } from "@/components/table/types";

// Merchant Balance Data interface
export interface MerchantBalanceData extends BaseTableData {
  // Basic Info
  merchantName: string;
  clientId: string;

  // Balance Information
  activeBalance: {
    amount: number;
    currency: string;
    formatted: string;
  };
  pendingBalance: {
    amount: number;
    currency: string;
    formatted: string;
  };
  holdBalance: {
    amount: number;
    currency: string;
    formatted: string;
  };
  totalBalance: {
    amount: number;
    currency: string;
    formatted: string;
  };

  // Activity Information
  lastActivityDate: {
    date: string;
    time: string;
    timezone: string;
  };

  // Additional merchant info for context
  merchantLevel: {
    level: number;
    label: string;
  };

  // Status information
  status: {
    status: "active" | "inactive" | "suspended";
    label: string;
  };
}

export interface MerchantBalanceTableConfig {
  searchPlaceholder?: string;
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
}

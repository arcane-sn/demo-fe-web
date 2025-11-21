import { BaseTableData } from "@/components/reusable/table";

// Merchant data interface based on the image
export interface MerchantData extends BaseTableData {
  id: string;
  merchantName: string;
  clientId: string;
  settlement: {
    status: 'active' | 'inactive';
    label: string;
  };
  transactionReport: {
    status: 'active' | 'inactive';
    label: string;
  };
  transactionSummary: {
    status: 'active' | 'inactive';
    label: string;
  };
  balanceStatement: {
    status: 'active' | 'inactive';
    label: string;
  };
  disbursement: {
    status: 'active' | 'inactive';
    label: string;
  };
  updatedDate: {
    date: string;
    time: string;
    timezone: string;
  };
  updatedBy: {
    name: string;
    email: string;
    avatar: string;
  };
}

// Status indicator component props
export interface StatusIndicatorProps {
  status: 'active' | 'inactive';
  label: string;
}

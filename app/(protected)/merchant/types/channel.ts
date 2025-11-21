import { BaseTableData } from "@/components/reusable/table";

// Channel data interface
export interface ChannelData extends BaseTableData {
  id: string;
  parentId: string;
  merchantName: string;
  clientId: string;
  paymentMethod: {
    type:
      | "e_wallet"
      | "bank_transfer"
      | "credit_card"
      | "debit_card"
      | "virtual_account"
      | "qr_code";
    label: string;
  };
  channel: {
    name: string;
    type: 'DANA' | 'OVO' | 'LinkAja' | 'GoPay' | 'PayPal' | 'Tcash' | 'Jenius' | 'Cash' | 'Alipay' | 'Zelle';
  };
  provider: string;
  nmid: string;
  mdr: string;
  providerRate: string;
  merchantRate: string;
  flypayRate: string;
  resellerRate: string;
  salesReferralId: string;
  salesReferralFee: string;
  merchantReferralId: string;
  merchantReferralFee: string;
  settlementDay: number;
  sameDaySettlement: boolean;
  status: {
    status: 'active' | 'inactive' | 'maintenance' | 'suspended';
    label: string;
  };
  registeredDate: {
    date: string;
    time: string;
    timezone: string;
  };
  registeredBy: {
    name: string;
    email: string;
    avatar: string;
  };
  updatedAt: {
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

// Channel form data interface
export interface ChannelFormData {
  channelName: string;
  channelType: string;
  merchantId: string;
  configuration: {
    apiEndpoint: string;
    timeout: number;
    retryAttempts: number;
    webhookUrl: string;
  };
  fees: {
    setupFee: number;
    transactionFee: number;
    monthlyFee: number;
  };
  limits: {
    dailyLimit: number;
    monthlyLimit: number;
    perTransactionLimit: number;
  };
  supportedCurrencies: string[];
  supportedCountries: string[];
}

// Channel filter interface
export interface ChannelFilter {
  search?: string;
  channelType?: string;
  status?: string;
  merchantId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Channel actions interface
export interface ChannelActions {
  onCreate: () => void;
  onView: (channelId: string) => void;
  onEdit: (channelId: string) => void;
  onDelete: (channelId: string) => void;
  onToggleStatus: (channelId: string) => void;
  onTestConnection: (channelId: string) => void;
}

// Channel table column interface
export interface ChannelTableColumn {
  key: keyof ChannelData;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

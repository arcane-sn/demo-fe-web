export interface SchedulerConfig {
  intervalOption: 'daily' | 'weekly' | 'monthly';
  intervalFrequency: number;
  scheduleTime: string;
}

export interface SchedulerState {
  settlement: {
    enabled: boolean;
    config: SchedulerConfig;
  };
  transactionReport: {
    enabled: boolean;
    config: SchedulerConfig;
  };
  transactionSummary: {
    enabled: boolean;
    config: SchedulerConfig;
  };
  balanceStatement: {
    enabled: boolean;
    config: SchedulerConfig;
  };
  disbursement: {
    enabled: boolean;
    config: SchedulerConfig;
  };
}

export interface MerchantInfo {
  clientId: string;
  companyName: string;
  merchantName: string;
}

export interface EditSchedulerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  merchantInfo: MerchantInfo;
  schedulerState: SchedulerState;
  onSave?: (schedulerState: SchedulerState) => void;
  onReset?: () => void;
}


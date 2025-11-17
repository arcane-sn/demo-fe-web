import { DateRange } from "react-day-picker";

export interface SchedulerFilterState {
  dateFilter: {
    type: string;
    dateRange?: DateRange;
  };
  activeScheduler: {
    settlement: boolean;
    transactionReport: boolean;
    transactionSummary: boolean;
    balanceStatement: boolean;
    disbursement: boolean;
  };
  inactiveScheduler: {
    settlement: boolean;
    transactionReport: boolean;
    transactionSummary: boolean;
    balanceStatement: boolean;
    disbursement: boolean;
  };
}

export interface SchedulerFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply?: (values: SchedulerFilterState) => void;
  onReset?: () => void;
}


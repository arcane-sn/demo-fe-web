import { SchedulerFilterState } from './types';

export const initialValues: SchedulerFilterState = {
  dateFilter: {
    type: 'updatedDate',
    dateRange: undefined,
  },
  activeScheduler: {
    settlement: false,
    transactionReport: false,
    transactionSummary: false,
    balanceStatement: false,
    disbursement: false,
  },
  inactiveScheduler: {
    settlement: false,
    transactionReport: false,
    transactionSummary: false,
    balanceStatement: false,
    disbursement: false,
  },
};


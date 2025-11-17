import { Dispatch, SetStateAction } from 'react';
import { SchedulerFilterState } from '../types';

export function useFilterActions(setValues: Dispatch<SetStateAction<SchedulerFilterState>>) {
  const handleSelectAllActiveScheduler = () => {
    setValues(prev => ({
      ...prev,
      activeScheduler: {
        settlement: true,
        transactionReport: true,
        transactionSummary: true,
        balanceStatement: true,
        disbursement: true,
      }
    }));
  };

  const handleClearActiveScheduler = () => {
    setValues(prev => ({
      ...prev,
      activeScheduler: {
        settlement: false,
        transactionReport: false,
        transactionSummary: false,
        balanceStatement: false,
        disbursement: false,
      }
    }));
  };

  const handleSelectAllInactiveScheduler = () => {
    setValues(prev => ({
      ...prev,
      inactiveScheduler: {
        settlement: true,
        transactionReport: true,
        transactionSummary: true,
        balanceStatement: true,
        disbursement: true,
      }
    }));
  };

  const handleClearInactiveScheduler = () => {
    setValues(prev => ({
      ...prev,
      inactiveScheduler: {
        settlement: false,
        transactionReport: false,
        transactionSummary: false,
        balanceStatement: false,
        disbursement: false,
      }
    }));
  };

  return {
    handleSelectAllActiveScheduler,
    handleClearActiveScheduler,
    handleSelectAllInactiveScheduler,
    handleClearInactiveScheduler,
  };
}


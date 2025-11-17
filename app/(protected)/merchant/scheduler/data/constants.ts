// Scheduler constants
export const DEFAULT_SCHEDULER_CONFIG = {
  intervalOption: 'daily' as const,
  intervalFrequency: 2,
  scheduleTime: '23:59',
};

export const SCHEDULER_FIELDS = [
  { key: 'settlement', label: 'Settlement' },
  { key: 'transactionReport', label: 'Transaction Report' },
  { key: 'transactionSummary', label: 'Transaction Summary' },
  { key: 'balanceStatement', label: 'Balance Statement' },
  { key: 'disbursement', label: 'Disbursement' },
] as const;

export const INTERVAL_OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
] as const;

import { BaseTableData } from '@/components/table/types';

// Scheduler task data interface
export interface SchedulerTaskData extends BaseTableData {
  id: string;
  taskName: string;
  taskType: {
    type: 'settlement' | 'report_generation' | 'data_sync' | 'backup' | 'notification' | 'cleanup';
    label: string;
  };
  description: string;
  status: {
    status: 'active' | 'inactive' | 'running' | 'paused' | 'failed';
    label: string;
  };
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
    cronExpression: string;
    timezone: string;
    nextRun: {
      date: string;
      time: string;
      timezone: string;
    };
    lastRun: {
      date: string;
      time: string;
      timezone: string;
    };
  };
  configuration: {
    merchantId?: string;
    channelId?: string;
    parameters: Record<string, any>;
    retryAttempts: number;
    timeout: number;
  };
  execution: {
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
    averageDuration: number;
    lastDuration: number;
  };
  createdAt: {
    date: string;
    time: string;
    timezone: string;
  };
  updatedAt: {
    date: string;
    time: string;
    timezone: string;
  };
  createdBy: string;
}

// Scheduler form data interface
export interface SchedulerFormData {
  taskName: string;
  taskType: string;
  description: string;
  schedule: {
    frequency: string;
    cronExpression: string;
    timezone: string;
  };
  configuration: {
    merchantId?: string;
    channelId?: string;
    parameters: Record<string, any>;
    retryAttempts: number;
    timeout: number;
  };
}

// Scheduler filter interface
export interface SchedulerFilter {
  search?: string;
  taskType?: string;
  status?: string;
  merchantId?: string;
  channelId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Scheduler actions interface
export interface SchedulerActions {
  onCreate: () => void;
  onView: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  onRunNow: (taskId: string) => void;
  onPause: (taskId: string) => void;
  onResume: (taskId: string) => void;
  onViewLogs: (taskId: string) => void;
}

// Scheduler execution log interface
export interface SchedulerExecutionLog {
  id: string;
  taskId: string;
  taskName: string;
  status: 'success' | 'failed' | 'running';
  startTime: {
    date: string;
    time: string;
    timezone: string;
  };
  endTime?: {
    date: string;
    time: string;
    timezone: string;
  };
  duration?: number;
  errorMessage?: string;
  output?: string;
  parameters: Record<string, any>;
}

// Scheduler table column interface
export interface SchedulerTableColumn {
  key: keyof SchedulerTaskData;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

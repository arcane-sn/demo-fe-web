export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  description: string;
  user: string;
  ipAddress: string;
  status: 'success' | 'failed' | 'pending';
  details?: string;
}

export interface ActivityData {
  logs: ActivityLog[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

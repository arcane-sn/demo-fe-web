export interface PendingApprovalData {
  id: string;
  creationId: string;
  type: 'single' | 'batch';
  totalTransferAmount: string;
  totalTransaction: number;
  totalAccount: number;
  createdBy: {
    name: string;
    email: string;
    avatar?: string;
  };
  lastActivityDate: string;
  lastActivityTime: string;
  scheduledDate?: string;
  beneficiaryDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  adminFee: string;
  description?: string;
  submittedDate: string;
  submittedTime: string;
}

export interface PendingApprovalTableConfig {
  pageSize: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}


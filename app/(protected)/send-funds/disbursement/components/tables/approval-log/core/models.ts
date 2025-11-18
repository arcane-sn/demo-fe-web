export type ApprovalLogStatus = 
  | 'approved'           // Transaction approved, ready to be processed
  | 'scheduled'          // Transaction scheduled, waiting to be processed on scheduled date
  | 'processing'         // Transaction in progress disbursement
  | 'partially-complete' // Transactions partially completed, one or more failed
  | 'completed'          // All transactions successfully disbursed
  | 'rejected';          // All transactions rejected

export type CreationMethod = 'single' | 'batch';

export interface ApprovalLogData {
  id: string;
  creationId: string;
  status: ApprovalLogStatus;
  statusDefinition: string;
  creationMethod: CreationMethod;
  creationType: 'single' | 'batch';
  canCreateBySingle: boolean;
  canCreateByBatch: boolean;
  totalTransferAmount: string;
  totalTransaction: number;
  totalAccount: number;
  createdBy: {
    name: string;
    email: string;
    avatar?: string;
  };
  processedBy: {
    name: string;
    email: string;
    avatar?: string;
  };
  reviewedBy: {
    name: string;
    email: string;
    avatar?: string;
  };
  lastActivityDate: string;
  lastActivityTime: string;
  approvedDate: string;
  approvedTime: string;
  processedDate?: string;
  processedTime?: string;
  completedDate?: string;
  completedTime?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  beneficiaryDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  adminFee: string;
  description?: string;
  rejectionReason?: string;
  reason?: string;
  failureDetails?: {
    failedCount: number;
    successCount: number;
    totalCount: number;
  };
}

export interface ApprovalLogTableConfig {
  pageSize: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}


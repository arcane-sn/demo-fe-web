export type DisbursementStatus = 
  | 'uploaded'        // Batch transfer: File uploaded, waiting for account inquiry
  | 'draft'           // Single transfer: Saved as draft, account inquiry not done
  | 'inquiry-process' // Batch transfer: Account inquiry in process, waiting for validation
  | 'valid'           // All beneficiary accounts validated, waiting to be submitted
  | 'issue';          // Invalid beneficiary account, user should retry inquiry

export type DisbursementType = 'single' | 'batch';

export interface DisbursementAction {
  delete: boolean;      // Can delete
  edit: boolean;        // Can edit
  submitForApproval: boolean; // Can submit for approval
}

export interface DisbursementDraft {
  id: string;
  creationId: string;
  type: DisbursementType;
  status: DisbursementStatus;
  statusDefinition: string;
  actions: DisbursementAction;
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
  createdDate: string;       // Added for date filtering
  createdTime: string;        // Added for date filtering
  scheduledDate?: string;
  beneficiaryDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  adminFee: string;
  description?: string;
}

export interface DisbursementTableConfig {
  pageSize: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}


export type BatchDetailStatus =
  | 'uploaded'
  | 'draft'
  | 'inquiry-process'
  | 'valid'
  | 'issue'
  | 'pending-approval'
  | 'approved'
  | 'scheduled'
  | 'processing'
  | 'partially-complete'
  | 'completed'
  | 'rejected';

export interface BatchDetail {
  id: string;
  creationId: string;
  status: BatchDetailStatus;
  totalTransferAmount: string;
  totalTransaction: number;
  validAmount?: string;
  validTransaction?: number;
  invalidAmount?: string;
  invalidTransaction?: number;
  scheduledDate?: string;
  scheduledTime?: string;
  createdBy: {
    name: string;
    email: string;
    avatar?: string;
  };
  createdDate: string;
  createdTime: string;
}

export type TransactionStatus = 'valid' | 'invalid' | undefined;

export interface TransactionItem {
  id: string;
  status?: TransactionStatus;
  transferAmount: string;
  partnerReferenceNumber: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
  accountName: string;
  remark?: string;
  sendToEmail?: string;
  sendToName?: string;
}


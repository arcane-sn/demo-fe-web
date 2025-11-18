export interface DisbursementDetail {
  id: string;
  referenceNumber: string;
  status: 'approved' | 'scheduled' | 'processing' | 'completed' | 'rejected';
  statusDefinition: string;
  transferAmount: string;
  adminFee: string;
  totalTransferAmount: string;
  beneficiaryDetails: {
    accountNumber: string;
    bankName: string;
    bankCode: string;
    accountName: string;
    accountStatus: 'valid' | 'invalid';
  };
  creationMethod: 'single' | 'batch';
  remark?: string;
  sendEmailTo?: string;
  callback: {
    status: string;
    response: string;
    message: string;
  };
  timestamps: {
    approvedBy?: {
      name: string;
      email: string;
    };
    approvedDate?: string;
    requestedBy: {
      name: string;
      email: string;
    };
    requestedDate: string;
    scheduledDate?: string;
    servedDate?: string;
    processedDate?: string;
    completedDate?: string;
    rejectedBy?: {
      name: string;
      email: string;
    };
    rejectedDate?: string;
  };
  rejectionReason?: string;
}

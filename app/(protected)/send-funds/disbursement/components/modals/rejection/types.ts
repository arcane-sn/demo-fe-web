// Shared types for rejection modals
export interface TransferDataItem {
  totalTransferAmount: string;
  creationId: string;
  transferType: 'single' | 'batch';
  totalTransaction?: number;
  totalBeneficiaryAccounts?: number;
  batchTransferAmount?: string;
  adminFee?: string;
  beneficiaryDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    scheduledTransfer: string;
  };
  requesterDetails: {
    email: string;
    requestedDate: string;
  };
}

export interface RejectReasonData {
  data: TransferDataItem;
  reason: string;
}


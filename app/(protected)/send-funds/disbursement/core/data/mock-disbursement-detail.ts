import { DisbursementDetail } from '../../types/disbursement-detail';

// Mock data for different statuses
export const mockDisbursementDetailData: DisbursementDetail = {
  id: 'DETAIL_001',
  referenceNumber: 'Trx-1209123asdkj12038',
  status: 'approved',
  statusDefinition: 'This transaction has been approved and waiting to be processed',
  transferAmount: 'IDR 100.000.000',
  adminFee: 'IDR 4.000',
  totalTransferAmount: 'IDR 100.004.000',
  beneficiaryDetails: {
    accountNumber: '1234 5678 9012 3456',
    bankName: 'ACB',
    bankCode: '014',
    accountName: 'JOJON DOOHN',
    accountStatus: 'valid',
  },
  creationMethod: 'single',
  remark: 'transfer for payroll to merchant PT JAYA DAHAGA',
  sendEmailTo: 'jojondohoe@mail.com',
  callback: {
    status: '-',
    response: '-',
    message: '-',
  },
  timestamps: {
    approvedBy: {
      name: 'Achan',
      email: 'achan@mail.com',
    },
    approvedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    requestedBy: {
      name: 'Bicak Tiguling',
      email: 'bicaktiguling@mail.com',
    },
    requestedDate: 'Thu, Dec 16, 2026 23:12:32 (GMT +7)',
  },
};

export const mockScheduledDisbursementData: DisbursementDetail = {
  id: 'DETAIL_002',
  referenceNumber: 'Trx-1209123asdkj12038',
  status: 'scheduled',
  statusDefinition: 'This transaction has been approved and is waiting for the scheduled date to be processed',
  transferAmount: 'IDR 100.000.000',
  adminFee: 'IDR 4.000',
  totalTransferAmount: 'IDR 100.004.000',
  beneficiaryDetails: {
    accountNumber: '1234 5678 9012 3456',
    bankName: 'ACB',
    bankCode: '014',
    accountName: 'JOJON DOOHN',
    accountStatus: 'valid',
  },
  creationMethod: 'single',
  remark: 'transfer for payroll to merchant PT JAYA DAHAGA',
  sendEmailTo: 'jojondohoe@mail.com',
  callback: {
    status: '-',
    response: '-',
    message: '-',
  },
  timestamps: {
    approvedBy: {
      name: 'Achan',
      email: 'achan@mail.com',
    },
    approvedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    scheduledDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    requestedBy: {
      name: 'Bicak Tiguling',
      email: 'bicaktiguling@mail.com',
    },
    requestedDate: 'Thu, Dec 16, 2026 23:12:32 (GMT +7)',
  },
};

export const mockProcessingDisbursementData: DisbursementDetail = {
  id: 'DETAIL_003',
  referenceNumber: 'Trx-1209123asdkj12038',
  status: 'processing',
  statusDefinition: 'This transaction is currently being processed for disbursement',
  transferAmount: 'IDR 100.000.000',
  adminFee: 'IDR 4.000',
  totalTransferAmount: 'IDR 100.004.000',
  beneficiaryDetails: {
    accountNumber: '1234 5678 9012 3456',
    bankName: 'ACB',
    bankCode: '014',
    accountName: 'JOJON DOOHN',
    accountStatus: 'valid',
  },
  creationMethod: 'single',
  remark: 'transfer for payroll to merchant PT JAYA DAHAGA',
  sendEmailTo: 'jojondohoe@mail.com',
  callback: {
    status: 'Init',
    response: '-',
    message: '-',
  },
  timestamps: {
    approvedBy: {
      name: 'Achan',
      email: 'achan@mail.com',
    },
    approvedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    processedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    requestedBy: {
      name: 'Bicak Tiguling',
      email: 'bicaktiguling@mail.com',
    },
    requestedDate: 'Thu, Dec 16, 2026 23:12:32 (GMT +7)',
  },
};

export const mockCompletedDisbursementData: DisbursementDetail = {
  id: 'DETAIL_004',
  referenceNumber: 'Trx-1209123asdkj12038',
  status: 'completed',
  statusDefinition: 'This transaction has been successfully completed',
  transferAmount: 'IDR 100.000.000',
  adminFee: 'IDR 4.000',
  totalTransferAmount: 'IDR 100.004.000',
  beneficiaryDetails: {
    accountNumber: '1234 5678 9012 3456',
    bankName: 'ACB',
    bankCode: '014',
    accountName: 'JOJON DOOHN',
    accountStatus: 'valid',
  },
  creationMethod: 'single',
  remark: 'transfer for payroll to merchant PT JAYA DAHAGA',
  sendEmailTo: 'jojondohoe@mail.com',
  callback: {
    status: 'Success',
    response: '100',
    message: 'Success Transfer to beneficiary account',
  },
  timestamps: {
    approvedBy: {
      name: 'Achan',
      email: 'achan@mail.com',
    },
    approvedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    servedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    completedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    requestedBy: {
      name: 'Bicak Tiguling',
      email: 'bicaktiguling@mail.com',
    },
    requestedDate: 'Thu, Dec 16, 2026 23:12:32 (GMT +7)',
  },
};

export const mockRejectedDisbursementData: DisbursementDetail = {
  id: 'DETAIL_005',
  referenceNumber: 'Trx-1209123asdkj12038',
  status: 'rejected',
  statusDefinition: 'This transaction has been rejected with a specified reason and will not be processed',
  transferAmount: 'IDR 100.000.000',
  adminFee: 'IDR 4.000',
  totalTransferAmount: 'IDR 100.004.000',
  beneficiaryDetails: {
    accountNumber: '1234 5678 9012 3456',
    bankName: 'ACB',
    bankCode: '014',
    accountName: 'JOJON DOOHN',
    accountStatus: 'valid',
  },
  creationMethod: 'single',
  remark: 'transfer for payroll to merchant PT JAYA DAHAGA',
  sendEmailTo: 'jojondohoe@mail.com',
  callback: {
    status: '-',
    response: '-',
    message: '-',
  },
  timestamps: {
    rejectedBy: {
      name: 'Achan',
      email: 'achan@mail.com',
    },
    rejectedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    requestedBy: {
      name: 'Bicak Tiguling',
      email: 'bicaktiguling@mail.com',
    },
    requestedDate: 'Thu, Dec 16, 2026 23:12:32 (GMT +7)',
  },
  rejectionReason: 'Wrong beneficiary account and transfer amount',
};

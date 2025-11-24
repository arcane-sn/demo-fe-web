export interface BankData {
  id: string;
  status: 'active' | 'inactive';
  bankCode: string;
  bankName: string;
  feeTransfer: string;
  feeTransferToVA: string;
  feeInquiry: string;
  feeInquiryToVA: string;
  feeRefund: string;
  minimumTransfer: string;
  maximumTransfer: string;
  createdDate: string;
}

export interface DisbursementConfigData {
  selectedBanks: BankData[];
  banks: BankData[];
}


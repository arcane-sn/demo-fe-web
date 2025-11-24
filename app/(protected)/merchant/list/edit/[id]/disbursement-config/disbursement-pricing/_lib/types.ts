import { BaseTableData } from '@/components/table';

// Fee structure for percentage and fixed amounts
export interface FeeStructure {
  percentage: string;
  fixed: string;
}

// Bank data type
export interface BankData extends BaseTableData {
  id: string;
  status: 'active' | 'inactive';
  bankCode: string;
  bankName: string;
  // Fee structures with separate percentage and fixed amounts
  feeTransfer: FeeStructure;
  feeTransferToVA: FeeStructure;
  feeInquiry: FeeStructure;
  feeInquiryToVA: FeeStructure;
  feeRefund: FeeStructure;
  minimumTransfer: string;
  maximumTransfer: string;
  // Rate structures with separate percentage and fixed amounts
  providerRate: FeeStructure;
  merchantRate: FeeStructure;
  flypayRate: FeeStructure;
  salesReferralId: string;
  salesReferralFee: FeeStructure;
  merchantReferralId: string;
  merchantReferralFee: FeeStructure;
}


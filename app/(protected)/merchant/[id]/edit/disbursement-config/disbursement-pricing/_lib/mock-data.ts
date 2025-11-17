import { BankData } from './types';

// Bank data templates for variety
const bankTemplates = [
  {
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: { percentage: '0', fixed: '5000' },
    feeTransferToVA: { percentage: '0', fixed: '0' },
    feeInquiry: { percentage: '0', fixed: '100' },
    feeInquiryToVA: { percentage: '0', fixed: '0' },
    feeRefund: { percentage: '0', fixed: '4500' },
    minimumTransfer: '10000',
    maximumTransfer: '100000000',
    providerRate: { percentage: '0.7', fixed: '0' },
    merchantRate: { percentage: '0.3', fixed: '0' },
    flypayRate: { percentage: '0.1', fixed: '0' },
    salesReferralId: 'SR110101029292',
    salesReferralFee: { percentage: '0', fixed: '500' },
    merchantReferralId: 'MR122221111132',
    merchantReferralFee: { percentage: '1.5', fixed: '0' },
  },
  {
    bankCode: '014',
    bankName: 'Bank BCA',
    feeTransfer: { percentage: '0', fixed: '6500' },
    feeTransferToVA: { percentage: '0', fixed: '0' },
    feeInquiry: { percentage: '0', fixed: '150' },
    feeInquiryToVA: { percentage: '0', fixed: '0' },
    feeRefund: { percentage: '0', fixed: '5000' },
    minimumTransfer: '25000',
    maximumTransfer: '500000000',
    providerRate: { percentage: '0.8', fixed: '0' },
    merchantRate: { percentage: '0.4', fixed: '0' },
    flypayRate: { percentage: '0.15', fixed: '0' },
    salesReferralId: 'SR110101029293',
    salesReferralFee: { percentage: '0', fixed: '750' },
    merchantReferralId: 'MR122221111133',
    merchantReferralFee: { percentage: '1.8', fixed: '0' },
  },
  {
    bankCode: '002',
    bankName: 'Bank BRI',
    feeTransfer: { percentage: '0', fixed: '4000' },
    feeTransferToVA: { percentage: '0', fixed: '0' },
    feeInquiry: { percentage: '0', fixed: '75' },
    feeInquiryToVA: { percentage: '0', fixed: '0' },
    feeRefund: { percentage: '0', fixed: '3500' },
    minimumTransfer: '5000',
    maximumTransfer: '50000000',
    providerRate: { percentage: '0.6', fixed: '0' },
    merchantRate: { percentage: '0.25', fixed: '0' },
    flypayRate: { percentage: '0.08', fixed: '0' },
    salesReferralId: 'SR110101029294',
    salesReferralFee: { percentage: '0', fixed: '300' },
    merchantReferralId: 'MR122221111134',
    merchantReferralFee: { percentage: '1.2', fixed: '0' },
  },
];

// Mock data for banks with variety (3 banks only)
export const mockBankData: BankData[] = bankTemplates.map((template, index) => ({
  id: `bank-${index + 1}`,
  status: 'active',
  ...template,
}));


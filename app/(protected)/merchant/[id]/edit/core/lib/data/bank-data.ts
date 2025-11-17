import { BankData } from '../../types/disbursement';

export const mockBankData: BankData[] = [
  {
    id: '1',
    status: 'active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: '2025-01-15'
  },
  {
    id: '2',
    status: 'active',
    bankCode: '014',
    bankName: 'Bank BCA',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: '2025-01-15'
  },
  {
    id: '3',
    status: 'active',
    bankCode: '009',
    bankName: 'Bank BNI',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: '2025-01-15'
  },
  {
    id: '4',
    status: 'active',
    bankCode: '002',
    bankName: 'Bank BRI',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: '2025-01-15'
  },
  {
    id: '5',
    status: 'active',
    bankCode: '011',
    bankName: 'Bank Danamon',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: '2025-01-15'
  },
  {
    id: '6',
    status: 'active',
    bankCode: '016',
    bankName: 'Bank BII',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: '2025-01-15'
  },
  {
    id: '7',
    status: 'active',
    bankCode: '019',
    bankName: 'Bank Panin',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: '2025-01-15'
  },
  {
    id: '8',
    status: 'active',
    bankCode: '022',
    bankName: 'Bank CIMB Niaga',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: '2025-01-15'
  },
  {
    id: '9',
    status: 'active',
    bankCode: '023',
    bankName: 'Bank UOB Indonesia',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: '2025-01-15'
  },
  {
    id: '10',
    status: 'active',
    bankCode: '028',
    bankName: 'Bank OCBC NISP',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: '2025-01-15'
  }
];

// Generate more data to reach 52 banks as shown in pagination
export const generateMoreBankData = (): BankData[] => {
  const additionalBanks: BankData[] = [];
  const bankNames = [
    'Bank Permata', 'Bank Maybank Indonesia', 'Bank BTPN', 'Bank Bukopin',
    'Bank Mega', 'Bank Sinarmas', 'Bank BCA Syariah', 'Bank Mandiri Syariah',
    'Bank BNI Syariah', 'Bank BRI Syariah', 'Bank Muamalat', 'Bank Syariah Indonesia',
    'Bank Jateng', 'Bank Jatim', 'Bank DKI', 'Bank Sumut', 'Bank Kaltim',
    'Bank Sulsel', 'Bank Papua', 'Bank NTB', 'Bank NTT', 'Bank Aceh',
    'Bank Sumsel', 'Bank Lampung', 'Bank Bengkulu', 'Bank Jambi',
    'Bank Riau', 'Bank Kepri', 'Bank Kalbar', 'Bank Kalteng', 'Bank Kalsel',
    'Bank Sulut', 'Bank Sulteng', 'Bank Sultra', 'Bank Gorontalo',
    'Bank Maluku', 'Bank Malut', 'Bank Papua Barat', 'Bank Kalimantan Utara',
    'Bank Sulawesi Barat', 'Bank Bali', 'Bank Banten', 'Bank Jawa Barat'
  ];

  bankNames.forEach((name, index) => {
    additionalBanks.push({
      id: `${11 + index}`,
      status: 'active',
      bankCode: `${100 + index}`.padStart(3, '0'),
      bankName: name,
      feeTransfer: 'IDR 5.000',
      feeTransferToVA: 'IDR 0',
      feeInquiry: 'IDR 100',
      feeInquiryToVA: 'IDR 0',
      feeRefund: 'IDR 4.500',
      minimumTransfer: 'IDR 10.000',
      maximumTransfer: 'IDR 100.000.000',
      createdDate: '2025-01-15'
    });
  });

  return additionalBanks;
};

export const allBankData = [...mockBankData, ...generateMoreBankData()];


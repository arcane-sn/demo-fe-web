export interface StatusHistoryItem {
  status: string;
  date: string;
  badge: string;
  badgeType: "primary" | "success" | "warning" | "info" | "secondary";
  description: string;
  note: string;
  hasDetail: boolean;
  detailText?: string;
}

export interface TransactionDetail {
  id: string;
  orderId: string;
  externalId: string;
  receiptNo: string;
  approvalCode: string;
  acquirerTransactionId: string;
  activitySource: string;
  billingAmount: number;
  billingName: string;
  paymentMethod: string;
  status: string;
  transactionDate: string;
  transactionTime: string;
  paidDate: string;
  paidTime: string;
  expirationDate: string;
  expirationTime: string;
  amount: number;
  serviceFee: number;
  mdr: number;
  totalAmount: number;
  channel: string;
  channelMid: string;
  paymentMode: string;
  tenorMonths: string;
  typeOfCard: string;
  clientId: string;
  merchantName: string;
  parentId: string;
  channelType: string;
  billName: string;
  email: string;
  phoneNumber: string;
  description: string;
  billingType: string;
  source: string;
  sourcePG: string;
  bankName: string;
  bankCountry: string;
  statusHistory: StatusHistoryItem[];
}

export interface InfoCardItem {
  label: string;
  value: string;
  copyable?: boolean;
  info?: boolean;
}

export interface StatsCardData {
  title: string;
  value: string;
}

// Modal Response Code interfaces
export interface ModalResponseCodeProps {
  isOpen: boolean;
  onClose: () => void;
  responseData?: Record<string, unknown>;
  title?: string;
}

export interface ApiResponseData {
  responseCode: number;
  responseMessage: string;
  data: unknown[];
  pagination?: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    nextPage?: number;
  };
}

export interface MerchantProfile {
  merchantId: string;
  parentMerchantId?: string;
  status: string;
  businessProfile: {
    companyName: string;
    brandName: string;
    merchantPhoneNumber: string;
    merchantEmail: string;
    merchantIndustry: string;
    merchantWebsite: string;
    merchantLogo: string;
    merchantAddress: string;
  };
  detailAddress: {
    country: string;
    province: string;
    city: string;
    district: string;
    village: string;
    postalCode: string;
  };
  merchantCharacteristics: {
    businessModel: string;
    corporateTaxType: string;
    currentMonthlySales: number;
    estimatedMonthlySales: number;
    averageEstimatedRevenue: number;
    transferService: boolean;
    transferUseCase: string;
    transferVolume: string;
  };
  bankInformation: {
    accountNumber: string;
    bankCode: string;
    accountName: string;
  };
  pic: Array<{
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
  }>;
  legalDocument: {
    sharedFolderLink: string;
    ktp: boolean;
    npwp: boolean;
    nib: boolean;
    aktaPendirian: boolean;
    aktaPerubahan: boolean;
    skMenkeh: boolean;
    siup: boolean;
  };
  products: {
    payIn: {
      paymentChannel: {
        ewallet: {
          dana: boolean;
          shopeepay: boolean;
        };
        qris: {
          inacash: boolean;
        };
      };
    };
    payOut: boolean;
  };
  hierarchy: {
    businessLevel: number;
    parentClientId: string;
    subClientId: string[];
  };
  additionalInfo: {
    notes: string;
  };
  credentials: {
    credentialId: string;
  };
  balance: {
    stage: string;
    production: string;
  };
  pricing: {
    pricingId: string;
  };
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

// Payment Receipt interfaces
export interface ModalPaymentReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData?: PaymentReceiptData;
  title?: string;
}

export interface PaymentReceiptData {
  successMessage: string;
  transactionDate: string;
  transactionDetails: PaymentReceiptTransactionDetail;
  merchantDetails: PaymentReceiptMerchantDetail;
}

export interface PaymentReceiptTransactionDetail {
  orderId: string;
  transactionId: string;
  transactionAmount: string;
  transactionDate: string;
  email: string;
  phoneNumber: string;
  approvalCode: string;
  bankName: string;
  bankCountry: string;
}

export interface PaymentReceiptMerchantDetail {
  merchantName: string;
  email: string;
  website: string;
  address: string;
}

export interface DetailRowData {
  label: string;
  value: string;
  showCopy: boolean;
  isWebsite?: boolean;
  isMultiline?: boolean;
}

import { BaseTableData } from '@/components/table/types';

// Review status type
export type ReviewStatus = 'draft' | 'pending-review' | 'approved' | 'rejected';

// Extended MerchantData interface with all form fields
export interface MerchantData extends BaseTableData {
  // Basic Info
  companyName: string;
  brandName: string;
  clientId: string;
  
  // Business Profile
  phoneNumber: string;
  email: string;
  businessType: string;
  businessIndustry: string;
  website: string;
  
  // Business Address
  address: string;
  country: string;
  province: string;
  city: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  legalAddressSame: boolean;
  
  // Business Characteristics
  businessModel: string;
  corporateTaxType: string;
  currentMonthlySales: number;
  estimatedMonthlySales: number;
  averageEstimatedRevenue: number;
  transferService: boolean;
  transferUseCase: string;
  transferVolume: string;
  
  // Bank Information
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  
  // PIC Information
  picOwner: {
    fullName: string;
    position: string;
    phoneNumber: string;
    email: string;
  };
  picBusiness: {
    fullName: string;
    position: string;
    phoneNumber: string;
    email: string;
  };
  picFinance: {
    fullName: string;
    position: string;
    phoneNumber: string;
    email: string;
  };
  picTechnical: {
    fullName: string;
    position: string;
    phoneNumber: string;
    email: string;
  };
  
  // Documents
  documents: {
    businessDocuments: Array<{
      id: string;
      name: string;
      type: string;
      url: string;
      uploadedAt: string;
    }>;
  };
  
  // Services & Payment Methods
  services: {
    serviceType: string;
    paymentGatewayIntegration: string;
    disbursementIntegration: string;
    paymentMethods: {
      eWallet: boolean;
      dana: boolean;
      shopeePlay: boolean;
      qrCode: boolean;
      qris: boolean;
      virtualAccount: boolean;
      vaPermataBank: boolean;
      vaCimbNiaga: boolean;
      directDebit: boolean;
      debitCreditCard: boolean;
    };
  };
  
  // Hierarchy
  merchantLevel: {
    level: number;
    label: string;
    hasParent: boolean;
    parentMerchantId?: string;
  };
  subMerchants: number;
  
  // Others/Branding
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  companyLogo?: string;
  referralCode?: string;
  additionalNotes?: string;
  
  // System Info
  activePaymentChannels: number;
  productionStatus: {
    status: 'active' | 'inactive';
    label: string;
  };
  sandboxStatus: {
    status: 'active' | 'inactive';
    label: string;
  };
  registeredDate: {
    date: string;
    time: string;
    timezone: string;
  };
  updatedDate: {
    date: string;
    time: string;
    timezone: string;
  };
  
  // Review Status - Key field for filtering between review and list
  reviewStatus: ReviewStatus;
}

export interface MerchantTableConfig {
  searchPlaceholder?: string;
  showFilters?: boolean;
  showColumnVisibility?: boolean;
  enableRowSelection?: boolean;
  pageSize?: number;
}


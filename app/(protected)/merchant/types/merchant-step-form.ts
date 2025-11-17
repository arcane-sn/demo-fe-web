import { LucideIcon } from 'lucide-react';

// Step form types
export interface MerchantStep {
  id: string;
  title: string;
  icon: LucideIcon;
  description?: string;
  isCompleted: boolean;
  isActive: boolean;
  isDisabled: boolean;
}

export interface MerchantStepFormData {
  // Business Info
  businessInfo: {
    companyName: string;
    brandName: string;
    businessPhoneNumber: {
      countryCode: string;
      number: string;
    };
    businessEmail: string;
    businessType: string;
    businessIndustry: string;
    businessWebsite: string;
  };
  
  // Business Address
  businessAddress: {
    address: string;
    country: string;
    province: string;
    city: string;
    district: string;
    subDistrict: string;
    postalCode: string;
    legalAddressSame: boolean;
  };
  
  // Business Characteristics
  businessCharacteristics: {
    businessModel: string;
    corporateTaxType: string;
    currentMonthlySales: number;
    estimatedMonthlySales: number;
    averageEstimatedRevenue: number;
    transferService: boolean;
    transferUseCase: string;
    transferVolume: string;
  };
  
  // Bank Info
  bankInfo: {
    bankName: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
  };
  
  // PIC Info
  picInfo: {
    fullName: string;
    position: string;
    email: string;
    phoneNumber: {
      countryCode: string;
      number: string;
    };
    idNumber: string;
    idType: string;
  };
  
  // Documents
  documents: {
    businessLicense: File | null;
    taxId: File | null;
    bankStatement: File | null;
    otherDocuments: File[];
  };
  
  // Services
  services: {
    paymentMethods: string[];
    integrationType: string;
    apiAccess: boolean;
    webhookUrl: string;
    callbackUrl: string;
  };
  
  // Hierarchy
  hierarchy: {
    parentMerchant: string;
    merchantLevel: number;
    subMerchants: number;
    reportingStructure: string;
  };
  
  // Others
  others: {
    notes: string;
    specialRequirements: string;
    complianceNotes: string;
    additionalInfo: string;
  };
}

// Step form validation
export interface StepValidation {
  [key: string]: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
  };
}

// Step form props
export interface MerchantStepFormProps {
  initialData?: Partial<MerchantStepFormData>;
  onStepChange: (stepId: string) => void;
  onDataChange: (stepId: string, data: any) => void;
  onSubmit: (data: MerchantStepFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  validation?: StepValidation;
}

// Step navigation props
export interface StepNavigationProps {
  steps: MerchantStep[];
  currentStep: string;
  onStepClick: (stepId: string) => void;
  onSectionClick: (sectionId: string) => void;
}

// Step content props
export interface StepContentProps {
  data: any;
  onChange: (data: any) => void;
  validation?: StepValidation;
  loading?: boolean;
}

// Form section props
export interface FormSectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
  isDisabled?: boolean;
}

// Step form state
export interface StepFormState {
  currentStep: string;
  completedSteps: string[];
  formData: Partial<MerchantStepFormData>;
  validation: StepValidation;
  errors: Record<string, string>;
  loading: boolean;
}

// Step form actions
export interface StepFormActions {
  setCurrentStep: (stepId: string) => void;
  setFormData: (stepId: string, data: any) => void;
  setValidation: (validation: StepValidation) => void;
  setErrors: (errors: Record<string, string>) => void;
  setLoading: (loading: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepId: string) => void;
  validateStep: (stepId: string) => boolean;
  submitForm: () => void;
  resetForm: () => void;
}


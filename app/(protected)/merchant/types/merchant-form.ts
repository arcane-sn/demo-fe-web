import { BaseTableData } from '@/components/table/types';

// Merchant form data interface
export interface MerchantFormData extends BaseTableData {
  companyName: string;
  brandName: string;
  clientId: string;
  merchantLevel: {
    level: number;
    label: string;
  };
  subMerchants: number;
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
}

// Form validation schema
export interface MerchantFormValidation {
  companyName: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
  brandName: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
  clientId: {
    required: boolean;
    pattern?: RegExp;
  };
  merchantLevel: {
    required: boolean;
  };
}

// Form step interface for multi-step forms
export interface FormStep {
  id: string;
  title: string;
  description: string;
  fields: string[];
  isCompleted: boolean;
}

// Merchant form props
export interface MerchantFormProps {
  initialData?: Partial<MerchantFormData>;
  mode: 'create' | 'edit' | 'view';
  onSubmit: (data: MerchantFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  validation?: MerchantFormValidation;
}

// Merchant detail props
export interface MerchantDetailProps {
  merchantId: string;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

// Merchant actions
export interface MerchantActions {
  onCreate: () => void;
  onView: (merchantId: string) => void;
  onEdit: (merchantId: string) => void;
  onDelete: (merchantId: string) => void;
  onDuplicate: (merchantId: string) => void;
}


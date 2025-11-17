import { 
  BusinessInfoForm,
  PicInfoForm,
  DocumentsForm,
  ServicesForm,
  HierarchyForm,
  OthersForm
} from '../components/forms';

export interface StepSection {
  id: string;
  title: string;
}

export interface StepConfig {
  id: string;
  component: React.ComponentType;
  title: string;
  description: string;
  sections: StepSection[];
}

export const STEPS_CONFIG: StepConfig[] = [
  {
    id: 'business-info',
    component: BusinessInfoForm,
    title: 'Business Info',
    description: 'Company information and business details',
    sections: [
      { id: 'business-profile', title: 'Business Profile' },
      { id: 'business-address', title: 'Business Address' },
      { id: 'business-characteristics', title: 'Business Characteristics' },
      { id: 'bank-info', title: 'Bank Info' },
    ]
  },
  {
    id: 'pic-info',
    component: PicInfoForm,
    title: 'PIC Info',
    description: 'Person in Charge information',
    sections: [
      { id: 'personal-info', title: 'PIC of Owner' },
      { id: 'business-info', title: 'PIC of Business' },
      { id: 'finance-info', title: 'PIC of Finance' },
      { id: 'technical-info', title: 'PIC of Technical' },
    ]
  },
  {
    id: 'documents',
    component: DocumentsForm,
    title: 'Documents',
    description: 'Required legal documents',
    sections: [
      { id: 'business-documents', title: 'Supporting Documents' },
    ]
  },
  {
    id: 'services',
    component: ServicesForm,
    title: 'Services',
    description: 'Payment services and methods',
    sections: [
      { id: 'service-type', title: 'Service Type' },
      { id: 'pg-payment-methods', title: 'Payment Methods' },
      { id: 'disbursement-pricing', title: 'Disbursement Service' },
    ]
  },
  {
    id: 'hierarchy',
    component: HierarchyForm,
    title: 'Hierarchy',
    description: 'Merchant level and parent selection',
    sections: [
      { id: 'merchant-level', title: 'Merchant Level' },
      { id: 'merchant-hierarchy', title: 'Merchant Hierarchy' },
    ]
  },
  {
    id: 'others',
    component: OthersForm,
    title: 'Others',
    description: 'Branding and additional information',
    sections: [
      { id: 'branding', title: 'Branding' },
      { id: 'referral', title: 'Referral' },
      { id: 'additional-notes', title: 'Additional Notes' },
    ]
  },
];


import type { ImageInputFile } from '@/components/image-input';

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface ReferralData {
  salesReferralId: string;
  salesReferralFee: string;
  merchantReferralClientId: string;
  merchantReferralFee: string;
}

export interface OthersFormData {
  brandColors: BrandColors;
  companyLogo: ImageInputFile[];
  salesReferralId: string;
  salesReferralFee: string;
  merchantReferralClientId: string;
  merchantReferralFee: string;
  additionalNotes: string;
}

export interface OthersFormHandlers {
  handleLogoUpload: (images: ImageInputFile[]) => void;
  handleColorChange: (colorType: keyof BrandColors, value: string) => void;
  resetToDefault: () => void;
  onSubmit: (data: OthersFormData) => void;
}

export interface LogoUploadProps {
  value: ImageInputFile[];
  onChange: (images: ImageInputFile[]) => void;
  onClear: () => void;
}

export interface ColorPickerProps {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  colorId: string;
}

export interface BrandPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandColors: BrandColors;
  companyLogo: ImageInputFile[];
}

export interface ReferralFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export interface AdditionalNotesProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

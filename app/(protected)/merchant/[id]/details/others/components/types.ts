export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface CompanyLogo {
  id: string;
  name: string;
  url: string;
  dataURL?: string;
}

export interface OthersData {
  branding: {
    companyLogo?: CompanyLogo;
    brandColors: BrandColors;
  };
  additionalNotes: {
    notes: string;
  };
}

export interface OthersTabProps {
  data?: OthersData;
  loading?: boolean;
  error?: string;
}

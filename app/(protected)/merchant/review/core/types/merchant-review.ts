import { BaseTableData } from "@/components/reusable/table";

export type ReviewStatus = 'draft' | 'pending-review' | 'approved' | 'rejected';

export interface MerchantReviewData extends BaseTableData {
  // Basic Info
  companyName: string;
  brandName: string;
  clientId: string;
  
  // Review Info
  reviewStatus: ReviewStatus;
  createdDate: {
    date: string;
    time: string;
    timezone: string;
  };
  createdBy: {
    name: string;
    email: string;
    avatar?: string;
  };
  
  // Merchant Level
  merchantLevel: {
    level: number;
    label: string;
  };
  
  // Payment Channels
  paymentChannels: number;
  
  // Additional fields for review
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: {
    name: string;
    email: string;
  };
  reviewNotes?: string;
  rejectionReason?: string;
}

export interface MerchantReviewTableConfig {
  searchPlaceholder?: string;
  showFilters?: boolean;
  showColumnVisibility?: boolean;
  enableRowSelection?: boolean;
  pageSize?: number;
}

export interface ReviewAction {
  id: string;
  label: string;
  icon: React.ComponentType;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick: (merchant: MerchantReviewData) => void;
}

export interface ReviewTab {
  id: string;
  label: string;
  count?: number;
  active?: boolean;
}


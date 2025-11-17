// Re-export all types from individual tab types
export * from '../activity/components/types';
export * from '../credentials/components/types';
export * from '../hierarchy/components/types';
export * from '../others/components/types';

import { MerchantData } from '../../../types/merchant';

// Shared types
export interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
  dropdownOptions?: DropdownOption[];
}

export interface DropdownOption {
  value: string;
  label: string;
}

// Note: MerchantDetailsState and MerchantDetailsContextType were removed
// as they were part of the old Context API which has been replaced by Zustand store
// Use merchant-details-store.ts types instead

// Common props interfaces
export interface BaseTabProps {
  data?: unknown;
  loading?: boolean;
  error?: string;
}

export interface MerchantTabProps extends BaseTabProps {
  merchant?: MerchantData;
  onDelete?: () => void;
}

export interface ServiceTabProps extends BaseTabProps {
  serviceType?: string;
}

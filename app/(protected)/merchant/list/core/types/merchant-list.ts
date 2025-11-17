import { BaseTableData } from '@/components/table/types';

// Re-export the main MerchantData type from the parent types
export type { MerchantData } from '../../../types/merchant';

// List-specific interfaces
export interface MerchantListState {
  selectedMerchants: any[]; // Will be typed as MerchantData in the hook
  loading: boolean;
  error: string | undefined;
}

export interface MerchantListActions {
  setSelectedMerchants: (merchants: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | undefined) => void;
  handleView: (merchant: any) => void;
  handleEdit: (merchant: any) => void;
  handleDelete: (merchant: any) => Promise<void>;
  handleCreate: () => void;
  handleSelectionChange: (selected: any[]) => void;
  clearError: () => void;
}

export interface MerchantTableConfig {
  searchPlaceholder?: string;
  showFilters?: boolean;
  showColumnVisibility?: boolean;
  enableRowSelection?: boolean;
  pageSize?: number;
}


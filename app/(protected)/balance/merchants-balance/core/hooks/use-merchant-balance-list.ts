"use client";

import { MerchantBalanceData } from "../_model";
import { useBaseBalanceList } from "../../../core/hooks/use-base-balance-list";

export interface MerchantBalanceListState {
  selectedMerchants: MerchantBalanceData[];
  loading: boolean;
  error: string | undefined;
}

export interface MerchantBalanceListActions {
  handleView: (merchant: MerchantBalanceData) => void;
  handleEdit: (merchant: MerchantBalanceData) => void;
  handleDelete: (merchant: MerchantBalanceData) => void;
  handleCreate: () => void;
  handleRowClick: (merchant: MerchantBalanceData) => void;
  handleSelectionChange: (selectedMerchants: MerchantBalanceData[]) => void;
  clearError: () => void;
}

export function useMerchantBalanceList(): MerchantBalanceListState &
  MerchantBalanceListActions {
  const baseHook = useBaseBalanceList<MerchantBalanceData>({
    onView: (merchant) => {
      console.log("View merchant balance:", merchant);
    },
    onEdit: (merchant) => {
      console.log("Edit merchant balance:", merchant);
    },
    onDelete: (merchant) => {
      console.log("Delete merchant balance:", merchant);
    },
    onCreate: () => {
      console.log("Create new merchant balance");
    },
    onRowClick: (merchant) => {
      console.log("Row clicked:", merchant);
    },
    initialError: undefined,
  });

  return {
    selectedMerchants: baseHook.selectedItems,
    loading: baseHook.loading,
    error: baseHook.error ?? undefined,
    handleView: baseHook.handleView,
    handleEdit: baseHook.handleEdit,
    handleDelete: baseHook.handleDelete,
    handleCreate: baseHook.handleCreate,
    handleRowClick: baseHook.handleRowClick,
    handleSelectionChange: baseHook.handleSelectionChange,
    clearError: baseHook.clearError,
  };
}

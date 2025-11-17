"use client";

import { BalanceStatementData } from "../_model";
import { useBaseBalanceList } from "../../../core/hooks/use-base-balance-list";

export function useBalanceStatementList() {
  const baseHook = useBaseBalanceList<BalanceStatementData>({
    onView: (transaction) => {
      console.log("View transaction:", transaction);
    },
    onEdit: (transaction) => {
      console.log("Edit transaction:", transaction);
    },
    onDelete: (transaction) => {
      console.log("Delete transaction:", transaction);
    },
    onCreate: () => {
      console.log("Create new transaction");
    },
    onRowClick: (transaction) => {
      console.log("Row clicked:", transaction);
    },
  });

  return {
    selectedTransactions: baseHook.selectedItems,
    loading: baseHook.loading,
    error: baseHook.error,
    handleView: baseHook.handleView,
    handleEdit: baseHook.handleEdit,
    handleDelete: baseHook.handleDelete,
    handleCreate: baseHook.handleCreate,
    handleRowClick: baseHook.handleRowClick,
    handleSelectionChange: baseHook.handleSelectionChange,
    clearError: baseHook.clearError,
  };
}

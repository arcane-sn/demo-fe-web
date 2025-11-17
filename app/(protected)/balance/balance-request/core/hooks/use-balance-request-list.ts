"use client";

import { useState, useCallback } from "react";
import { BalanceRequestData } from "../_model";
import { useBaseBalanceList } from "../../../core/hooks/use-base-balance-list";

export function useBalanceRequestList() {
  const [isModal, setIsModal] = useState({
    balanceReleaseModal: false,
    balanceTopupModal: false,
    balanceAdjustmentModal: false,
    balanceHoldModal: false,
  });

  const baseHook = useBaseBalanceList<BalanceRequestData>({
    onRowClick: (request: BalanceRequestData) => {
      if (request.activityType.type === "release") {
        setIsModal((prev) => ({ ...prev, balanceReleaseModal: true }));
      } else if (request.activityType.type === "topup") {
        setIsModal((prev) => ({ ...prev, balanceTopupModal: true }));
      } else if (request.activityType.type === "adjustment") {
        setIsModal((prev) => ({ ...prev, balanceAdjustmentModal: true }));
      } else if (request.activityType.type === "hold") {
        setIsModal((prev) => ({ ...prev, balanceHoldModal: true }));
      }
    },
    onSelectionChange: (requests) => {
      console.log("Selection changed:", requests.length, "items");
    },
  });

  const handleApprove = useCallback(() => {
    console.log("Approve selected requests:", baseHook.selectedItems);
  }, [baseHook.selectedItems]);

  const handleReject = useCallback(() => {
    console.log("Reject selected requests:", baseHook.selectedItems);
  }, [baseHook.selectedItems]);

  const openModal = useCallback((modalName: keyof typeof isModal) => {
    setIsModal((prev) => ({ ...prev, [modalName]: true }));
  }, []);

  const closeModal = useCallback((modalName: keyof typeof isModal) => {
    setIsModal((prev) => ({ ...prev, [modalName]: false }));
  }, []);

  return {
    selectedRequests: baseHook.selectedItems,
    loading: baseHook.loading,
    error: baseHook.error,
    handleView: baseHook.handleView,
    handleEdit: baseHook.handleEdit,
    handleDelete: baseHook.handleDelete,
    handleCreate: baseHook.handleCreate,
    handleRowClick: baseHook.handleRowClick,
    handleSelectionChange: baseHook.handleSelectionChange,
    handleApprove,
    handleReject,
    clearError: baseHook.clearError,
    isModal,
    setIsModal,
    openModal,
    closeModal,
  };
}

'use client';

import { useState, useCallback } from 'react';
import { PendingApprovalData } from '../../../components/tables/pending-approval/core/models';
import { mockPendingApprovalData } from '../../../components/tables/pending-approval/core/data/mock-data';

export interface PendingApprovalListActions {
  handleRowClick: (disbursement: PendingApprovalData) => void;
  handleView: (disbursement: PendingApprovalData) => void;
  handleApprove: (disbursement: PendingApprovalData) => void;
  handleReject: (disbursement: PendingApprovalData) => void;
  handleBulkApprove: (disbursements: PendingApprovalData[]) => void;
  handleBulkReject: (disbursements: PendingApprovalData[]) => void;
  handleSelectionChange: (selected: PendingApprovalData[]) => void;
  clearError: () => void;
}

export function usePendingApprovalList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDisbursements, setSelectedDisbursements] = useState<PendingApprovalData[]>([]);

  const handleRowClick = useCallback((disbursement: PendingApprovalData) => {
  }, []);

  const handleView = useCallback((disbursement: PendingApprovalData) => {
  }, []);

  const handleApprove = useCallback((disbursement: PendingApprovalData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleReject = useCallback((disbursement: PendingApprovalData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleBulkApprove = useCallback((disbursements: PendingApprovalData[]) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleBulkReject = useCallback((disbursements: PendingApprovalData[]) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleSelectionChange = useCallback((selected: PendingApprovalData[]) => {
    setSelectedDisbursements(selected);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    data: mockPendingApprovalData,
    loading,
    error,
    selectedDisbursements,
    handleRowClick,
    handleView,
    handleApprove,
    handleReject,
    handleBulkApprove,
    handleBulkReject,
    handleSelectionChange,
    clearError,
  };
}



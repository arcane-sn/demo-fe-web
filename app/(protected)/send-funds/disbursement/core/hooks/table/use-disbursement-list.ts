'use client';

import { useState, useCallback } from 'react';
import { DisbursementDraft } from '../../../components/tables/draft/core/models';
import { mockDisbursementDraftData } from '../../../components/tables/draft/core/data/mock-data';

export interface DisbursementListActions {
  handleRowClick: (disbursement: DisbursementDraft) => void;
  handleView: (disbursement: DisbursementDraft) => void;
  handleEdit: (disbursement: DisbursementDraft) => void;
  handleDelete: (disbursement: DisbursementDraft) => void;
  handleSend: (disbursement: DisbursementDraft) => void;
  handleCreate: () => void;
  handleSelectionChange: (selected: DisbursementDraft[]) => void;
  clearError: () => void;
}

export function useDisbursementList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDisbursements, setSelectedDisbursements] = useState<DisbursementDraft[]>([]);

  const handleRowClick = useCallback((disbursement: DisbursementDraft) => {
  }, []);

  const handleView = useCallback((disbursement: DisbursementDraft) => {
  }, []);

  const handleEdit = useCallback((disbursement: DisbursementDraft) => {
  }, []);

  const handleDelete = useCallback((disbursement: DisbursementDraft) => {
  }, []);

  const handleSend = useCallback((disbursement: DisbursementDraft) => {
  }, []);

  const handleCreate = useCallback(() => {
  }, []);

  const handleSelectionChange = useCallback((selected: DisbursementDraft[]) => {
    setSelectedDisbursements(selected);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    data: mockDisbursementDraftData,
    loading,
    error,
    selectedDisbursements,
    handleRowClick,
    handleView,
    handleEdit,
    handleDelete,
    handleSend,
    handleCreate,
    handleSelectionChange,
    clearError,
  };
}



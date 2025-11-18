'use client';

import { useState, useCallback } from 'react';
import { DisbursementDetail } from '../../types/disbursement-detail';
import { 
  mockDisbursementDetailData,
  mockScheduledDisbursementData,
  mockProcessingDisbursementData,
  mockCompletedDisbursementData,
  mockRejectedDisbursementData
} from '../data/mock-disbursement-detail';

export interface DisbursementDetailActions {
  clearError: () => void;
}

export function useDisbursementDetail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDisbursementData = useCallback((status: string): DisbursementDetail => {
    switch (status) {
      case 'scheduled':
        return mockScheduledDisbursementData;
      case 'processing':
        return mockProcessingDisbursementData;
      case 'completed':
        return mockCompletedDisbursementData;
      case 'rejected':
        return mockRejectedDisbursementData;
      default:
        return mockDisbursementDetailData;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    getDisbursementData,
    loading,
    error,
    clearError,
  };
}


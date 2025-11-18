'use client';

import { useState, useCallback } from 'react';
import { BalanceDetailItem } from '../data/mock-balance-detail';
import { mockBalanceDetailData } from '../data/mock-balance-detail';

export interface BalanceDetailActions {
  clearError: () => void;
}

export function useBalanceDetail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balanceData] = useState<BalanceDetailItem[]>(mockBalanceDetailData);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    balanceData,
    loading,
    error,
    clearError,
  };
}


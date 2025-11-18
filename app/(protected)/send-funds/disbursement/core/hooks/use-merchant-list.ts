'use client';

import { useState, useCallback } from 'react';
import { Merchant } from '../data/mock-merchants';
import { mockMerchants } from '../data/mock-merchants';

export interface MerchantListActions {
  handleSelectMerchant: (merchant: Merchant) => void;
  clearError: () => void;
}

export function useMerchantList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [merchants] = useState<Merchant[]>(mockMerchants);

  const handleSelectMerchant = useCallback((merchant: Merchant) => {
    console.log('Selected merchant:', merchant);
    // Here you would typically update the selected merchant in global state
    // or trigger an API call to update the current merchant context
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    merchants,
    loading,
    error,
    handleSelectMerchant,
    clearError,
  };
}


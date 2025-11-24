'use client';

import { useCallback } from 'react';
import { MerchantData } from '../../../../types/merchant';
import { 
  useMerchant, 
  useLoading, 
  useError, 
  useMerchantDetailsActions 
} from '../stores/merchant-details-store';

export function useMerchantDetails() {
  // Use Zustand store instead of Context API
  const merchant = useMerchant();
  const loading = useLoading();
  const error = useError();
  const { fetchMerchant, updateMerchant, deleteMerchant: deleteMerchantAction } = useMerchantDetailsActions();

  const handleFetchMerchant = useCallback(async (merchantId: string) => {
    await fetchMerchant(merchantId);
  }, [fetchMerchant]);

  const handleUpdateMerchant = useCallback(async (merchantId: string, data: Partial<MerchantData>) => {
    await updateMerchant(merchantId, data);
  }, [updateMerchant]);

  const handleDeleteMerchant = useCallback(async (merchantId: string) => {
    if (!confirm('Are you sure you want to delete this merchant? This action cannot be undone.')) {
      return;
    }
    await deleteMerchantAction(merchantId);
  }, [deleteMerchantAction]);

  return {
    merchant,
    loading,
    error,
    fetchMerchant: handleFetchMerchant,
    updateMerchant: handleUpdateMerchant,
    deleteMerchant: handleDeleteMerchant,
  };
}


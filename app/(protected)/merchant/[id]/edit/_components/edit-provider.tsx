'use client';

import React, { useEffect } from 'react';
import { MerchantData } from '../../../types/merchant';
import { useEditStore } from '../core/stores';

export interface EditProviderProps {
  children: React.ReactNode;
  merchantId: string;
  initialMerchant?: MerchantData | null;
}

/**
 * EditProvider - Wrapper component yang menginisialisasi edit store
 * Menggunakan Zustand store untuk state management
 * Supports server-side data initialization
 */
export function EditProvider({ children, merchantId, initialMerchant = null }: EditProviderProps) {
  const setMerchant = useEditStore((state) => state.setMerchant);
  const setLoading = useEditStore((state) => state.setLoading);
  const fetchMerchant = useEditStore((state) => state.fetchMerchant);

  const setMerchantId = useEditStore((state) => state.setMerchantId);
  const restoreDraft = useEditStore((state) => state.restoreDraft);

  // Initialize store with server data and restore draft if available
  useEffect(() => {
    if (initialMerchant) {
      setMerchant(initialMerchant);
      setLoading(false);
      setMerchantId(initialMerchant.id);
      
      // Try to restore draft
      restoreDraft(initialMerchant.id);
    }
  }, [initialMerchant, setMerchant, setLoading, setMerchantId, restoreDraft]);

  // Fetch merchant if not provided (client-side fallback)
  useEffect(() => {
    if (merchantId && !initialMerchant) {
      setMerchantId(merchantId);
      fetchMerchant(merchantId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantId]); // Only depend on merchantId

  return <>{children}</>;
}

/**
 * Hook untuk menggunakan edit context
 * Alias untuk backward compatibility
 */
export function useEditContext() {
  const merchant = useEditStore((state) => state.merchant);
  const loading = useEditStore((state) => state.loading);
  const error = useEditStore((state) => state.error);
  const formData = useEditStore((state) => state.formData);
  const hasUnsavedChanges = useEditStore((state) => state.hasUnsavedChanges);
  const updateMerchant = useEditStore((state) => state.updateMerchant);
  const setFormData = useEditStore((state) => state.setFormData);
  const updateFormData = useEditStore((state) => state.updateFormData);
  const resetFormData = useEditStore((state) => state.resetFormData);
  const setHasUnsavedChanges = useEditStore((state) => state.setHasUnsavedChanges);

  return {
    merchant,
    loading,
    error,
    formData,
    hasUnsavedChanges,
    updateMerchant,
    setFormData,
    updateFormData,
    resetFormData,
    setHasUnsavedChanges,
  };
}


'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MerchantReviewData } from '../types';
import { MerchantService } from '../../../core/services/merchant.service';
import { useMerchantNavigation } from '../../../utils/navigation';

export function useMerchantReviewActions(activeTab?: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();
  const navigation = useMerchantNavigation();

  const handleView = useCallback((merchant: MerchantReviewData) => {
    try {
      // Navigate to review detail page with tab query parameter
      const url = activeTab 
        ? `/merchant/review/${merchant.id}?tab=${activeTab}`
        : `/merchant/review/${merchant.id}`;
      router.push(url);
    } catch (err) {
      setError('Failed to navigate to merchant details');
    }
  }, [router, activeTab]);

  const handleApprove = useCallback(async (merchant: MerchantReviewData) => {
    setLoading(true);
    setError(undefined);

    try {
      await MerchantService.approveMerchant(merchant.id);
    } catch (err) {
      setError('Failed to approve merchant. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReject = useCallback(async (merchant: MerchantReviewData) => {
    setLoading(true);
    setError(undefined);

    try {
      await MerchantService.rejectMerchant(merchant.id);
    } catch (err) {
      setError('Failed to reject merchant. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleContinueDraft = useCallback((merchant: MerchantReviewData) => {
    try {
      navigation.toEdit(merchant.id);
    } catch (err) {
      setError('Failed to navigate to merchant edit');
    }
  }, [navigation]);

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  return {
    loading,
    error,
    handleView,
    handleApprove,
    handleReject,
    handleContinueDraft,
    clearError,
  };
}


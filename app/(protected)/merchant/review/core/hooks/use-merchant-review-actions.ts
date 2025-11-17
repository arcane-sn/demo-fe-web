'use client';

import { useState, useCallback } from 'react';
import { MerchantReviewData } from '../types';
import { MerchantService } from '../../../core/services/merchant.service';
import { useMerchantNavigation } from '../../../utils/navigation';

export function useMerchantReviewActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigation = useMerchantNavigation();

  const handleView = useCallback((merchant: MerchantReviewData) => {
    try {
      navigation.toDetails(merchant.id);
    } catch (err) {
      setError('Failed to navigate to merchant details');
    }
  }, [navigation]);

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


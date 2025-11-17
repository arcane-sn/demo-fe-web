'use client';

import { useState, useEffect, useCallback } from 'react';
import { MerchantData } from '../../types/merchant';
import { MerchantReviewData } from '../../review/core/types/merchant-review';
import { MerchantService } from '../services/merchant.service';

export function useMerchantData() {
  const [merchants, setMerchants] = useState<MerchantData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMerchants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await MerchantService.getAllMerchants();
      setMerchants(data);
    } catch (err) {
      setError('Failed to fetch merchants');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMerchantsForList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await MerchantService.getMerchantsForList();
      setMerchants(data);
    } catch (err) {
      setError('Failed to fetch merchants for list');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMerchantsForReview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await MerchantService.getMerchantsForReview();
      setMerchants(data);
    } catch (err) {
      setError('Failed to fetch merchants for review');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMerchantsByStatus = useCallback(async (status: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await MerchantService.getMerchantsByStatus(status);
      setMerchants(data);
    } catch (err) {
      setError(`Failed to fetch merchants with status: ${status}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshMerchants = useCallback(() => {
    fetchMerchants();
  }, [fetchMerchants]);

  return {
    merchants,
    loading,
    error,
    fetchMerchants,
    fetchMerchantsForList,
    fetchMerchantsForReview,
    fetchMerchantsByStatus,
    refreshMerchants,
    setMerchants,
    setLoading,
    setError,
  };
}

export function useMerchant(merchantId: string) {
  const [merchant, setMerchant] = useState<MerchantData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMerchant = useCallback(async () => {
    if (!merchantId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await MerchantService.getMerchantById(merchantId);
      setMerchant(data);
    } catch (err) {
      setError('Failed to fetch merchant');
    } finally {
      setLoading(false);
    }
  }, [merchantId]);

  const updateMerchant = useCallback(async (data: Partial<MerchantData>) => {
    if (!merchantId) return;
    
    setLoading(true);
    setError(null);
    try {
      const updated = await MerchantService.updateMerchant(merchantId, data);
      setMerchant(updated);
      return updated;
    } catch (err) {
      setError('Failed to update merchant');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [merchantId]);

  const deleteMerchant = useCallback(async () => {
    if (!merchantId) return;
    
    setLoading(true);
    setError(null);
    try {
      await MerchantService.deleteMerchant(merchantId);
      setMerchant(null);
    } catch (err) {
      setError('Failed to delete merchant');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [merchantId]);

  useEffect(() => {
    fetchMerchant();
  }, [fetchMerchant]);

  return {
    merchant,
    loading,
    error,
    fetchMerchant,
    updateMerchant,
    deleteMerchant,
    setMerchant,
    setLoading,
    setError,
  };
}

export function useMerchantReviews(activeTab: string) {
  const [reviews, setReviews] = useState<MerchantReviewData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await MerchantService.getMerchantReviewsByTab(activeTab);
      setReviews(data);
    } catch (err) {
      setError('Failed to fetch merchant reviews');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  const approveMerchant = useCallback(async (merchantId: string) => {
    setLoading(true);
    setError(null);
    try {
      await MerchantService.approveMerchant(merchantId);
      // Refresh reviews after approval
      await fetchReviews();
    } catch (err) {
      setError('Failed to approve merchant');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchReviews]);

  const rejectMerchant = useCallback(async (merchantId: string, reason?: string) => {
    setLoading(true);
    setError(null);
    try {
      await MerchantService.rejectMerchant(merchantId, reason);
      // Refresh reviews after rejection
      await fetchReviews();
    } catch (err) {
      setError('Failed to reject merchant');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchReviews]);

  const bulkApprove = useCallback(async (merchantIds: string[]) => {
    setLoading(true);
    setError(null);
    try {
      await MerchantService.bulkApproveMerchants(merchantIds);
      // Refresh reviews after bulk approval
      await fetchReviews();
    } catch (err) {
      setError('Failed to bulk approve merchants');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchReviews]);

  const bulkReject = useCallback(async (merchantIds: string[], reason?: string) => {
    setLoading(true);
    setError(null);
    try {
      await MerchantService.bulkRejectMerchants(merchantIds, reason);
      // Refresh reviews after bulk rejection
      await fetchReviews();
    } catch (err) {
      setError('Failed to bulk reject merchants');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchReviews]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    approveMerchant,
    rejectMerchant,
    bulkApprove,
    bulkReject,
    setReviews,
    setLoading,
    setError,
  };
}

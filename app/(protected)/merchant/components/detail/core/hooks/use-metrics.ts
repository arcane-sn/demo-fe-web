'use client';

import { useState, useEffect } from 'react';
import { MerchantService } from '../../../../core/services/merchant.service';
import { ErrorService } from '../services/error-service';

export interface MetricsData {
  totalTransactionAmount: string;
  totalTransactionVolume: string;
  totalMDR: string;
}

export function useMetrics(merchantId: string) {
  const [metrics, setMetrics] = useState<MetricsData>({
    totalTransactionAmount: '0',
    totalTransactionVolume: 'IDR 0',
    totalMDR: 'IDR 0'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await MerchantService.getMerchantMetrics(merchantId);
        setMetrics(data);
      } catch (err) {
        const errorInfo = ErrorService.handleApiError(err);
        setError(ErrorService.getUserFriendlyMessage(errorInfo));
        ErrorService.logError(errorInfo, 'useMetrics');
      } finally {
        setLoading(false);
      }
    };

    if (merchantId) {
      fetchMetrics();
    }
  }, [merchantId]);

  const refreshMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await MerchantService.getMerchantMetrics(merchantId);
      setMetrics(data);
    } catch (err) {
      const errorInfo = ErrorService.handleApiError(err);
      setError(ErrorService.getUserFriendlyMessage(errorInfo));
      ErrorService.logError(errorInfo, 'useMetrics');
    } finally {
      setLoading(false);
    }
  };

  return {
    metrics,
    loading,
    error,
    refreshMetrics
  };
}

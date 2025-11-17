'use client';

import { useState, useCallback } from 'react';
import { MerchantReviewData } from '../types';
import { MerchantService } from '../../../core/services/merchant.service';

export function useMerchantReviewSelection() {
  const [selectedMerchants, setSelectedMerchants] = useState<MerchantReviewData[]>([]);

  const handleSelectionChange = useCallback((selected: MerchantReviewData[]) => {
    setSelectedMerchants(selected);
  }, []);

  const handleBulkApprove = useCallback(async () => {
    if (selectedMerchants.length === 0) return;

    try {
      const ids = selectedMerchants.map(m => m.id);
      await MerchantService.bulkApproveMerchants(ids);
      setSelectedMerchants([]);
    } catch (err) {
      // Error handling is done by the service layer
    }
  }, [selectedMerchants]);

  const handleBulkReject = useCallback(async () => {
    if (selectedMerchants.length === 0) return;

    try {
      const ids = selectedMerchants.map(m => m.id);
      await MerchantService.bulkRejectMerchants(ids);
      setSelectedMerchants([]);
    } catch (err) {
      // Error handling is done by the service layer
    }
  }, [selectedMerchants]);

  return {
    selectedMerchants,
    setSelectedMerchants,
    handleSelectionChange,
    handleBulkApprove,
    handleBulkReject,
  };
}


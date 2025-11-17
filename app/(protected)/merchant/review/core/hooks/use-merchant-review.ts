'use client';

import { useMemo } from 'react';
import { MerchantReviewData } from '../types';
import { MerchantData } from '../../../types/merchant';
import { getMerchantReviewsByTabForReview as getMerchantReviewsByTab } from '../../../core/data/mock-data';
import { useMerchantReviewTabs } from './use-merchant-review-tabs';
import { useMerchantReviewActions } from './use-merchant-review-actions';
import { useMerchantReviewSelection } from './use-merchant-review-selection';

export interface MerchantReviewState {
  selectedMerchants: MerchantReviewData[];
  loading: boolean;
  error: string | undefined;
  activeFilters: Record<string, string>;
}

export interface MerchantReviewActions {
  setSelectedMerchants: (merchants: MerchantReviewData[]) => void;
  setActiveFilters: (filters: Record<string, string>) => void;
  handleView: (merchant: MerchantReviewData) => void;
  handleApprove: (merchant: MerchantReviewData) => void;
  handleReject: (merchant: MerchantReviewData) => void;
  handleContinueDraft: (merchant: MerchantReviewData) => void;
  handleSelectionChange: (selected: MerchantReviewData[]) => void;
  handleBulkApprove: () => void;
  handleBulkReject: () => void;
  handleFilterRemove: (filterKey: string) => void;
  handleClearAllFilters: () => void;
  clearError: () => void;
}

export function useMerchantReview(
  activeTab: string, 
  initialMerchants?: MerchantData[]
) {
  // Use specialized hooks
  const { tabs } = useMerchantReviewTabs(activeTab);
  const { 
    loading, 
    error, 
    handleView, 
    handleApprove, 
    handleReject, 
    handleContinueDraft, 
    clearError 
  } = useMerchantReviewActions();
  const { 
    selectedMerchants, 
    setSelectedMerchants, 
    handleSelectionChange, 
    handleBulkApprove, 
    handleBulkReject 
  } = useMerchantReviewSelection();

  // Helper function to convert MerchantData to MerchantReviewData
  const convertToReviewData = (merchant: MerchantData): MerchantReviewData => ({
    id: merchant.id,
    companyName: merchant.companyName,
    brandName: merchant.brandName,
    clientId: merchant.clientId,
    reviewStatus: merchant.reviewStatus,
    createdDate: {
      date: merchant.registeredDate.date,
      time: merchant.registeredDate.time,
      timezone: merchant.registeredDate.timezone,
    },
    createdBy: {
      name: merchant.picOwner.fullName,
      email: merchant.picOwner.email,
      avatar: '/avatars/default.jpg',
    },
    merchantLevel: {
      level: merchant.merchantLevel.level,
      label: merchant.merchantLevel.label,
    },
    paymentChannels: merchant.activePaymentChannels,
    submittedAt: merchant.updatedDate.date + 'T' + merchant.updatedDate.time + 'Z',
  });

  // Get filtered data based on active tab
  // Use initial merchants if provided (from server), otherwise use mock data
  const filteredData = useMemo(() => {
    if (initialMerchants && initialMerchants.length > 0) {
      // Convert MerchantData[] to MerchantReviewData[] and filter by tab
      const reviewData = initialMerchants.map(convertToReviewData);
      
      // Filter by active tab
      switch (activeTab) {
        case 'new-merchant':
          return reviewData.filter(merchant => 
            merchant.reviewStatus === 'pending-review' || merchant.reviewStatus === 'draft'
          );
        case 'merchant-adjustment':
          return reviewData.filter(merchant => 
            merchant.reviewStatus === 'approved' || merchant.reviewStatus === 'rejected'
          );
        default:
          return reviewData;
      }
    }
    // Fallback to mock data if no initial merchants provided
    return getMerchantReviewsByTab(activeTab);
  }, [activeTab, initialMerchants]);

  return {
    // State
    selectedMerchants,
    loading,
    error,
    tabs,
    filteredData,
    
    // Actions
    setSelectedMerchants,
    handleView,
    handleApprove,
    handleReject,
    handleContinueDraft,
    handleSelectionChange,
    handleBulkApprove,
    handleBulkReject,
    clearError,
  };
}


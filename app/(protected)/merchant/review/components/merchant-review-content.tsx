'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  MerchantReviewTable, 
  ReviewTabs,  
} from './index';
import { useMerchantReview } from '../core';
import { MerchantData } from '../../types/merchant';

interface MerchantReviewContentProps {
  initialMerchants?: MerchantData[];
  initialError?: string | null;
}

export function MerchantReviewContent({ 
  initialMerchants = [],
  initialError = null 
}: MerchantReviewContentProps) {
  // Client-side tab state
  const [activeTab, setActiveTab] = useState('new-merchant');
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const {
    selectedMerchants,
    loading,
    error,
    tabs,
    filteredData,
    handleView,
    handleApprove,
    handleReject,
    handleContinueDraft,
    handleSelectionChange,
    handleBulkApprove,
    handleBulkReject,
    clearError,
  } = useMerchantReview(activeTab, initialMerchants);
  
  // Use initial error if provided, otherwise use hook error
  const displayError = initialError || error;

  return (
    <div className="space-y-6">
      {/* Tabs - Paling atas */}
      <ReviewTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />

      {/* Header dengan title/subtitle di kiri dan action buttons di kanan */}
      <div className="flex items-center justify-between">
        {/* Left side - Title and Subtitle */}
        <div>
          <h1 className="text-2xl font-semibold">
            {activeTab === 'new-merchant' ? 'New Merchant' : 'Merchant Adjustment'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {activeTab === 'new-merchant' 
              ? 'Review newly added merchants currently in pending review status'
              : 'Review merchant adjustment requests and changes'
            }
          </p>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            Selected Merchant: {selectedMerchants.length}
          </div>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkReject}
            disabled={loading || selectedMerchants.length === 0}
            className="flex items-center gap-2"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          
          <Button
            size="sm"
            onClick={handleBulkApprove}
            disabled={loading || selectedMerchants.length === 0}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4" />
            Approve
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {displayError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-red-800">{displayError}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="text-red-600 hover:text-red-800"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <MerchantReviewTable
        data={filteredData}
        onView={handleView}
        onApprove={handleApprove}
        onReject={handleReject}
        onContinueDraft={handleContinueDraft}
        onSelectionChange={handleSelectionChange}
        loading={loading}
        error={displayError}
      />
    </div>
  );
}

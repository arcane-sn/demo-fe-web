'use client';

import React, { useState, useCallback } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ModalApproval } from '@/components/shared/modals/modal-approved';
import { ModalSubmit } from '@/components/shared/modals/modal-submit';
import { ModalReject } from '@/components/shared/modals/modal-reject';
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
  const [isBulkApprovalModalOpen, setIsBulkApprovalModalOpen] = useState(false);
  const [isBulkSuccessModalOpen, setIsBulkSuccessModalOpen] = useState(false);
  const [isBulkApproving, setIsBulkApproving] = useState(false);
  const [approvedCount, setApprovedCount] = useState(0);
  const [isBulkRejectModalOpen, setIsBulkRejectModalOpen] = useState(false);
  const [isBulkRejecting, setIsBulkRejecting] = useState(false);
  const [isBulkRejectSuccessModalOpen, setIsBulkRejectSuccessModalOpen] = useState(false);
  const [rejectedCount, setRejectedCount] = useState(0);
  
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
    setSelectedMerchants,
    clearError,
  } = useMerchantReview(activeTab, initialMerchants);
  
  // Use initial error if provided, otherwise use hook error
  const displayError = initialError || error;

  const handleOpenBulkApprovalModal = useCallback(() => {
    if (selectedMerchants.length === 0) return;
    setIsBulkApprovalModalOpen(true);
  }, [selectedMerchants.length]);

  const handleConfirmBulkApprove = useCallback(async () => {
    if (selectedMerchants.length === 0) return;
    
    // Save the count before approval (which will reset selectedMerchants)
    const count = selectedMerchants.length;
    setApprovedCount(count);
    
    setIsBulkApproving(true);
    try {
      await handleBulkApprove();
      setIsBulkApprovalModalOpen(false);
      setIsBulkSuccessModalOpen(true);
    } catch (err) {
      // Error handling is done by parent component
    } finally {
      setIsBulkApproving(false);
    }
  }, [handleBulkApprove, selectedMerchants.length]);

  const handleCancelBulkApproval = useCallback(() => {
    setIsBulkApprovalModalOpen(false);
  }, []);

  const handleBulkSuccessModalClose = useCallback(() => {
    setIsBulkSuccessModalOpen(false);
    // Reset selected merchants after success
    setSelectedMerchants([]);
  }, [setSelectedMerchants]);

  const handleOpenBulkRejectModal = useCallback(() => {
    if (selectedMerchants.length === 0) return;
    setIsBulkRejectModalOpen(true);
  }, [selectedMerchants.length]);

  const handleConfirmBulkReject = useCallback(async (reason: string) => {
    if (selectedMerchants.length === 0) return;
    
    // Save the count before rejection (which will reset selectedMerchants)
    const count = selectedMerchants.length;
    setRejectedCount(count);
    
    setIsBulkRejecting(true);
    try {
      // Note: handleBulkReject might need to be updated to accept reason parameter
      await handleBulkReject();
      setIsBulkRejectModalOpen(false);
      setIsBulkRejectSuccessModalOpen(true);
    } catch (err) {
      // Error handling is done by parent component
    } finally {
      setIsBulkRejecting(false);
    }
  }, [handleBulkReject, selectedMerchants.length]);

  const handleCancelBulkReject = useCallback(() => {
    setIsBulkRejectModalOpen(false);
  }, []);

  const handleBulkRejectSuccessModalClose = useCallback(() => {
    setIsBulkRejectSuccessModalOpen(false);
    // Reset selected merchants after success
    setSelectedMerchants([]);
  }, [setSelectedMerchants]);

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
          <Badge variant="outline" size="lg" className="text-sm border-1 border-gray-300 rounded-md">
            Selected Merchant: {selectedMerchants.length}
          </Badge>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={handleOpenBulkRejectModal}
            disabled={loading || selectedMerchants.length === 0}
            className="flex items-center gap-2"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          
          <Button
            size="sm"
            onClick={handleOpenBulkApprovalModal}
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
        activeTab={activeTab}
      />

      {/* Bulk Approval Confirmation Modal */}
      <ModalApproval
        open={isBulkApprovalModalOpen}
        onOpenChange={setIsBulkApprovalModalOpen}
        headerTitle="Approve Confirmation"
        title={`Approve ${selectedMerchants.length} Merchant Request${selectedMerchants.length > 1 ? 's' : ''}?`}
        description="Please review the details before proceeding."
        onApprove={handleConfirmBulkApprove}
        onCancel={handleCancelBulkApproval}
        isLoading={isBulkApproving}
      />

      {/* Bulk Success Modal */}
      <ModalSubmit
        open={isBulkSuccessModalOpen}
        onOpenChange={setIsBulkSuccessModalOpen}
        title="Merchants Approved"
        imageSrc="/media/illustrations/32.svg"
        imageAlt="Merchants approved successfully"
        imageWidth={200}
        imageHeight={188}
        message={`${approvedCount} Merchant${approvedCount > 1 ? 's' : ''} Approved Successfully!`}
        description={`The selected merchant${approvedCount > 1 ? 's have' : ' has'} been successfully approved and ${approvedCount > 1 ? 'are' : 'is'} now active`}
        buttonText="Okay!"
        onButtonClick={handleBulkSuccessModalClose}
      />

      {/* Bulk Reject Confirmation Modal */}
      <ModalReject
        open={isBulkRejectModalOpen}
        onOpenChange={setIsBulkRejectModalOpen}
        headerTitle="Reject Confirmation"
        title={`Are You Sure You Want to Reject ${selectedMerchants.length} Merchant${selectedMerchants.length > 1 ? 's' : ''}?`}
        description={`Once rejected, ${selectedMerchants.length > 1 ? 'these merchants' : 'this merchant'} will be deleted.`}
        onReject={handleConfirmBulkReject}
        onCancel={handleCancelBulkReject}
        isLoading={isBulkRejecting}
      />

      {/* Bulk Reject Success Modal */}
      <ModalSubmit
        open={isBulkRejectSuccessModalOpen}
        onOpenChange={setIsBulkRejectSuccessModalOpen}
        title="Merchants Rejected"
        imageSrc="/media/illustrations/10.svg"
        imageAlt="Merchants rejected successfully"
        imageWidth={200}
        imageHeight={188}
        message={`${rejectedCount} Merchant${rejectedCount > 1 ? 's' : ''} Rejected!`}
        description={`The selected merchant${rejectedCount > 1 ? 's have' : ' has'} been rejected and deleted.`}
        buttonText="Okay!"
        onButtonClick={handleBulkRejectSuccessModalClose}
      />
    </div>
  );
}

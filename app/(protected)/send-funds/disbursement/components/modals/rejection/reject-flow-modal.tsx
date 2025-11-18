"use client";

import { useState } from 'react';
import { SingleRejectModal } from './single-reject-modal';
import { BulkRejectModal } from './bulk-reject-modal';
import { RejectSuccessModal } from './reject-success-modal';
import type { TransferDataItem, RejectReasonData } from './types';

export type RejectFlowStep = 'confirmation' | 'success';

interface RejectFlowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transferData: TransferDataItem | TransferDataItem[];
  onRejectComplete?: () => void;
}

/**
 * RejectFlowModal - Flow manager for rejection process
 * Handles the flow: Confirmation -> Success
 * Automatically routes to SingleRejectModal or BulkRejectModal based on data count
 */
export function RejectFlowModal({
  open,
  onOpenChange,
  transferData,
  onRejectComplete
}: RejectFlowModalProps) {
  const [currentStep, setCurrentStep] = useState<RejectFlowStep>('confirmation');
  const [isLoading, setIsLoading] = useState(false);

  // Normalize to array to determine if single or bulk
  const transferDataArray = Array.isArray(transferData) ? transferData : (transferData ? [transferData] : []);
  const isMultiple = transferDataArray.length > 1;

  const handleReject = async (reasons: RejectReasonData[] | string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call for rejection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to reject the transfers
      console.log('Rejecting transfers with reasons:', reasons);
      
      setCurrentStep('success');
    } catch (error) {
      console.error('Rejection failed:', error);
      // Handle error - maybe show error message or reset to confirmation step
    } finally {
      setIsLoading(false);
    }
  };

  const handleSingleReject = (reason: string) => {
    if (transferDataArray.length > 0) {
      handleReject([{
        data: transferDataArray[0],
        reason
      }]);
    }
  };

  const handleBulkReject = (reasons: RejectReasonData[]) => {
    handleReject(reasons);
  };

  const handleSuccessComplete = () => {
    setCurrentStep('confirmation');
    onRejectComplete?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    setCurrentStep('confirmation');
  };

  const handleModalClose = (open: boolean) => {
    if (!open) {
      setCurrentStep('confirmation');
    }
    onOpenChange(open);
  };

  return (
    <>
      {/* Reject Confirmation Modal - Auto route to single or bulk */}
      {isMultiple ? (
        <BulkRejectModal
          open={open && currentStep === 'confirmation'}
          onOpenChange={handleModalClose}
          onReject={handleBulkReject}
          onCancel={handleCancel}
          transferData={transferDataArray}
        />
      ) : transferDataArray.length === 1 ? (
        <SingleRejectModal
        open={open && currentStep === 'confirmation'}
        onOpenChange={handleModalClose}
          onReject={handleSingleReject}
        onCancel={handleCancel}
          transferData={transferDataArray[0]}
      />
      ) : null}

      {/* Reject Success Modal */}
      <RejectSuccessModal
        open={open && currentStep === 'success'}
        onOpenChange={handleModalClose}
        onOkay={handleSuccessComplete}
      />
    </>
  );
}

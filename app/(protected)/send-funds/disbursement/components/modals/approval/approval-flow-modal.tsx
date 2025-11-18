"use client";

import { useState } from 'react';
import { ApprovalConfirmationModal } from './approval-confirmation-modal';
import { PinVerificationModal } from './pin-verification-modal';
import { SuccessConfirmationModal } from './success-confirmation-modal';

export type ApprovalFlowStep = 'confirmation' | 'pin-verification' | 'success';

interface ApprovalFlowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transferData: {
    totalTransferAmount: string;
    totalTransaction: number;
    totalAccount: number;
    selectedRequest: number;
    transferAmount: string;
    adminFee: string;
    activeBalance: string;
    isBalanceSufficient?: boolean;
  };
  onApprovalComplete?: () => void;
  onForgotPin?: () => void;
}

export function ApprovalFlowModal({
  open,
  onOpenChange,
  transferData,
  onApprovalComplete,
  onForgotPin
}: ApprovalFlowModalProps) {
  const [currentStep, setCurrentStep] = useState<ApprovalFlowStep>('confirmation');
  const [isLoading, setIsLoading] = useState(false);

  const handleApprovalConfirm = () => {
    if (!transferData.isBalanceSufficient) return;
    setCurrentStep('pin-verification');
  };

  const handlePinVerification = async (pin: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call for PIN verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to verify the PIN
      // For demo purposes, we'll assume the PIN is valid
      console.log('Verifying PIN:', pin);
      
      setCurrentStep('success');
    } catch (error) {
      console.error('PIN verification failed:', error);
      // Handle error - maybe show error message or reset to PIN step
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessComplete = () => {
    setCurrentStep('confirmation');
    onApprovalComplete?.();
    onOpenChange(false);
  };

  const handleForgotPin = () => {
    onForgotPin?.();
    // You might want to close the modal or navigate to reset PIN page
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
      {/* Approval Confirmation Modal */}
      <ApprovalConfirmationModal
        open={open && currentStep === 'confirmation'}
        onOpenChange={handleModalClose}
        onApprove={handleApprovalConfirm}
        onCancel={handleCancel}
        transferData={transferData}
      />

      {/* PIN Verification Modal */}
      <PinVerificationModal
        open={open && currentStep === 'pin-verification'}
        onOpenChange={handleModalClose}
        onVerify={handlePinVerification}
        onForgotPin={handleForgotPin}
      />

      {/* Success Confirmation Modal */}
      <SuccessConfirmationModal
        open={open && currentStep === 'success'}
        onOpenChange={handleModalClose}
        onOkay={handleSuccessComplete}
      />
    </>
  );
}

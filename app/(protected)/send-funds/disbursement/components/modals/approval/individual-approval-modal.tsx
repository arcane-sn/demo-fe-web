"use client";

import { useState } from 'react';
import { ApprovalFlowModal } from './approval-flow-modal';
import { PendingApprovalData } from '../../tables/pending-approval/core/models';

interface IndividualApprovalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disbursement: PendingApprovalData | null;
  onApprovalComplete?: (disbursement: PendingApprovalData) => void;
  onForgotPin?: () => void;
}

export function IndividualApprovalModal({
  open,
  onOpenChange,
  disbursement,
  onApprovalComplete,
  onForgotPin
}: IndividualApprovalModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleApprovalComplete = async () => {
    if (!disbursement) return;
    
    setIsLoading(true);
    try {
      // Simulate API call for individual approval
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onApprovalComplete?.(disbursement);
      console.log('Individual approval completed for:', disbursement.id);
    } catch (error) {
      console.error('Individual approval failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPin = () => {
    onForgotPin?.();
  };

  if (!disbursement) return null;

  // Convert disbursement data to transfer data format
  const transferData = {
    totalTransferAmount: disbursement.totalTransferAmount,
    totalTransaction: disbursement.totalTransaction || 1,
    totalAccount: disbursement.totalAccount || 1,
    selectedRequest: disbursement.totalTransaction || 1,
    transferAmount: disbursement.totalTransferAmount,
    adminFee: disbursement.adminFee || "IDR 0",
    activeBalance: "IDR 200.000.000",
  };

  return (
    <ApprovalFlowModal
      open={open}
      onOpenChange={onOpenChange}
      transferData={transferData}
      onApprovalComplete={handleApprovalComplete}
      onForgotPin={handleForgotPin}
    />
  );
}

"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { X, Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { KeenIcon } from '@/components/keenicons';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Card } from '@/components/ui/card';
import type { TransferDataItem, RejectReasonData } from './types';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';

interface BulkRejectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReject: (reasons: RejectReasonData[]) => void;
  onCancel: () => void;
  transferData: TransferDataItem[];
}

/**
 * BulkRejectModal - Modal for rejecting multiple transfer requests
 * Includes pagination to navigate between items and collect rejection reasons for each
 */
export function BulkRejectModal({
  open,
  onOpenChange,
  onReject,
  onCancel,
  transferData
}: BulkRejectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rejectionReasons, setRejectionReasons] = useState<Record<number, string>>({});
  const { copyToClipboard } = useCopyToClipboard();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open && transferData.length > 0) {
      setCurrentIndex(0);
      setRejectionReasons({});
    }
  }, [open, transferData.length]);

  // Update currentIndex if it's out of bounds
  useEffect(() => {
    if (currentIndex >= transferData.length && transferData.length > 0) {
      setCurrentIndex(transferData.length - 1);
    }
  }, [currentIndex, transferData.length]);

  // Guard clause: if no data, don't render (must be after all hooks)
  if (!transferData || transferData.length === 0) {
    return null;
  }

  // Ensure currentIndex is within bounds
  const safeIndex = Math.min(currentIndex, transferData.length - 1);
  const currentData = transferData[safeIndex];
  const currentReason = rejectionReasons[safeIndex] || '';

  const handleReasonChange = (reason: string) => {
    setRejectionReasons(prev => ({
      ...prev,
      [currentIndex]: reason
    }));
  };

  const handlePrevious = () => {
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
    }
  };

  const handleNext = () => {
    if (safeIndex < transferData.length - 1) {
      setCurrentIndex(safeIndex + 1);
    }
  };

  const handleGoToPage = (index: number) => {
    if (index >= 0 && index < transferData.length) {
      setCurrentIndex(index);
    }
  };

  const handleReject = () => {
    // Check if all items have rejection reasons
    const allHaveReasons = transferData.every((_, index) => {
      const reason = rejectionReasons[index];
      return reason && reason.trim();
    });

    if (allHaveReasons) {
      const rejectData: RejectReasonData[] = transferData.map((data, index) => ({
        data,
        reason: rejectionReasons[index] || ''
      }));
      onReject(rejectData);
    }
  };

  const handleCancel = () => {
    setRejectionReasons({});
    setCurrentIndex(0);
    onCancel();
    onOpenChange(false);
  };

  const handleCopyAmount = () => {
    copyToClipboard(currentData.totalTransferAmount);
  };

  const handleCopyCreationId = () => {
    copyToClipboard(currentData.creationId);
  };

  const isRejectDisabled = !currentReason.trim() || !transferData.every((_, index) => {
    const reason = rejectionReasons[index];
    return reason && reason.trim();
  }) || !currentData;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto p-0"
        close={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-200 mb-0">
          <DialogTitle>Reject Confirmation</DialogTitle>
          <button
            onClick={handleCancel}
            className="p-1.5 rounded-md hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </DialogHeader>

        <DialogBody className="px-6 py-6 space-y-6">
        <Card className='p-5 space-y-4'>
            {/* Transfer Details */}
            <Card className="bg-gray-50 rounded-lg p-4 border-2 border-gray-400">
              {/* Transfer Amount */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Transfer Amount</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentData.transferType === 'single' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {currentData.transferType === 'single' ? 'Single Transfer' : 'Batch Transfer'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">{currentData.totalTransferAmount}</span>
                <button
                  onClick={handleCopyAmount}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>  
              </div>

              {/* Creation ID */}
              <div className="flex flex-col pt-4">
                <span className="text-sm text-gray-600">Creation ID:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{currentData.creationId}</span>
                  <button
                    onClick={handleCopyCreationId}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </Card>

            {/* Detailed Information */}
            <Card className="bg-white border border-gray-200 rounded-lg p-4">
              <Table>
                <TableBody>
                  {currentData.transferType === 'batch' ? (
                    // Batch Transfer Details
                    <>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Total Transaction</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{currentData.totalTransaction}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Total Benef. Accounts</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{currentData.totalBeneficiaryAccounts}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Batch Transfer Amount</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{currentData.batchTransferAmount}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Admin Fee</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{currentData.adminFee}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Total Transfer Amount</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{currentData.totalTransferAmount}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Scheduled Transfer</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">OFF</TableCell>
                      </TableRow>
                    </>
                  ) : (
                    // Single Transfer Details
                    <>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Benef. Bank Name</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{currentData.beneficiaryDetails?.bankName}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Benef. Account Number</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{currentData.beneficiaryDetails?.accountNumber}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Benef. Account Name</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{currentData.beneficiaryDetails?.accountName}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Scheduled Transfer</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{currentData.beneficiaryDetails?.scheduledTransfer}</TableCell>
                      </TableRow>
                    </>
                  )}

                  {/* Requester Information */}
                  <TableRow className="border-0 border-gray-200 hover:!bg-transparent">
                    <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4 pt-8">
                      <div className="flex items-center gap-2">
                        <KeenIcon 
                          icon="user" 
                          style="outline" 
                          className="text-base text-gray-500" 
                        />
                        <span>Requested by</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-gray-900 py-2 px-0 pt-4">{currentData.requesterDetails.email}</TableCell>
                  </TableRow>
                  <TableRow className="border-0 hover:!bg-transparent">
                    <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">
                      <div className="flex items-center gap-2">
                        <KeenIcon 
                          icon="calendar" 
                          style="outline" 
                          className="text-base text-gray-500" 
                        />
                        <span>Requested Date</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{currentData.requesterDetails.requestedDate}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>

          {/* Reason of Rejection */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Reason of Rejection</h3>
              <p className="text-sm text-gray-600">Please input the rejection reason before continue</p>
            </div>
            <Textarea
              value={currentReason}
              onChange={(e) => handleReasonChange(e.target.value)}
              placeholder="Your reason of rejection"
              className="min-h-[100px] resize-none"
            />
          </div>
          {/* Pagination Navigation */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{safeIndex + 1} of {transferData.length} requests</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handlePrevious}
                disabled={safeIndex === 0}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {transferData.map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => handleGoToPage(index)}
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 ${
                      safeIndex === index
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <Button
                onClick={handleNext}
                disabled={safeIndex === transferData.length - 1}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          </Card>
        </DialogBody>

        <DialogFooter className="flex flex-col gap-4 px-6 py-4 border-gray-200 pt-0">
          {!transferData.every((_, index) => {
            const reason = rejectionReasons[index];
            return reason && reason.trim();
            }) && (
            <div className="flex items-center gap-2 text-sm text-red-600 px-4 py-2 w-full">
                <KeenIcon
                  icon="shield-cross"
                  style="outline"
                  className="text-lg text-red-600"
                />
              <span className="whitespace-normal">Please enter reason for all requests</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 w-full">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="px-6 py-2 bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              disabled={isRejectDisabled}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Reject Request
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


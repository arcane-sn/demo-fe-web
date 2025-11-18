"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { X, Copy } from 'lucide-react';
import { KeenIcon } from '@/components/keenicons';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Card } from '@/components/ui/card';
import type { TransferDataItem } from './types';

interface SingleRejectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReject: (reason: string) => void;
  onCancel: () => void;
  transferData: TransferDataItem;
}

/**
 * SingleRejectModal - Modal for rejecting a single transfer request
 * Used when rejecting one item from table action or bulk selection with only 1 item
 */
export function SingleRejectModal({
  open,
  onOpenChange,
  onReject,
  onCancel,
  transferData
}: SingleRejectModalProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const { copyToClipboard } = useCopyToClipboard();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      setRejectionReason('');
    }
  }, [open]);

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onReject(rejectionReason);
    }
  };

  const handleCancel = () => {
    setRejectionReason('');
    onCancel();
    onOpenChange(false);
  };

  const handleCopyAmount = () => {
    copyToClipboard(transferData.totalTransferAmount);
  };

  const handleCopyCreationId = () => {
    copyToClipboard(transferData.creationId);
  };

  const isRejectDisabled = !rejectionReason.trim();

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
                  transferData.transferType === 'single' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {transferData.transferType === 'single' ? 'Single Transfer' : 'Batch Transfer'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">{transferData.totalTransferAmount}</span>
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
                  <span className="text-sm font-medium text-gray-900">{transferData.creationId}</span>
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
                  {transferData.transferType === 'batch' ? (
                    // Batch Transfer Details
                    <>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Total Transaction</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{transferData.totalTransaction}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Total Benef. Accounts</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{transferData.totalBeneficiaryAccounts}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Batch Transfer Amount</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{transferData.batchTransferAmount}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Admin Fee</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{transferData.adminFee}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Total Transfer Amount</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{transferData.totalTransferAmount}</TableCell>
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
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{transferData.beneficiaryDetails?.bankName}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Benef. Account Number</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{transferData.beneficiaryDetails?.accountNumber}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Benef. Account Name</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{transferData.beneficiaryDetails?.accountName}</TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">Scheduled Transfer</TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{transferData.beneficiaryDetails?.scheduledTransfer}</TableCell>
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
                    <TableCell className="text-sm font-medium text-gray-900 py-2 px-0 pt-4">{transferData.requesterDetails.email}</TableCell>
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
                    <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">{transferData.requesterDetails.requestedDate}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Card>

          {/* Reason of Rejection */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Reason of Rejection</h3>
              <p className="text-sm text-gray-600">Please input the rejection reason before continue</p>
            </div>
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Your reason of rejection"
              className="min-h-[100px] resize-none"
            />
          </div>
        </DialogBody>

        <DialogFooter className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 pt-0">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


"use client";

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { X } from 'lucide-react';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { KeenIcon } from '@/components/keenicons';

interface ApprovalConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: () => void;
  onCancel: () => void;
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
}

export function ApprovalConfirmationModal({
  open,
  onOpenChange,
  onApprove,
  onCancel,
  transferData
}: ApprovalConfirmationModalProps) {
  const handleApprove = () => {
    onApprove();
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto p-0"
        close={false}
      >
        <VisuallyHidden>
          <DialogTitle>Approval Confirmation</DialogTitle>
        </VisuallyHidden>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Approval Confirmation</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Total Transfer Amount Section */}
          <Card>
            <CardContent className="p-6">
              <div className="text-sm font-normal text-gray-600 mb-2">Total Transfer Amount</div>
              <div className="text-3xl font-bold text-blue-900 mb-6">
                {transferData.totalTransferAmount}
              </div>
              
              {/* Summary Cards */}
              <div className="flex items-center gap-4 pb-5">
                <Card className=" border-2 border-dashed border-gray-300">
                  <CardContent className=" p-4">
                    <div className="text-2xl font-bold text-gray-900">{transferData.totalTransaction}</div>
                    <div className="text-sm font-normal text-gray-600">Total Transaction</div>
                  </CardContent>
                </Card>
                <Card className=" border-2 border-dashed border-gray-300">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-gray-900">{transferData.totalAccount}</div>
                    <div className="text-sm font-normal text-gray-600">Total Account</div>
                  </CardContent>
                </Card>
                <Card className=" border-2 border-dashed border-gray-300">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-gray-900">{transferData.selectedRequest}</div>
                    <div className="text-sm font-normal text-gray-600">Selected Request</div>
                  </CardContent>
                </Card>
              </div>
            
              <Table>
                <TableBody>
                  <TableRow className="border-0 hover:!bg-transparent">
                    <TableCell className="text-sm font-normal text-gray-600 py-2 px-0">Transfer Amount</TableCell>
                    <TableCell className="text-sm font-normal text-gray-600 py-2 px-0">{transferData.transferAmount}</TableCell>
                  </TableRow>
                  <TableRow className="border-0 hover:!bg-transparent">
                    <TableCell className="text-sm font-normal text-gray-600 py-2 px-0">Admin Fee</TableCell>
                    <TableCell className="text-sm font-normal text-gray-600 py-2 px-0 ">{transferData.adminFee}</TableCell>
                  </TableRow>
                  <TableRow className="border-0 hover:!bg-transparent">
                    <TableCell className="text-sm font-normal text-gray-600 py-2 px-0">Total Transfer Amount</TableCell>
                    <TableCell className="text-sm font-normal text-gray-600 py-2 px-0">{transferData.totalTransferAmount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Active Balance */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HexagonBadge 
                    size="w-10 h-10"
                    fill="fill-green-50" 
                    stroke="stroke-green-200"
                    badge={
                      <KeenIcon 
                        icon="rocket" 
                        style="outline" 
                        className="text-xl text-green-600" 
                      />
                    }
                  />
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{transferData.activeBalance}</div>
                    <div className="text-sm text-gray-600">Active Balance</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  Top-Up Balance
                </Button>
              </div>
            </CardContent>
          </Card>

          {!transferData.isBalanceSufficient && (
            <Card className="bg-red-50 border-2 border-dashed border-red-200 ">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 justify-center">
                  <KeenIcon
                        icon="shield-cross"
                        style="outline"
                        className="text-4xl text-red-600"
                      />
                  <div>
                    <div className="font-semibold text-red-900">Sorry, Insufficient Balance</div>
                    <div className="text-sm text-red-800 mt-1">
                      You don't have enough balance to make this disbursement. Please top up to continue.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Warning */}
          <Card className="bg-yellow-100 border-2 border-dashed border-yellow-300">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <HexagonBadge 
                  size="w-8 h-8"
                  fill="fill-yellow-100" 
                  stroke="stroke-yellow-600"
                  badge={
                    <KeenIcon 
                      icon="information" 
                      style="outline" 
                      className="text-lg text-yellow-600" 
                    />
                  }
                />
                <div>
                  <div className="font-semibold text-gray-900">Review Before Approve</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Please review the information carefully before approving requests.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="px-6 py-2 bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            disabled={!transferData.isBalanceSufficient}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Approve Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

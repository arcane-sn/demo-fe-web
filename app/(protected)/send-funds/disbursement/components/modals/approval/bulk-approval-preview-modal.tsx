"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Copy, ChevronLeft, ChevronRight, X } from "lucide-react";
import { KeenIcon } from "@/components/keenicons";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import type { TransferDataItem } from "../rejection/types";

interface BulkApprovalPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  onCancel: () => void;
  transferData: TransferDataItem[];
}

export function BulkApprovalPreviewModal({
  open,
  onOpenChange,
  onContinue,
  onCancel,
  transferData,
}: BulkApprovalPreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
    }
  }, [open, transferData.length]);

  if (!transferData || transferData.length === 0) {
    return null;
  }

  const safeIndex = Math.min(currentIndex, transferData.length - 1);
  const currentData = transferData[safeIndex];

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

  const handleCopyAmount = () => {
    copyToClipboard(currentData.totalTransferAmount);
  };

  const handleCopyCreationId = () => {
    copyToClipboard(currentData.creationId);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const handleContinue = () => {
    onOpenChange(false);
    onContinue();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto p-0"
        close={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-200 mb-0">
          <DialogTitle>Review Selected Requests</DialogTitle>
          <button
            onClick={handleCancel}
            className="p-1.5 rounded-md hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </DialogHeader>

        <DialogBody className="px-6 py-6 space-y-6">
          <Card className="p-5 space-y-4">
            <Card className="bg-gray-50 rounded-lg p-4 border-2 border-gray-400">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Transfer Amount</span>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentData.transferType === "single"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {currentData.transferType === "single"
                    ? "Single Transfer"
                    : "Batch Transfer"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {currentData.totalTransferAmount}
                </span>
                <button
                  onClick={handleCopyAmount}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="flex flex-col pt-4">
                <span className="text-sm text-gray-600">Creation ID:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {currentData.creationId}
                  </span>
                  <button
                    onClick={handleCopyCreationId}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-lg p-4">
              <Table>
                <TableBody>
                  {currentData.transferType === "batch" ? (
                    <>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">
                          Total Transaction
                        </TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">
                          {currentData.totalTransaction}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">
                          Total Benef. Accounts
                        </TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">
                          {currentData.totalBeneficiaryAccounts}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">
                          Batch Transfer Amount
                        </TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">
                          {currentData.batchTransferAmount}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">
                          Admin Fee
                        </TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">
                          {currentData.adminFee}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">
                          Benef. Bank Name
                        </TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">
                          {currentData.beneficiaryDetails?.bankName}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">
                          Benef. Account Number
                        </TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">
                          {currentData.beneficiaryDetails?.accountNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-0 hover:!bg-transparent">
                        <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">
                          Benef. Account Name
                        </TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">
                          {currentData.beneficiaryDetails?.accountName}
                        </TableCell>
                      </TableRow>
                    </>
                  )}

                  <TableRow className="border-0 hover:!bg-transparent pt-6">
                    <TableCell className="text-sm text-gray-600 py-2 px-0 pr-4">
                      <div className="flex items-center gap-2">
                        <KeenIcon
                          icon="user"
                          style="outline"
                          className="text-base text-gray-500"
                        />
                        <span>Requested by</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">
                      {currentData.requesterDetails.email}
                    </TableCell>
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
                    <TableCell className="text-sm font-medium text-gray-900 py-2 px-0">
                      {currentData.requesterDetails.requestedDate}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>

            <div className="flex items-center justify-between w-full">
              <span className="text-sm text-gray-600">
                {safeIndex + 1} of {transferData.length} requests
              </span>
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
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
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

        <DialogFooter className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="px-6 py-2 bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continue Approval
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


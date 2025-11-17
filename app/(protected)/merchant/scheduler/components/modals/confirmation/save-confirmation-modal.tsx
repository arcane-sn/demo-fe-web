"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SaveConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SaveConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: SaveConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px] p-0 bg-white rounded-lg overflow-hidden">
        <div className="flex flex-col">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Confirmation
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="px-6 py-8 text-center">
            {/* Reject Illustration */}
            <div className="flex justify-center mb-4">
              <img 
                src="/media/illustrations/29.svg" 
                alt="Confirmation" 
                className="w-40 h-40 object-contain"
              />
            </div>

            {/* Main heading */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Ready to Submit?
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              Double-check the details before sending them for review. You won't be able to make changes until the review is finished.
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RequiredPinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetUpPin: () => void;
  onCancel?: () => void;
}

export function RequiredPinModal({
  open,
  onOpenChange,
  onSetUpPin,
  onCancel
}: RequiredPinModalProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  const handleSetUpPin = () => {
    onSetUpPin();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md p-0"
        close={false}
      >
        <VisuallyHidden>
          <DialogTitle>Required PIN</DialogTitle>
        </VisuallyHidden>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Required PIN</h2>
          <button
            onClick={handleCancel}
            className="p-1.5 rounded-md hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 text-center space-y-6">
          {/* Illustration */}
          <div className="flex justify-center mb-4">
            <img 
              src="/media/illustrations/5.svg" 
              alt="PIN Setup" 
              className="w-64 h-48 object-contain"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">
              Sorry, You Haven't Set Up a 6-Digit PIN
            </h3>
            <p className="text-sm text-gray-600">
              Please set up your PIN to be able to approve requests
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="px-6 py-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSetUpPin}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Set Up PIN
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


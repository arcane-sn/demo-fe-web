"use client";

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SuccessConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOkay: () => void;
}

export function SuccessConfirmationModal({
  open,
  onOpenChange,
  onOkay
}: SuccessConfirmationModalProps) {
  const handleOkay = () => {
    onOkay();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md p-0"
        close={false}
      >
        <VisuallyHidden>
          <DialogTitle>Request Approved</DialogTitle>
        </VisuallyHidden>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Request Approved</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-md hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 text-center space-y-6">
          {/* Success Illustration */}
          <div className="flex justify-center mb-4">
            <img 
              src="/media/illustrations/32.svg" 
              alt="Request Approved Successfully" 
              className="w-40 h-40 object-contain"
            />
          </div>

          {/* Success Message */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Request Approved Successfully!</h3>
            <p className="text-gray-600 text-sm">
              The approved transactions are now being processed for transfer
            </p>
          </div>

          {/* Okay Button */}
          <Button
            onClick={handleOkay}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Okay!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

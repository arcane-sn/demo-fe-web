"use client";

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface SubmitConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SubmitConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: SubmitConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]" style={{ zIndex: 1002 }}>
        <DialogHeader className="relative">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Confirmation
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-6 w-6"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          {/* Illustration */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center">
              <img 
                src="/media/illustrations/29.svg" 
                alt="Confirmation" 
                className="w-30 h-auto object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-gray-900">
              Ready to Submit?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Double-check the disbursement details before sending them for review. 
              You won't be able to make changes until the review is finished.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full justify-end">
            <Button
              variant="outline"
              onClick={onCancel}
              className="px-6 py-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

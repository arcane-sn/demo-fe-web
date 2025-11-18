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

interface SubmitSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function SubmitSuccessModal({
  open,
  onOpenChange,
  onClose,
}: SubmitSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]" style={{ zIndex: 1003 }}>
        <DialogHeader className="relative">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Submitted
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
                src="/media/illustrations/28.svg" 
                alt="Success" 
                className="w-30 h-auto object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-gray-900">
              Single Transfer Request Submitted
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your request has been submitted and will be reviewed by a team member with approver permissions.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-center w-full">
            <Button
              onClick={onClose}
              className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              Okay!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

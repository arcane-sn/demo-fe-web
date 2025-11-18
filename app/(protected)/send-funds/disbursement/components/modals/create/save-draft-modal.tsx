"use client";

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface SaveDraftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function SaveDraftModal({
  open,
  onOpenChange,
  onClose,
}: SaveDraftModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" style={{ zIndex: 1001 }}>
        <DialogHeader className="relative">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Saved as Draft
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          {/* Illustration */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center">
              <img 
                src="/media/illustrations/10.svg" 
                alt="Save Draft" 
                className="w-30 h-auto object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-gray-900">
              Your Work Has Been Saved
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Come back anytime to finish it!
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

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

interface ExitConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExitWithoutSaving: () => void;
  onSaveAndExit: () => void;
  onStayHere: () => void;
}

export function ExitConfirmationModal({
  open,
  onOpenChange,
  onExitWithoutSaving,
  onSaveAndExit,
  onStayHere,
}: ExitConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl" style={{ zIndex: 1000 }}>
        <DialogHeader className="relative">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Exit Confirmation
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-2">
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
              Are You Sure You Want to Exit?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Any unsaved changes will be lost, and you won't be able to continue
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 w-full justify-between">
            <Button
              onClick={onExitWithoutSaving}
              className="px-4 py-2.5 bg-pink-50 border border-red-200 text-red-600 hover:bg-pink-100 text-sm font-medium"
            >
              Exit Without Saving
            </Button>
            <div className=''>
            <Button
              onClick={onSaveAndExit}
              className="px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium pl mr-2"
            >
              Save & Exit
            </Button>
            <Button
              onClick={onStayHere}
              variant="outline"
              className="px-4 py-2.5 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium"
            >
              Stay Here
            </Button>
            </div>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

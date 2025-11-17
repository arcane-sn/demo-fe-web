'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog';

interface ExitConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExitWithoutSaving: () => void;
  onSaveAndExit: () => void;
  onStayHere: () => void;
  isSaving?: boolean;
}

export type { ExitConfirmationModalProps };

export function ExitConfirmationModal({
  open,
  onOpenChange,
  onExitWithoutSaving,
  onSaveAndExit,
  onStayHere,
  isSaving = false,
}: ExitConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6" close={true}>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold mb-4">Exit Confirmation</DialogTitle>
        </DialogHeader>
        
        <DialogBody className="text-center space-y-4">
          {/* Illustration */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <img 
                src="/media/illustrations/32.svg" 
                alt="Exit confirmation illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Are You Sure You Want to Exit?
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
            Any unsaved changes will be lost, and you won't be able to continue
          </p>
        </DialogBody>

        <DialogFooter className="flex gap-3 pt-6 border-t mt-6">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onExitWithoutSaving}
              disabled={isSaving}
              className="text-red-600 border-red-200 hover:bg-red-50 px-4 py-2.5"
            >
              Exit Without Saving
            </Button>
            <Button
              type="button"
              onClick={onSaveAndExit}
              disabled={isSaving}
              className="px-4 py-2.5"
            >
              {isSaving ? 'Saving...' : 'Save & Exit'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onStayHere}
              disabled={isSaving}
              className="px-4 py-2.5"
            >
              Stay Here
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

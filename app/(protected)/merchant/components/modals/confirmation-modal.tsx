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

import Image from 'next/image';

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export type { ConfirmationModalProps };

export function ConfirmationModal({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  isLoading = false,
}: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] p-6" close={true}>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold mb-4">Confirmation</DialogTitle>
        </DialogHeader>
        
        <DialogBody className="text-center space-y-4">
          {/* Illustration */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <Image 
                src="/media/illustrations/29.svg" 
                alt="Confirmation illustration"
                width={96}
                height={96}
                className="w-full h-full object-contain"
               
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ready to Submit?
          </h3>

          {/* Description */}
          <p className="text-[14px] text-gray-600 leading-relaxed max-w- mx-auto">
            Double-check the merchant details before sending them for review. You 
            won't be able to make changes until the review is finished.
          </p>
        </DialogBody>

        <DialogFooter className="flex gap- pt-6 border-t mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className='px-3'
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            className='px-6'
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

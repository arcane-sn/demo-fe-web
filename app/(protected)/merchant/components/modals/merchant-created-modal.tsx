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

interface MerchantCreatedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOkay: () => void;
}

export type { MerchantCreatedModalProps };

export function MerchantCreatedModal({
  open,
  onOpenChange,
  onOkay,
}: MerchantCreatedModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] p-6" close={true}>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold mb-4 border-b pb-2">Merchant Created</DialogTitle>
        </DialogHeader>
        
        <DialogBody className="text-center space-y-4 border-b pb-4">
          {/* Illustration */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <img 
                src="/media/illustxrations/28.svg" 
                alt="Success illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Merchant Created Successfully!
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
            The merchant profile has been created successfully. Your submission will 
            now be reviewed by our team.
          </p>
        </DialogBody>

        <DialogFooter className="pt-6">
          <Button
            type="button"
            onClick={onOkay}
            className="w-full py-2.5"
          >
            Okay!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

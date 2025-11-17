'use client';

import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogBody, 
  DialogFooter 
} from '@/components/ui/dialog';

interface DeleteChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  channelName?: string;
}

export function DeleteChannelModal({
  isOpen,
  onClose,
  onConfirm,
  channelName = 'this channel'
}: DeleteChannelModalProps) {
  console.log('DeleteChannelModal rendered, isOpen:', isOpen, 'channelName:', channelName);
  
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Delete Confirmation
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </DialogHeader>

        <DialogBody className="px-6 pb-6">
          {/* Illustration */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src="/media/illustrations/29.svg" 
                alt="Delete Confirmation Illustration"
                className="w-32 h-32 object-contain mx-auto"
              />
            </div>
          </div>

          {/* Main Question */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Are You Sure You Want to Delete {channelName}?
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Once deleted, the channel's configuration will be lost. If you add it back later, you'll need to set it up again.
            </p>
          </div>
        </DialogBody>

        <DialogFooter className="p-6 pt-0">
          <div className="flex gap-3 w-full">
            <Button
              variant="destructive"
              onClick={handleConfirm}
              className="flex-1"
            >
              Yes, Delete
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              No, Go Back
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

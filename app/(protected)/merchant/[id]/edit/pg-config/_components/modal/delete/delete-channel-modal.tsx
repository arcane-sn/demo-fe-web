'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog';

interface DeleteChannelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteChannelModal({
  open,
  onOpenChange,
  channelName,
  onConfirm,
  onCancel,
}: DeleteChannelModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <div className="">
            <DialogTitle className="">
              Delete Confirmation
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <DialogBody className="py-6">
          {/* Illustration */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 flex items-center justify-center">
              <img 
                src="/media/illustrations/29.svg" 
                alt="Delete confirmation illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-gray-900">
              Are You Sure You Want to Delete This Channel?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Once deleted, the channel's configuration will be lost. If you add it back later, you'll need to set it up again.
            </p>
          </div>
        </DialogBody>

        <DialogFooter className="flex justify-end">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            No, Go Back
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-pink-100 border border-red-300 text-red-700 hover:bg-pink-200"
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

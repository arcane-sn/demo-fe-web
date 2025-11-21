"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

interface CreateAccountConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const CreateAccountConfirmation = ({
  open,
  onOpenChange,
  onConfirm,
}: CreateAccountConfirmationProps) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 space-y-4">
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Confirmation
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <DialogBody className="flex flex-col items-center gap-5 px-6">
          {/* Illustration */}
          <div className="flex justify-center">
            <Image
              src="/media/illustrations/29.svg"
              alt="Invite User"
              width={100}
              height={100}
              className="w-auto h-auto max-w-[100px]"
            />
          </div>

          <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900">Invite User? </h3>
          <p className="text-sm text-gray-600">Please review the details before proceeding.</p>
          </div>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="flex-row gap-3 px-6 py-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleConfirm}
          >
            Confirm & Invite User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


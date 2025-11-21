"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface ConfirmationModalProps {
  type?: "confirmation" | "created";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  headerTitle: string;
  bodyTitle: string;
  description: string;
  submitButtonText?: string;
}

export type { ConfirmationModalProps };

export function ConfirmationModal({
  type = "confirmation",
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  isLoading = false,
  headerTitle = "Confirmation",
  bodyTitle,
  description,
  submitButtonText = "Submit",
}: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="pb-5 border-b border-gray-200">
          <DialogTitle className="text-b-14-14-600 text-gray-800">
            {headerTitle}
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="text-center py-5">
          {/* Illustration */}
          <div className="flex justify-center mb-5">
            <img
              src="/media/illustrations/29.svg"
              alt="Confirmation illustration"
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* Title */}
          <p className="text-b-16-16-500  text-gray-900 mb-1">{bodyTitle}</p>

          {/* Description */}
          <p className="text-b-13-20-400 text-gray-600">{description}</p>
        </DialogBody>

        <DialogFooter className="border-t border-gray-200">
          {type === "confirmation" ? (
            <>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="primary" onClick={onSubmit} disabled={isLoading}>
                {isLoading ? "Submitting..." : submitButtonText}
              </Button>
            </>
          ) : (
            <DialogClose asChild>
              <Button variant="primary" className="w-full">
                Okay!
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

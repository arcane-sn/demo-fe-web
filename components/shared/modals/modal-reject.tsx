"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ModalRejectProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  headerTitle?: string;
  title: string;
  description: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
  onReject: (reason: string) => void;
  onCancel?: () => void;
  rejectButtonText?: string;
  cancelButtonText?: string;
  isLoading?: boolean;
  reasonLabel?: string;
  reasonInstruction?: string;
  reasonPlaceholder?: string;
  requireReason?: boolean;
}

export function ModalReject({
  open,
  onOpenChange,
  headerTitle = "Reject Confirmation",
  title,
  description,
  illustrationSrc = "/media/illustrations/29.svg",
  illustrationAlt = "Reject confirmation",
  onReject,
  onCancel,
  rejectButtonText = "Confirm and Reject",
  cancelButtonText = "No, Go Back",
  isLoading = false,
  reasonLabel = "Reason of Rejection",
  reasonInstruction = "Please input the rejection reason before continue",
  reasonPlaceholder = "Your reason of rejection",
  requireReason = true,
}: ModalRejectProps) {
  const [rejectionReason, setRejectionReason] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
      setRejectionReason("");
      setError("");
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      handleClose();
    }
  };

  const handleReject = () => {
    if (requireReason && !rejectionReason.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }
    setError("");
    onReject(rejectionReason.trim());
  };

  // Reset state when modal closes
  React.useEffect(() => {
    if (!open) {
      setRejectionReason("");
      setError("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg px-0" close={false}>
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-300 px-5 pb-3">
          <DialogTitle className="text-slate-700 text-sm font-semibold">
            {headerTitle}
          </DialogTitle>
          <X
            className="size-4.5 text-gray-600 cursor-pointer"
            onClick={handleClose}
          />
        </DialogHeader>

        {/* Body */}
        <DialogBody className="flex flex-col gap-5 px-5 py-4 pb-7">
          {/* Illustration Section */}
          <div className="flex justify-center items-center">
            <Image
              src={illustrationSrc}
              alt={illustrationAlt}
              width={100}
              height={98}
            />
          </div>

          {/* Message Section */}
          <div className="flex flex-col items-center justify-center gap-1">
            <h3 className="text-slate-900 text-base font-semibold">{title}</h3>
            <p className="text-slate-600 text-[13px] font-normal text-center">
              {description}
            </p>
          </div>

          {/* Reason of Rejection Section */}
          <div className="flex flex-col gap-2 border-t border-gray-300 pt-5">
            <div className="flex flex-col gap-1">
              <label className="text-slate-900 text-sm font-semibold">
                {reasonLabel}
              </label>
              <p className="text-slate-600 text-[13px] font-normal">
                {reasonInstruction}
              </p>
            </div>
            <Textarea
              value={rejectionReason}
              onChange={(e) => {
                setRejectionReason(e.target.value);
                if (error) setError("");
              }}
              placeholder={reasonPlaceholder}
              className={cn(
                "min-h-[100px] resize-none",
                error && "border-destructive focus-visible:ring-destructive/30"
              )}
              disabled={isLoading}
            />
            {error && (
              <p className="text-destructive text-xs font-normal">{error}</p>
            )}
          </div>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="px-5 pt-5 border-t border-gray-300">
          <Button
            variant="outline"
            size="md"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex text-gray-700 text-[13px] font-medium border-gray-300 hover:bg-gray-50"
          >
            {cancelButtonText}
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleReject}
            disabled={isLoading || (requireReason && !rejectionReason.trim())}
            className="flex text-white text-[13px] font-medium bg-pink-600 hover:bg-pink-700 disabled:opacity-50 px-6"
          >
            {isLoading ? "Processing..." : rejectButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



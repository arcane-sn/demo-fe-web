"use client";

import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ModalApprovalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  headerTitle?: string;
  title: string;
  description: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
  onApprove: () => void;
  onCancel?: () => void;
  approveButtonText?: string;
  cancelButtonText?: string;
  isLoading?: boolean;
}

export function ModalApproval({
  open,
  onOpenChange,
  headerTitle = "Approve Confirmation",
  title,
  description,
  illustrationSrc = "/media/illustrations/29.svg",
  illustrationAlt = "Approval confirmation",
  onApprove,
  onCancel,
  approveButtonText = "Approve",
  cancelButtonText = "Cancel",
  isLoading = false,
}: ModalApprovalProps) {
  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      handleClose();
    }
  };

  const handleApprove = () => {
    onApprove();
  };

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
            onClick={handleApprove}
            disabled={isLoading}
            className="flex text-white text-[13px] font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6"
          >
            {isLoading ? "Processing..." : approveButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


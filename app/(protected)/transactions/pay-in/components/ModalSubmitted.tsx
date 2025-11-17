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
import { ModalSubmittedProps } from "../core/_models";

// Success Illustration Component
const SuccessIllustration = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-auto h-auto"
  >
    <circle cx="100" cy="100" r="80" fill="#EFF6FF" />
    <circle cx="100" cy="100" r="60" fill="#1B84FF" opacity="0.1" />
    <path
      d="M70 100L90 120L130 80"
      stroke="#1B84FF"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const ModalSubmitted = ({
  open,
  onOpenChange = () => {},
  title = "Success",
  message = "Void Success",
  description = "This transaction has been successfully voided.",
}: ModalSubmittedProps) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md px-0" close={false}>
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-100 px-5 pb-3">
          <DialogTitle className="text-slate-700 text-sm font-semibold]">
            {title}
          </DialogTitle>
          <X
            className="size-4.5 text-gray-600 cursor-pointer"
            onClick={handleClose}
          />
        </DialogHeader>

        {/* Body */}
        <DialogBody className="flex flex-col gap-5 px-5 py-4">
          {/* Illustration Section */}

          <SuccessIllustration />

          {/* Message Section */}
          <div className="flex flex-col items-center justify-center gap-1">
            <h3 className="text-slate-900 text-base font-medium">{message}</h3>
            <p className="text-slate-600 text-[13px] font-normal text-center">
              {description}
            </p>
          </div>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="px-5 pb-5 border-t border-gray-100">
          <Button
            variant="primary"
            size="md"
            // onClick={handleClose}
            className="w-full text-white text-[13px] font-medium"
          >
            Okay!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSubmitted;

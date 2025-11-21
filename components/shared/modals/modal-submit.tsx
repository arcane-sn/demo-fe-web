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

export interface ModalSubmitProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  imageSrc: string; // Path to SVG image
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  message: string;
  description: string;
  buttonText?: string;
  buttonClassName?: string; // Custom className for button styling
  onButtonClick?: () => void;
}

export function ModalSubmit({
  open,
  onOpenChange,
  title = "Success",
  imageSrc,
  imageAlt = "Illustration",
  imageWidth = 200,
  imageHeight = 188,
  message,
  description,
  buttonText = "Okay!",
  buttonClassName,
  onButtonClick,
}: ModalSubmitProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md px-0" close={false}>
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-100 px-5 pb-3">
          <DialogTitle className="text-slate-700 text-sm font-semibold">
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
          <div className="flex justify-center items-center">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="w-auto h-auto max-w-[100px]"
            />
          </div>

          {/* Message Section */}
          <div className="flex flex-col items-center justify-center gap-1">
            <h3 className="text-slate-900 text-base font-medium">{message}</h3>
            <p className="text-slate-600 text-[13px] font-normal text-center">
              {description}
            </p>
          </div>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="px-5 border-t border-gray-100">
          <Button
            variant="primary"
            size="md"
            onClick={handleButtonClick}
            className={cn(
              "w-full text-white text-[13px] font-medium",
              buttonClassName
            )}
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


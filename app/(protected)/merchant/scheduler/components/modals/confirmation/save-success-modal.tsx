"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SaveSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function SaveSuccessModal({
  open,
  onOpenChange,
  onClose,
}: SaveSuccessModalProps) {
  const handleClose = () => {
    onClose();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px] p-0 bg-white rounded-lg overflow-hidden">
        <div className="flex flex-col">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Merchant Updated
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="px-6 py-8 text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/media/illustrations/28.svg" 
              alt="Request Approved" 
              className="w-40 h-40 object-contain"
            />
          </div>

            {/* Main heading */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Merchant Updated Successfully!
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              The merchant scheduler has been updated successfully. Your submission will now be reviewed by our team.
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <Button
              onClick={handleClose}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Okay!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

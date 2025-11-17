"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface ModalChargebackRequestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalChargebackRequest = ({
  open,
  onOpenChange,
}: ModalChargebackRequestProps) => {
  const [refundAmount] = useState("IDR 0");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    console.log("Refund request submitted", {
      refundAmount,
      reason,
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0" close={false}>
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-100 px-5 py-3">
          <DialogTitle className="text-sm font-semibold text-slate-900">
            Chargeback Request
          </DialogTitle>

          <X className="size-4.5 text-gray-600" />
        </DialogHeader>

        {/* Body */}
        <DialogBody className="flex flex-col gap-5 px-5">
          {/* Refund Amount Section */}
          <div className="flex flex-col gap-4">
            <Label className="text-slate-900 text-[13px] font-medium ">
              Chargeback Amount
            </Label>

            <Input
              variant="md"
              value={refundAmount}
              disabled
              className="bg-[#FCFCFC] text-slate-700 text-[13px]"
            />
          </div>

          {/* Reason for Refund Section */}
          <div className="flex flex-col gap-4">
            <Label className="text-slate-900 text-[13px] font-medium">
              Reason for Chargeback
            </Label>

            <Textarea
              variant="md"
              placeholder="Input reason for chargeback"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-[#FCFCFC] text-[13px] min-h-[80px] resize-none"
            />
          </div>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="px-5 pb-5 justify-end gap-2.5">
          <Button
            variant="outline"
            size="md"
            onClick={handleCancel}
            className="px-4 py-3 text-slate-600 text-[13px] font-medium "
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            className="px-7.5 py-3 text-white text-[13px] font-medium "
          >
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalChargebackRequest;

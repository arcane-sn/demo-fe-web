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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { ModalRefundRequestProps } from "../core/_models";

const ModalRefundRequest = ({
  open,
  onOpenChange,
}: ModalRefundRequestProps) => {
  const [refundAmount] = useState("IDR 0");
  const [refundType, setRefundType] = useState("deduct-settlement");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    console.log("Refund request submitted", {
      refundAmount,
      refundType,
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
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-100 px-5 py-2.5">
          <DialogTitle className="text-sm font-semibold text-slate-900">
            Refund Request
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="p-1.5 h-auto hover:bg-transparent"
          >
            <X className="size-4.5 text-gray-600" />
          </Button>
        </DialogHeader>

        {/* Body */}
        <DialogBody className="flex flex-col gap-5 px-5">
          {/* Refund Amount Section */}
          <div className="flex flex-col gap-4">
            <Label className="text-slate-900 text-[13px] font-medium">
              Refund Amount
            </Label>

            <Input
              variant="md"
              value={refundAmount}
              disabled
              className="bg-[#FCFCFC] text-slate-700 text-[13px]"
            />
          </div>

          {/* Separator */}
          <div className="h-px bg-gray-100 mt-2.5" />

          {/* Refund Type Section */}
          <div className="flex flex-col gap-2">
            <Label className="text-slate-900 text-[13px] font-medium">
              Refund Type
            </Label>
            <div>
              <RadioGroup value={refundType} onValueChange={setRefundType}>
                <div className="flex flex-col">
                  {/* Option 1: Deduct Settlement */}
                  <div className="flex flex-col gap-2.5 py-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center gap-1.5">
                      <RadioGroupItem
                        value="deduct-settlement"
                        id="deduct-settlement"
                        className="size-4.5"
                      />
                      <Label
                        htmlFor="deduct-settlement"
                        className="text-slate-700 text-[13px] font-medium cursor-pointer"
                      >
                        Deduct Settlement
                      </Label>
                    </div>
                    <p className="text-slate-600 text-[9px] pl-6">
                      The refund amount will be deducted from the next
                      settlement
                    </p>
                  </div>

                  {/* Option 2: Issue Invoice */}
                  <div className="flex flex-col gap-2.5 py-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center gap-1.5">
                      <RadioGroupItem
                        value="issue-invoice"
                        id="issue-invoice"
                        className="size-4.5"
                      />
                      <Label
                        htmlFor="issue-invoice"
                        className="text-slate-700 text-[13px] font-medium cursor-pointer"
                      >
                        Issue Invoice
                      </Label>
                    </div>
                    <p className="text-slate-600 text-[9px] pl-6">
                      An invoice will be issued to you after the refund is
                      successfully processed
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-gray-100 mt-2.5" />

          {/* Reason for Refund Section */}
          <div className="flex flex-col gap-4">
            <Label className="text-slate-900 text-[13px] font-medium">
              Reason for Refund
            </Label>

            <Textarea
              variant="md"
              placeholder="Input reason for refund"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-[#FCFCFC] text-[13px] min-h-[80px] resize-none"
            />
          </div>

          {/* Separator */}
          <div className="h-px bg-gray-100 mt-2.5" />
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="px-5 pb-5 justify-end gap-2.5">
          <Button
            variant="outline"
            size="md"
            onClick={handleCancel}
            className="px-4 py-3 text-slate-600 text-[13px] font-medium"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            className="px-7.5 py-3 text-white text-[13px] font-medium"
          >
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalRefundRequest;

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, AlertCircle } from "lucide-react";
import { ModalCancelTransactionProps } from "../../core/_models";

const ModalCancelTransaction = ({
  open,
  onOpenChange = () => {},
  title = "Cancel Transaction",
  onCancel,
}: ModalCancelTransactionProps) => {
  const [notes, setNotes] = useState("");

  const handleClose = () => {
    onOpenChange(false);
    setNotes("");
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(notes);
    }
    handleClose();
  };

  const isDisabled = !notes.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md px-0" close={false}>
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-100 px-5 pb-3">
          <DialogTitle className="text-slate-800 text-sm font-semibold">
            {title}
          </DialogTitle>
          <X
            className="size-4 text-gray-600 cursor-pointer"
            onClick={handleClose}
          />
        </DialogHeader>

        {/* Body */}
        <DialogBody className="flex flex-col gap-5 py-5">
          {/* Alert Icon Section */}
          <div className="flex flex-col items-center justify-center gap-5 px-5">
            <div className="size-12 relative flex items-center justify-center">
              <AlertCircle
                className="size-11 text-rose-500"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Message Section */}
          <div className="flex flex-col items-center justify-center gap-1 px-5">
            <h3 className="text-slate-900 text-base font-medium">
              Are You Sure You Want to Cancel this Transaction?
            </h3>
            <p className="text-slate-600 text-xs font-normal text-center">
              Once canceled, this action cannot be undone.
            </p>
          </div>

          {/* Separator */}
          <div className="h-px border border-gray-100 mx-5" />

          {/* Notes Section */}
          <div className="flex flex-col gap-4 pt-2.5">
            <div className="px-5">
              <Label className="text-slate-900 text-xs font-medium">
                Notes
              </Label>
            </div>
            <div className="px-5">
              <Textarea
                variant="md"
                placeholder="Notes to cancel this transaction"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-neutral-50 text-xs min-h-[80px] resize-none"
              />
            </div>
          </div>

          {/* Separator */}
          <div className="h-px border border-gray-100 mx-5" />
        </DialogBody>

        {/* Footer */}
        <div className="w-full px-5 flex items-center justify-between">
          <Button
            variant="outline"
            size="md"
            onClick={handleClose}
            className="px-4 py-3 text-slate-600 text-xs font-medium"
          >
            No, Keep Transaction
          </Button>
          <Button
            variant="destructive"
            size="md"
            onClick={handleCancel}
            disabled={isDisabled}
            className="px-7 py-3 text-white text-xs font-medium disabled:opacity-50"
          >
            Yes, Cancel Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCancelTransaction;

"use client";

import { useState } from "react";
import DialogContent, {
  Dialog,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComponentProps } from "react";
import { FileFormatSection } from "./FileFormatSection";
import { SendFileSection } from "./SendFileSection";
import { ExportModalFooter } from "./ExportModalFooter";
import { Separator } from "@/components/ui/separator";

type ModalExportPayoutProps = ComponentProps<typeof Dialog>;

const ModalExportPayout = ({ open, onOpenChange }: ModalExportPayoutProps) => {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [email, setEmail] = useState("wakwaw@gmail.com");

  const handleFormatChange = (formatId: string) => {
    setSelectedFormat(formatId);
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  const handleExport = () => {
    // Handle export logic for pay-out transactions
    console.log(
      "Exporting pay-out data with format:",
      selectedFormat,
      "to email:",
      email
    );
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        {/* Header */}
        <DialogHeader className=" px-5 border-b border-gray-200 ">
          <DialogTitle className="text-b-14-14-600 text-gray-900 py-5">
            Export
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="flex flex-col items-center justify-center gap-5 py-5 w-full">
          {/* File Format Section */}
          <FileFormatSection
            selectedFormat={selectedFormat}
            onFormatChange={handleFormatChange}
          />

          {/* Separator */}
          <Separator />

          {/* Send File Section */}
          <SendFileSection email={email} onEmailChange={handleEmailChange} />

          {/* Separator */}
          <Separator />
        </div>
        <ExportModalFooter onExport={handleExport} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalExportPayout;

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComponentProps } from "react";
import { FileFormatSection } from "./FileFormatSection";
import { SendFileSection } from "./SendFileSection";
import { ExportModalFooter } from "./ExportModalFooter";
import { Separator } from "@/components/ui/separator";

type ModalExportPayInProps = ComponentProps<typeof Dialog>;

const ModalExportPayIn = ({ open, onOpenChange }: ModalExportPayInProps) => {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [email, setEmail] = useState("wakwaw@gmail.com");
  console.log("selectedFormat", selectedFormat);

  const handleFormatChange = (formatId: string) => {
    console.log("formatId", formatId);
    setSelectedFormat(formatId);
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleCancel = () => {
    console.log("open change", open);
    onOpenChange?.(false);
  };

  const handleExport = () => {
    // Handle export logic
    console.log("Exporting with format:", selectedFormat, "to email:", email);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" p-0">
        {/* Header */}
        <DialogHeader className="px-5 pb-5 border-b border-gray-200">
          <DialogTitle className="text-b-14-14-600 pt-5 text-gray-900 flex items-center">
            Export
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <DialogBody className="flex flex-col items-center justify-center gap-5 py-5 w-full">
          {/* File Format Section */}
          <FileFormatSection onFormatChange={handleFormatChange} />

          {/* Separator */}
          <Separator />

          {/* Send File Section */}
          <SendFileSection onEmailChange={handleEmailChange} />

          {/* Separator */}
          <Separator />
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="flex items-center justify-end w-full gap-2.5 px-5 pb-5">
          <DialogClose
            onClick={handleCancel}
            className="px-4 py-3.5 text-b-13-14-500 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </DialogClose>
          <button
            onClick={handleExport}
            className="px-8 py-3.5 text-b-13-14-500 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            Export and Send
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalExportPayIn;

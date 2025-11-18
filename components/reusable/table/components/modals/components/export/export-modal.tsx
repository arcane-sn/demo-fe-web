"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExportModalProps } from "../../types";
import { ExportFileFormatSection } from "./export-file-format-section";
import { ExportSendFileSection } from "./export-send-file-section";

/**
 * Reusable Export Modal Component
 * 
 * Provides a standardized export interface with:
 * - File format selection (PDF, CSV, XLS)
 * - Email input for sending exported file
 * - Cancel and Export actions
 */
export function ExportModal({
  open,
  onOpenChange,
  title = "Export",
  formats,
  defaultFormat = "pdf",
  defaultEmail = "",
  emailLabel = "Send File To",
  emailPlaceholder = "Enter email address",
  description,
  onExport,
  cancelButtonText = "Cancel",
  exportButtonText = "Export and Send",
}: ExportModalProps) {

  const actualFormats = formats || undefined;
  
  const getValidFormat = useMemo(() => {
    if (actualFormats && actualFormats.length > 0) {
      const formatExists = actualFormats.some(f => f.id === defaultFormat);
      return formatExists ? defaultFormat : actualFormats[0].id;
    }

    return defaultFormat;
  }, [actualFormats, defaultFormat]);

  const [selectedFormat, setSelectedFormat] = useState(getValidFormat);
  const [email, setEmail] = useState(defaultEmail);

  useEffect(() => {
    if (open) {
      setSelectedFormat(getValidFormat);
      setEmail(defaultEmail);
    }
  }, [open, getValidFormat, defaultEmail]);

  const handleFormatChange = (formatId: string) => {
    setSelectedFormat(formatId);
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleExport = () => {
    onExport?.(selectedFormat, email);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        {/* Header */}
        <DialogHeader className="px-5 pb-5 border-b border-gray-200">
          <DialogTitle className="text-b-14-14-600 pt-5 text-gray-900 flex items-center">
            {title}
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="flex flex-col items-center justify-center gap-5 py-5 w-full">
          <ExportFileFormatSection
            formats={actualFormats}
            selectedFormat={selectedFormat}
            onFormatChange={handleFormatChange}
            description={description}
          />

          {/* Separator */}
          <Separator />

          {/* Send File Section */}
          <ExportSendFileSection
            email={email}
            onEmailChange={handleEmailChange}
            label={emailLabel}
            placeholder={emailPlaceholder}
          />

          {/* Separator */}
          <Separator />
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="flex items-center justify-end w-full gap-2.5 px-5 pb-5">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-4 py-3.5 text-b-13-14-500 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {cancelButtonText}
            </Button>
          </DialogClose>
          <Button
            onClick={handleExport}
            variant="primary"
            className="px-8 py-3.5 text-b-13-14-500 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            {exportButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


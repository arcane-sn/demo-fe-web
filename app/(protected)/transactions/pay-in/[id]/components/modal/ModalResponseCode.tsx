import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogBody,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ModalResponseCodeProps } from "../../core/_models";
import { DEFAULT_RESPONSE_DATA, MODAL_CONFIG } from "../../core/_consts";

const ModalResponseCode: React.FC<ModalResponseCodeProps> = ({
  isOpen,
  onClose,
  responseData,
  title = MODAL_CONFIG.defaultTitle,
}) => {
  const data = responseData || DEFAULT_RESPONSE_DATA;
  const jsonString = JSON.stringify(data, null, 2);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${MODAL_CONFIG.maxWidth} ${MODAL_CONFIG.maxHeight} overflow-hidden flex flex-col`}
        close={false}
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-5 mb-0 flex-shrink-0">
          <DialogTitle className="text-sm font-semibold text-slate-900">
            {title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="size-8 p-1.5"
          >
            <X className="size-4" />
          </Button>
        </DialogHeader>

        {/* Content */}
        <DialogBody className="py-5 flex flex-col justify-start items-center gap-5 overflow-y-auto flex-1 min-h-0">
          <div className="px-7 flex flex-col justify-center items-center gap-2.5 w-full">
            <pre className="text-xs font-normal text-slate-800 leading-none whitespace-pre-wrap break-words w-full">
              {jsonString}
            </pre>
          </div>

          {/* Separator */}
          <div className="w-full h-px px-5 border border-gray-100" />
        </DialogBody>

          {/* Footer */}
        <DialogFooter className="w-full flex justify-end items-center gap-2.5 flex-shrink-0 border-t border-gray-100 pt-5">
            <Button
              variant="outline"
              size="md"
              onClick={onClose}
            className="bg-white border-zinc-200 text-slate-600 text-xs font-medium"
            >
              Close
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalResponseCode;

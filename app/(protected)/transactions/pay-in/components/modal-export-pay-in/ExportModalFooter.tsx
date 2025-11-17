"use client";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";

interface ExportModalFooterProps {
  onCancel: () => void;
  onExport: () => void;
}

export function ExportModalFooter({
  onCancel,
  onExport,
}: ExportModalFooterProps) {
  return (
    <DialogFooter className="flex items-center justify-end w-full gap-2.5 px-5 pb-5">
      <DialogClose
        onClick={() => onCancel()}
        className="px-4 py-3.5 text-b-13-14-500 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Cancel
      </DialogClose>
      <button
        onClick={onExport}
        className="px-8 py-3.5 text-b-13-14-500 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
      >
        Export and Send
      </button>
    </DialogFooter>
  );
}

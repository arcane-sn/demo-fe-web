"use client";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";

interface ExportModalFooterProps {
  onExport: () => void;
}

export function ExportModalFooter({ onExport }: ExportModalFooterProps) {
  return (
    <DialogFooter className="flex items-center justify-end gap-2.5 px-5 py-5 w-full">
      <DialogClose className="text-b-13-14-500 text-gray-700 py-3.5 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
        Cancel
      </DialogClose>
      <button
        onClick={onExport}
        className="px-8 py-3.5 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors text-b-13-14-500 text-white"
      >
        Export and Send
      </button>
    </DialogFooter>
  );
}

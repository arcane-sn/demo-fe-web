"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

interface ModalFooterProps {
  onReset: () => void;
  onApply: () => void;
}

export function ModalFooter({ onReset, onApply }: ModalFooterProps) {
  return (
    <div className="w-full p-5 flex justify-between">
      {/* Reset Button */}
      <Button variant="destructive-light" onClick={onReset} size="lg">
        Reset to Default
      </Button>

      {/* Cancel and Apply Buttons */}
      <div className="flex items-center gap-2.5">
        <DialogClose>
          <Button variant="outline" size="lg">
            Cancel
          </Button>
        </DialogClose>
        <Button variant="primary" onClick={onApply} size="lg">
          Apply Filter
        </Button>
      </div>
    </div>
  );
}

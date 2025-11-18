"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

interface FilterModalFooterProps {
  onReset?: () => void;
  onApply?: () => void;
  showResetButton?: boolean;
  resetButtonText?: string;
  applyButtonText?: string;
}

export function FilterModalFooter({
  onReset,
  onApply,
  showResetButton = true,
  resetButtonText = "Reset to Default",
  applyButtonText = "Apply Filter",
}: FilterModalFooterProps) {
  return (
    <div className="w-full p-5 flex justify-between">
      {/* Reset Button */}
      {showResetButton && onReset && (
        <Button
          variant="destructive-light"
          onClick={onReset}
          size="lg"
          type="button"
        >
          {resetButtonText}
        </Button>
      )}

      {/* Cancel and Apply Buttons */}
      <div className="flex items-center gap-2.5">
        <DialogClose asChild>
          <Button variant="outline" size="lg" type="button">
            Cancel
          </Button>
        </DialogClose>
        <Button variant="primary" onClick={onApply} size="lg" type="button">
          {applyButtonText}
        </Button>
      </div>
    </div>
  );
}


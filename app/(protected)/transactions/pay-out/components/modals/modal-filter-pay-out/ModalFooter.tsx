"use client";

import { Button } from "@/components/ui/button";

interface ModalFooterProps {
  onReset: () => void;
  onCancel: () => void;
  onApply: () => void;
  isResetDisabled?: boolean;
}

export function ModalFooter({
  onReset,
  onCancel,
  onApply,
  isResetDisabled = false,
}: ModalFooterProps) {
  return (
    <div className="self-stretch  inline-flex justify-between items-center">
      <Button
        variant="destructive-light"
        size="lg"
        onClick={onReset}
        disabled={isResetDisabled}
      >
        Reset to Default
      </Button>
      <div className="flex justify-start items-center gap-2.5">
        <Button variant="outline" size="lg" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" size="lg" onClick={onApply}>
          Apply Filter
        </Button>
      </div>
    </div>
  );
}

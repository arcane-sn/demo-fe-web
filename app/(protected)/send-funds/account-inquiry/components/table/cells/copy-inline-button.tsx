"use client";

import { Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

interface CopyInlineButtonProps {
  value: string;
  label?: string;
  className?: string;
}

export function CopyInlineButton({ value, label, className }: CopyInlineButtonProps) {
  const { copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    if (!value) return;
    copyToClipboard(value);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label ? `Copy ${label}` : "Copy text"}
      className={cn(
        "p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors",
        className,
      )}
    >
      <Copy className="h-3.5 w-3.5" />
    </button>
  );
}


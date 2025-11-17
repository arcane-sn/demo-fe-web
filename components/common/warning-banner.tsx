import React from "react";
import { AlertTriangle, OctagonAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface WarningBannerProps {
  title: string;
  description: string;
  className?: string;
}

export function WarningBanner({
  title,
  description,
  className,
}: WarningBannerProps) {
  return (
    <div
      className={cn(
        "bg-[#FFF8DD] border-2 border-dashed border-[#F6B100] rounded-lg p-4",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 flex items-center justify-center">
            <OctagonAlert className="w-50 h-50 text-[var(--color-warning)] " />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-b-15-16-600 text-[var(--color-gray-800)] mb-2">
            {title}
          </h3>
          <p className="text-b-13-18-500 text-[var(--color-gray-600)]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

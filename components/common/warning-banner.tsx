import React from "react";
import { KeenIcon } from "@/components/keenicons";
import { cn } from "@/lib/utils";

interface WarningBannerProps {
  title: string;
  description?: string;
  className?: string;
  iconColor?: string;
}

export function WarningBanner({
  title,
  description,
  className,
  iconColor = "text-yellow-600",
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
          <KeenIcon
            icon="information-3"
            style="outline"
            className={cn("text-4xl", iconColor)}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-b-15-16-600 text-[var(--color-gray-800)] mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-b-13-18-500 text-[var(--color-gray-600)]">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

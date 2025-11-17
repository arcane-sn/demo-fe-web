"use client";

import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";

export function Breadcrumb() {
  const { breadcrumbItems } = useBreadcrumb();

  if (breadcrumbItems.length === 0) {
    return (
      <div className="flex items-center gap-1.25 text-xs lg:text-sm font-medium lg:mb-0">
        <span className="text-mono">Home</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.25 text-xs lg:text-sm font-medium  lg:mb-0">
      {breadcrumbItems.map((item, index) => {
        const last = index === breadcrumbItems.length - 1;

        return (
          <Fragment key={`breadcrumb-${index}`}>
            <span
              className={cn(
                item.isActive ? "text-mono" : "text-secondary-foreground"
              )}
              key={`item-${index}`}
            >
              {item.title}
            </span>
            {!last && (
              <ChevronRight
                className="size-3.5 text-muted-foreground"
                key={`separator-${index}`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

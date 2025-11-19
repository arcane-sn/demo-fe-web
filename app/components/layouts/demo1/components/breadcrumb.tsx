"use client";

import { Fragment } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";

export function Breadcrumb() {
  const { breadcrumbItems } = useBreadcrumb();

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.25 text-xs lg:text-sm font-medium lg:mb-0">
      {breadcrumbItems.map((item, index) => {
        const last = index === breadcrumbItems.length - 1;
        const isFirst = index === 0;
        const shouldBeClickable = !item.isActive && !isFirst;

        return (
          <Fragment key={`breadcrumb-${index}`}>
            {item.isActive || isFirst ? (
              <span
                className={cn(
                  item.isActive ? "text-mono" : "text-secondary-foreground"
                )}
                key={`item-${index}`}
              >
                {item.title}
              </span>
            ) : (
              <Link
                href={item.path}
                className={cn(
                  "text-secondary-foreground hover:text-primary transition-colors cursor-pointer"
                )}
                key={`item-${index}`}
              >
                {item.title}
              </Link>
            )}
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

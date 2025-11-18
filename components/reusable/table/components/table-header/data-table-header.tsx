"use client";

import { DataTableHeaderProps } from "../../types";

export function DataTableHeader({ title, description, meta }: DataTableHeaderProps) {
  if (!title && !description && !meta) {
    return null;
  }

  return (
    <div className="flex w-full items-start justify-between gap-4">
      <div className="flex flex-col gap-2.5 flex-1">
        {/* Title */}
        {title && (
          <h2 className="text-gray-900 text-xl font-semibold">{title}</h2>
        )}

        {/* Description */}
        {description && (
          <p className="text-b-13-14-400 text-gray-600">{description}</p>
        )}
      </div>

      {/* Meta content (right side) */}
      {meta && (
        <div className="flex shrink-0 items-center gap-3">{meta}</div>
      )}
    </div>
  );
}



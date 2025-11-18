"use client";

import { DataTableEmptyState } from "../../types";
import { Button } from "@/components/ui/button";

export function DataTableEmpty({ emptyState }: { emptyState?: DataTableEmptyState }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      {emptyState?.illustration}
      <div className="flex flex-col gap-1">
        <p className="text-b-15-16-600 text-gray-900">{emptyState?.title ?? "No data found"}</p>
        {emptyState?.description ? (
          <p className="text-b-13-14-400 text-gray-500">{emptyState.description}</p>
        ) : null}
      </div>
      {emptyState?.action ? (
        <Button onClick={emptyState.action.onClick}>{emptyState.action.label}</Button>
      ) : null}
    </div>
  );
}




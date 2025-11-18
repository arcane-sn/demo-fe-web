"use client";

import { CardFooter } from "@/components/ui/card";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataTablePaginationConfig } from "../../types";

interface DataTableFooterProps {
  table: ReturnType<any>;
  pagination?: DataTablePaginationConfig;
  selectedCount?: number;
  totalCount?: number;
}

export function DataTableFooter({
  table,
  pagination,
  selectedCount = 0,
  totalCount = 0,
}: DataTableFooterProps) {
  // Get total count from pagination or table
  const finalTotalCount =
    totalCount || pagination?.totalItems || table.getFilteredRowModel().rows.length || 0;

  return (
    <CardFooter>
      <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
          {/* Row count */}
          <span className="text-sm text-muted-foreground">
            {finalTotalCount} total records
          </span>

          {/* Selected count */}
          {selectedCount > 0 && (
            <span className="text-sm text-muted-foreground">
              {selectedCount} selected
        </span>
          )}
        </div>

        {/* Pagination */}
        <DataGridPagination />
      </div>
    </CardFooter>
  );
}




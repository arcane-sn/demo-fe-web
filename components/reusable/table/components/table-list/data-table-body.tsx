"use client";

import type { Table as TableInstance } from "@tanstack/react-table";
import { CardTable } from "@/components/ui/card";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EmptyState } from "@/components/ui/empty-state";
import { Loader2 } from "lucide-react";
import { DataTableEmptyState, DataTableProps, BaseTableData } from "../../types";
import Image from "next/image";

interface DataTableBodyProps<TData extends BaseTableData = BaseTableData> {
  table: TableInstance<TData>;
  loading?: boolean;
  emptyState?: DataTableEmptyState;
  onRowClick?: DataTableProps<TData>["onRowClick"];
}

export function DataTableBody<TData extends BaseTableData = BaseTableData>({
  table,
  loading,
  emptyState,
  onRowClick,
}: DataTableBodyProps<TData>) {
  const rowModel = table.getRowModel();
  const rows = rowModel.rows;
  const hasData = rows.length > 0;

  if (loading) {
    return (
      <CardTable>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
      </CardTable>
    );
  }

  // Show empty state if no data and empty state config is provided
  if (!hasData && emptyState) {
    // Use custom illustration if filters/search are active
    const customIllustration = emptyState.hasActiveFilters ? (
      <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        <Image
          src="/media/illustrations/33.svg"
          alt="No results found"
          width={96}
          height={96}
          className="w-full h-full object-contain"
          priority={false}
        />
      </div>
    ) : emptyState.illustration;

    return (
      <CardTable>
        <div className="relative">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/assets/image/bg.svg"
              alt="Background"
              fill
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="flex items-center justify-center">
            {renderEmptyState({
              ...emptyState,
              illustration: customIllustration,
            })}
          </div>
        </div>
      </CardTable>
    );
  }

  return (
    <CardTable>
      <ScrollArea>
        <DataGridTable />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </CardTable>
                );
}

// Helper function to render empty state based on configuration
function renderEmptyState(config: DataTableEmptyState) {
                return (
    <EmptyState
      title={config.title || "No Data Available"}
      description={config.description}
      illustration={config.illustration}
      actionLabel={config.action?.label}
      onAction={config.action?.onClick}
    />
  );
}



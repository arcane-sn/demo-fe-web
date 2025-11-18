"use client";

import { useEffect, useMemo, useCallback } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { cn } from "@/lib/utils";
import { KeenIcon } from "@/components/keenicons";
import { X } from "lucide-react";
import { DataTableBody } from "./components/table-list/data-table-body";
import { DataTableFooter } from "./components/table-footer/data-table-footer";
import { DataTableHeader } from "./components/table-header/data-table-header";
import { DataTableToolbar } from "./components/table-header/data-table-toolbar";
import { useDataTable } from "./components/hooks/use-data-table";
import { useTableColumns } from "./components/hooks/use-table-columns";
import type { DataTableProps, BaseTableData } from "./types";

function useSelectionEffect<TData>(
  selectedRowIds: Record<string, boolean>,
  data: TData[],
  rowIdGetter: (row: TData, index: number) => string,
  onSelectionChange?: (rows: TData[]) => void,
) {
  useEffect(() => {
    if (!onSelectionChange) return;
    const selectedRows = data.filter((row, index) => selectedRowIds[rowIdGetter(row, index)]);
    onSelectionChange(selectedRows);
  }, [selectedRowIds, data, onSelectionChange, rowIdGetter]);
}

export function DataTable<TData extends BaseTableData = BaseTableData>({
  data,
  columns,
  header,
  toolbar,
  emptyState,
  pagination,
  enableRowSelection,
  onRowClick,
  onSelectionChange,
  rowId,
  className,
  loading,
  error,
  tableProps,
  actionConfig,
  dataGridOptions,
}: DataTableProps<TData>) {
  // Use useTableColumns hook to add selection and action columns
  const tableColumns = useTableColumns(
    columns,
    actionConfig,
    enableRowSelection
  );

  const controller = useDataTable<TData>({
    data,
    columns: tableColumns,
    enableRowSelection,
    rowId,
    pagination,
  });

  const rowIdGetter = useCallback(
    (row: TData, index: number) => {
    if (typeof rowId === "function") return String(rowId(row));
    if (typeof rowId === "string" || typeof rowId === "number") {
      return String(row[rowId as keyof TData]);
    }
    if ("id" in (row as object)) {
      return String((row as any).id);
    }
    return String(index);
    },
    [rowId],
  );

  useSelectionEffect(
    controller.rowSelection,
    data,
    rowIdGetter,
    onSelectionChange,
  );

  const defaultTableLayout = {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  };

  const mergedDataGridOptions = {
    loadingMode: "skeleton" as const,
    emptyMessage: emptyState?.title || "No data available",
    ...dataGridOptions,
    tableLayout: {
      ...defaultTableLayout,
      ...(dataGridOptions?.tableLayout || {}),
    },
  };

  const selectedCount = Object.keys(controller.rowSelection).filter(
    (key) => controller.rowSelection[key]
  ).length;

  return (
    <DataGrid
      table={controller.table}
      recordCount={data?.length || 0}
      onRowClick={onRowClick}
      isLoading={loading}
      emptyMessage={mergedDataGridOptions.emptyMessage}
      loadingMode={mergedDataGridOptions.loadingMode}
      tableLayout={mergedDataGridOptions.tableLayout}
      tableClassNames={mergedDataGridOptions.tableClassNames}
    >
    <Card className={cn("border-gray-200 shadow-sm", className)} {...tableProps}>
        <CardContent className="flex flex-col gap-0 p-0">
          <div className="flex flex-col gap-4 p-6 pb-7">
            <div
              className={cn(
                "flex flex-col gap-4",
                toolbar ? "md:flex-row md:items-start md:justify-between" : "",
              )}
            >
          <DataTableHeader {...header} />
              {toolbar ? (
                <DataTableToolbar
                  {...toolbar}
                  actions={
                    toolbar.actions?.map((action) => ({
                      ...action,
                      icon:
                        action.id === "filter"
                          ? <KeenIcon icon="filter" className="w-4 h-4 text-gray-600" />
                          : action.id === "export"
                          ? <KeenIcon icon="exit-down" className="w-4 h-4 text-gray-600" />
                          : action.icon,
                    })) || []
                  }
                  table={controller.table}
                  mode="compact"
                  activeFilterCount={toolbar.activeFilterCount}
                  onClearFilters={toolbar.onClearFilters}
                />
              ) : null}
        </div>

            {header?.tags && header.tags.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2.5 pt-0">
                {header.tags.map((tag) => (
                  <div
                    key={tag.id}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-md border px-2.5 py-2 max-w-[200px]",
                      "bg-gray-50 border-gray-300",
                      "text-b-12-12-400",
                    )}
                  >
                    <span className="text-gray-500 font-normal whitespace-nowrap flex-shrink-0">{tag.label}</span>
                    <span className="text-dark font-normal truncate min-w-0" title={tag.value}>{tag.value}</span>
                    {tag.onRemove && (
                      <button
                        type="button"
                        onClick={tag.onRemove}
                        className="ml-1 text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                        aria-label={`Remove ${tag.label} filter`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                    )}
                  </div>
                ))}
              </div>
            ) : null}

        {error ? (
          <div className="rounded-md border border-red-100 bg-red-50 px-4 py-3 text-b-13-14-400 text-red-600">
            {error}
          </div>
        ) : null}
          </div>

        <DataTableBody
          table={controller.table}
          loading={loading}
          emptyState={emptyState}
          onRowClick={onRowClick}
        />
      </CardContent>

        <DataTableFooter
          table={controller.table}
          pagination={pagination}
          selectedCount={selectedCount}
          totalCount={data?.length || 0}
        />
    </Card>
    </DataGrid>
  );
}



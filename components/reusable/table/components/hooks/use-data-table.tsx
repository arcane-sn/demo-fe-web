"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { UseDataTableOptions } from "../../types";

export function useDataTable<TData>({
  data,
  columns,
  enableRowSelection,
  rowId,
  pagination,
}: UseDataTableOptions<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [paginationState, setPaginationState] = useState(() => ({
    pageIndex: (pagination?.page ?? 1) - 1,
    pageSize: pagination?.pageSize ?? pagination?.pageSizeOptions?.[0] ?? 10,
  }));

  useEffect(() => {
    setPaginationState({
      pageIndex: (pagination?.page ?? 1) - 1,
      pageSize: pagination?.pageSize ?? pagination?.pageSizeOptions?.[0] ?? 10,
    });
  }, [pagination?.page, pagination?.pageSize, pagination?.pageSizeOptions]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination: paginationState,
    },
    getRowId: (row, index) => {
      if (typeof rowId === "function") {
        return String(rowId(row));
      }
      if (typeof rowId === "string" || typeof rowId === "number") {
        return String(row[rowId as keyof TData]);
      }
      if ("id" in (row as object)) {
        return String((row as any).id);
      }
      return String(index);
    },
    enableRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPaginationState,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: Boolean(pagination?.onPageChange),
    pageCount: pagination?.totalItems
      ? Math.ceil(
          pagination.totalItems /
            (pagination.pageSize ?? pagination.pageSizeOptions?.[0] ?? paginationState.pageSize),
        )
      : undefined,
  });

  return useMemo(
    () => ({
      table,
      sorting,
      setSorting,
      columnFilters,
      setColumnFilters,
      rowSelection,
      setRowSelection,
    }),
    [table, sorting, columnFilters, rowSelection],
  );
}



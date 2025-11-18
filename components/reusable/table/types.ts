"use client";

import { ComponentProps, ReactNode } from "react";
import { ColumnDef, ColumnFiltersState, SortingState, Row } from "@tanstack/react-table";
import type { DataGridProps } from "@/components/ui/data-grid";

/**
 * Base data interface that can be extended
 */
export interface BaseTableData {
  id: string;
  [key: string]: any;
}

export type DataTableRowId<TData> = string | number | ((row: TData) => string);

export interface DataTableHeaderTag {
  id: string;
  label: string;
  value: string;
  onRemove?: () => void;
}

export interface DataTableHeaderProps {
  title?: string;
  description?: string;
  tags?: DataTableHeaderTag[];
  meta?: ReactNode;
}

export interface DataTableSearchField {
  label: string;
  value: string;
}

export interface DataTableSearchConfig {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  debounceMs?: number;
  fields?: DataTableSearchField[];
  selectedField?: string;
  onFieldChange?: (value: string) => void;
}

export type DataTableActionVariant = "primary" | "secondary" | "outline" | "ghost";

export interface DataTableActionConfig {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: DataTableActionVariant;
}

export interface DataTableToolbarProps {
  search?: DataTableSearchConfig;
  actions?: DataTableActionConfig[];
  extra?: ReactNode;
  showColumnVisibility?: boolean;
  columnVisibilityTrigger?: ReactNode;
  mode?: "default" | "compact";
  activeFilterCount?: number;
  onClearFilters?: () => void;
}

export interface DataTablePaginationConfig {
  pageSizeOptions?: number[];
  totalItems?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface DataTableEmptyState {
  title?: string;
  description?: string;
  illustration?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  hasActiveFilters?: boolean; // Indicates if filters or search are active
}

export interface DataTableProps<TData extends BaseTableData = BaseTableData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  header?: DataTableHeaderProps;
  toolbar?: DataTableToolbarProps;
  emptyState?: DataTableEmptyState;
  pagination?: DataTablePaginationConfig;
  enableRowSelection?: boolean;
  onRowClick?: (row: TData) => void;
  onSelectionChange?: (rows: TData[]) => void;
  rowId?: DataTableRowId<TData>;
  className?: string;
  loading?: boolean;
  error?: ReactNode;
  tableProps?: ComponentProps<"div">;
  actionConfig?: ActionCellConfig<TData>;
  dataGridOptions?: Partial<
    Omit<DataGridProps<TData>, "table" | "children" | "recordCount" | "onRowClick">
  >;
}

export interface UseDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  enableRowSelection?: boolean;
  rowId?: DataTableRowId<TData>;
  pagination?: DataTablePaginationConfig;
}

export interface DataTableState {
  sorting: SortingState;
  setSorting: (updater: SortingState | ((prev: SortingState) => SortingState)) => void;
  columnFilters: ColumnFiltersState;
  setColumnFilters: (
    updater: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)
  ) => void;
  rowSelection: Record<string, boolean>;
  setRowSelection: (
    updater:
      | Record<string, boolean>
      | ((prev: Record<string, boolean>) => Record<string, boolean>)
  ) => void;
}

/**
 * Action cell configuration for table columns
 */
export interface ActionCellConfig<TData extends BaseTableData> {
  actions: Array<{
    label: string;
    icon?: ReactNode;
    variant?:
      | "primary"
      | "mono"
      | "destructive"
      | "secondary"
      | "outline"
      | "dashed"
      | "ghost"
      | "dim"
      | "foreground"
      | "inverse";
    onClick: (row: Row<TData>) => void;
    show?: (row: Row<TData>) => boolean;
  }>;
  showDropdown?: boolean;
  maxVisibleActions?: number;
}





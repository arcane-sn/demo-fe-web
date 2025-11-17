"use client";

import React, { useMemo, useCallback } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataGrid } from "@/components/ui/data-grid";
import { Card } from "@/components/ui/card";
import { ReusableTableProps, BaseTableData, TableFilter } from "./types";
import { useTableState } from "./hooks/use-table-state";
import { useTableColumns } from "./hooks/use-table-columns";
import { TableHeader } from "./components/table-header";
import { TableToolbar } from "./components/table-toolbar";
import { TableBody } from "./components/table-body";
import { TableFooter } from "./components/table-footer";
import { TableFilters } from "./components/table-filters";
import FilterTag from "../ui/filter-tag";

export function ReusableTable<TData extends BaseTableData>({
  config,
  headerConfig,
  toolbarConfig,
  footerConfig,
  actionConfig,
  emptyStateConfig,
  onRowClick,
  onSelectionChange,
  onFilterPressed,
  className,
  loading = false,
  error,
}: ReusableTableProps<TData>) {
  // Use table state management
  const {
    filteredData,
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    searchQuery,
    setSearchQuery,
    searchField,
    setSearchField,
    filters,
    updateFilter,
    clearFilters,
    activeFiltersCount,
    columnVisibility,
    setColumnVisibility,
  } = useTableState(config);

  // Generate columns with actions
  const columns = useTableColumns(
    config.columns,
    actionConfig,
    config.enableRowSelection
  );

  // Stable callback for selection changes
  const handleSelectionChange = useCallback(
    (updater: any) => {
      setRowSelection(updater);

      // Get the new selection state
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;

      // Call onSelectionChange with selected rows
      if (onSelectionChange) {
        // Find selected rows from filtered data
        const selectedRows = Object.keys(newSelection)
          .filter((key) => newSelection[key])
          .map((key) => filteredData.find((item) => String(item.id) === key))
          .filter(Boolean) as TData[];
        onSelectionChange(selectedRows);
      }
    },
    [rowSelection, onSelectionChange, filteredData]
  );

  // Create table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: TData) => String(row.id),
    state: {
      pagination,
      sorting,
      rowSelection,
      columnVisibility,
    },
    columnResizeMode: "onChange",
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: handleSelectionChange,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: config.enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Handle row selection changes - removed useEffect to prevent infinite loop

  // Handle row clicks
  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  // Handle filter button press
  const handleFilterPressed = () => {
    if (onFilterPressed) {
      onFilterPressed();
    } else {
      console.log("Filter button pressed - no callback provided");
    }
  };

  // Get selected count
  const selectedCount = table.getFilteredSelectedRowModel()?.rows?.length || 0;

  // Prepare filters for toolbar
  const toolbarFilters = config.customFilters || [];

  return (
    <div className={className}>
      <DataGrid
        table={table}
        recordCount={filteredData?.length || 0}
        onRowClick={handleRowClick}
        tableLayout={
          config.tableLayout || {
            width: "fixed",
            columnsPinnable: true,
            columnsMovable: true,
            columnsVisibility: true,
            cellBorder: true,
          }
        }
      >
        <Card>
          <div className="flex justify-between items-center px-6 py-4">
            {/* Header - Left side */}
            <div className="flex-1">
              <TableHeader
                config={headerConfig}
                recordCount={filteredData?.length || 0}
                mode={config.searchPosition === "bottom" ? "bottom" : "default"}
                filters={
                  config.searchPosition === "bottom" ? toolbarFilters : []
                }
                activeFiltersCount={
                  config.searchPosition === "bottom" ? activeFiltersCount : 0
                }
                onFilterChange={
                  config.searchPosition === "bottom" ? updateFilter : undefined
                }
                onClearFilters={
                  config.searchPosition === "bottom" ? clearFilters : undefined
                }
                onFilterPressed={
                  config.searchPosition === "bottom"
                    ? handleFilterPressed
                    : undefined
                }
                table={config.searchPosition === "bottom" ? table : undefined}
                toolbarConfig={
                  config.searchPosition === "bottom" ? toolbarConfig : undefined
                }
              />
            </div>

            {/* Toolbar - Right side (only show if searchPosition is not "bottom") */}
            {config.searchPosition !== "bottom" && (
              <div className="flex-shrink-0">
                <TableToolbar
                  config={toolbarConfig}
                  searchQuery={searchQuery}
                  searchField={searchField}
                  onSearchChange={setSearchQuery}
                  onSearchFieldChange={setSearchField}
                  filters={toolbarFilters}
                  activeFiltersCount={activeFiltersCount}
                  onFilterChange={updateFilter}
                  onClearFilters={clearFilters}
                  onFilterPressed={handleFilterPressed}
                  table={table}
                  showSearchBar={config.showSearchBar || false}
                  searchBarPlaceholder={config.searchBarPlaceholder}
                  searchBarOptions={config.searchBarOptions}
                  searchBarPlaceholderMapping={
                    config.searchBarPlaceholderMapping
                  }
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2.5 px-6 pb-3 flex-wrap">
            {toolbarConfig?.filters?.map((filter: TableFilter) => (
              <FilterTag
                key={filter.id}
                label={filter.label}
                value={filter.value || ""}
              />
            ))}
          </div>

          {/* Search Bar - Bottom position (below header) */}
          {config.searchPosition === "bottom" && config.showSearchBar && (
            <div className="px-6 py-4 border-b">
              <TableToolbar
                config={toolbarConfig}
                searchQuery={searchQuery}
                searchField={searchField}
                onSearchChange={setSearchQuery}
                onSearchFieldChange={setSearchField}
                filters={toolbarFilters}
                activeFiltersCount={activeFiltersCount}
                onFilterChange={updateFilter}
                onClearFilters={clearFilters}
                table={table}
                showSearchBar={config.showSearchBar || false}
                searchBarPlaceholder={config.searchBarPlaceholder}
                searchBarOptions={config.searchBarOptions}
                searchBarPlaceholderMapping={config.searchBarPlaceholderMapping}
                mode="bottom"
              />
            </div>
          )}

          {/* Filters */}
          {/* {toolbarConfig?.showFilters !== false && toolbarFilters.length > 0 && (
            <div className="px-6 py-3 border-b">
              <TableFilters
                filters={toolbarFilters}
                activeFilters={filters}
                onFilterChange={updateFilter}
                onClearFilters={clearFilters}
              />
            </div>
          )} */}

          {/* Table Body */}
          <TableBody
            loading={loading}
            error={error}
            emptyStateConfig={emptyStateConfig}
            hasData={filteredData && filteredData.length > 0}
          />

          {/* Footer */}
          <TableFooter
            config={footerConfig}
            selectedCount={selectedCount}
            totalCount={filteredData?.length || 0}
          />
        </Card>
      </DataGrid>
    </div>
  );
}

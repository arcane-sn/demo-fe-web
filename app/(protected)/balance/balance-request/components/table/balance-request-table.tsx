"use client";

import React, { useMemo, useCallback, useState } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { useBalanceRequestTableColumns } from "./balance-request-table-columns";
import { BalanceRequestData } from "../../core/_model";
import { useBalanceRequestFilters } from "./core/hooks/useBalanceRequestFilters";
import { searchFields } from "./config";
import {
  BALANCE_REQUEST_SEARCH_PLACEHOLDER,
  BALANCE_REQUEST_TOOLBAR_ACTIONS,
  BALANCE_REQUEST_PAGE_SIZE,
  BALANCE_REQUEST_PAGE_SIZE_OPTIONS,
  BALANCE_REQUEST_DATE_FILTER_PLACEHOLDER,
  BALANCE_REQUEST_EMPTY_STATE,
  BALANCE_REQUEST_DATE_TYPE_OPTIONS,
  BALANCE_REQUEST_DATA_GRID_OPTIONS,
} from "./core/constants";

interface BalanceRequestTableProps {
  data: BalanceRequestData[];
  onRowClick?: (request: BalanceRequestData) => void;
  onSelectionChange?: (selectedRequests: BalanceRequestData[]) => void;
  loading?: boolean;
  error?: string;
  onOpenExport: () => void;
  onOpenFilter: () => void;
  seeDetail: (row: BalanceRequestData) => void;
  approveRequest: (row: BalanceRequestData) => void;
  rejectRequest: (row: BalanceRequestData) => void;
}

export function BalanceRequestTable({
  data,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
  onOpenExport,
  onOpenFilter,
  seeDetail,
  approveRequest,
  rejectRequest,
}: BalanceRequestTableProps) {
  const [selectedRowForExport, setSelectedRowForExport] =
    useState<BalanceRequestData | null>(null);

  const {
    searchValue,
    setSearchValue,
    searchField,
    setSearchField,
    isFilterOpen,
    setIsFilterOpen,
    isExportOpen,
    setIsExportOpen,
    dateType,
    activeDateFilter,
    selectedStatuses,
    selectedActivityTypes,
    draftDateFilterString,
    setDraftDateFilterString,
    draftDateType,
    setDraftDateType,
    draftDateRange,
    setDraftDateRange,
    filteredData,
    filterSections,
    filterModalKey,
    handleFilterApply,
    handleResetFilters,
    openFilterModal,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveActivityType,
    activeFilterCount,
  } = useBalanceRequestFilters(data);

  const columns = useBalanceRequestTableColumns({
    seeDetail,
    approveRequest,
    rejectRequest,
  });

  const toolbarActions = useMemo(
    () =>
      BALANCE_REQUEST_TOOLBAR_ACTIONS.map((action) => ({
        ...action,
        onClick:
          action.id === "filter"
            ? openFilterModal
            : () => {
                setSelectedRowForExport(null);
                setIsExportOpen(true);
              },
      })),
    [openFilterModal, setIsExportOpen]
  );

  const handleExport = useCallback(
    (format: string, email: string) => {
      if (selectedRowForExport) {
        console.log("Exporting balance request row", {
          format,
          email,
          id: selectedRowForExport.id,
        });
        return;
      }
      console.log("Exporting balance requests table", { format, email });
      if (onOpenExport) {
        onOpenExport();
      }
    },
    [selectedRowForExport, onOpenExport]
  );

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      const dateTypeLabel =
        BALANCE_REQUEST_DATE_TYPE_OPTIONS.find(
          (option) => option.value === dateType
        )?.label ?? BALANCE_REQUEST_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateTypeLabel,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedStatuses.length > 0) {
      tags.push({
        id: "status-filter",
        label: "Status",
        value: selectedStatuses.join(", "),
        onRemove: handleRemoveStatus,
      });
    }
    if (selectedActivityTypes.length > 0) {
      tags.push({
        id: "activity-type-filter",
        label: "Activity Type",
        value: selectedActivityTypes.join(", "),
        onRemove: handleRemoveActivityType,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    dateType,
    selectedStatuses,
    selectedActivityTypes,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveActivityType,
  ]);

  const handleSearchFieldChange = useCallback((value: string) => {
    setSearchField((prev) => {
      if (prev !== value) {
        return value;
      }
      return prev;
    });
  }, []);

  const handleSearchValueChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleDateTypeChange = useCallback((value: string) => {
    setDraftDateType((prev) => {
      if (prev !== value) {
        return value;
      }
      return prev;
    });
  }, []);

  const handleDateChange = useCallback((value: string) => {
    setDraftDateFilterString(value);
  }, []);

  const handleDateRangeChange = useCallback((range: any) => {
    setDraftDateRange(range);
  }, []);

  const handleDateFilterClear = useCallback(() => {
    setDraftDateFilterString("");
    setDraftDateRange(undefined);
  }, []);

  const dateTypeOptionsMemo = useMemo(
    () =>
      BALANCE_REQUEST_DATE_TYPE_OPTIONS.map((option) => ({
        label: option.label,
        value: option.value,
      })),
    []
  );

  const searchFieldsMemo = useMemo(() => searchFields, []);

  return (
    <>
      <DataTable<BalanceRequestData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Balance Requests",
          description: "View and review submitted balance requests",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: BALANCE_REQUEST_SEARCH_PLACEHOLDER,
            value: searchValue,
            onChange: handleSearchValueChange,
            fields: searchFieldsMemo,
            selectedField: searchField,
            onFieldChange: handleSearchFieldChange,
          },
          actions: toolbarActions,
          showColumnVisibility: true,
          activeFilterCount,
          onClearFilters: handleResetFilters,
        }}
        emptyState={{
          title:
            activeFilterCount > 0 || searchValue.trim()
              ? BALANCE_REQUEST_EMPTY_STATE.filteredTitle
              : BALANCE_REQUEST_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? BALANCE_REQUEST_EMPTY_STATE.filteredDescription
              : BALANCE_REQUEST_EMPTY_STATE.defaultDescription,
          hasActiveFilters:
            activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: BALANCE_REQUEST_PAGE_SIZE,
          pageSizeOptions: [...BALANCE_REQUEST_PAGE_SIZE_OPTIONS],
        }}
        loading={loading}
        error={error ?? undefined}
        enableRowSelection={false}
        onRowClick={onRowClick}
      />

      <FilterModal
        key={filterModalKey}
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        dateFilter={{
          value: draftDateFilterString,
          dateType: draftDateType,
          onDateChange: handleDateChange,
          onDateTypeChange: handleDateTypeChange,
          onDateRangeChange: handleDateRangeChange,
          onClear: handleDateFilterClear,
          placeholder: BALANCE_REQUEST_DATE_FILTER_PLACEHOLDER,
          presetDisplayValue: "01/12/2025 - 31/12/2025",
          dateTypeOptions: dateTypeOptionsMemo,
        }}
        sections={filterSections}
        onReset={handleResetFilters}
        onApply={handleFilterApply}
      />

      <ExportModal
        open={isExportOpen}
        onOpenChange={(open) => {
          setIsExportOpen(open);
          if (!open) {
            setSelectedRowForExport(null);
          }
        }}
        title={selectedRowForExport ? "Export Balance Request" : "Export"}
        description={
          selectedRowForExport
            ? `Balance Request ${selectedRowForExport.merchantName} (${selectedRowForExport.status.label})`
            : undefined
        }
        onExport={handleExport}
      />
    </>
  );
}

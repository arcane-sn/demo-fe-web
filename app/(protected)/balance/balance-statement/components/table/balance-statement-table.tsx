"use client";

import React, { useMemo, useCallback, useState } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { useBalanceStatementTableColumns } from "./balance-statement-table-columns";
import { BalanceStatementData } from "../../core/_model";
import { useBalanceStatementFilters } from "./core/hooks/useBalanceStatementFilters";
import { searchFields } from "./config";
import {
  BALANCE_STATEMENT_SEARCH_PLACEHOLDER,
  BALANCE_STATEMENT_TOOLBAR_ACTIONS,
  BALANCE_STATEMENT_PAGE_SIZE,
  BALANCE_STATEMENT_PAGE_SIZE_OPTIONS,
  BALANCE_STATEMENT_DATE_FILTER_PLACEHOLDER,
  BALANCE_STATEMENT_EMPTY_STATE,
  BALANCE_STATEMENT_DATE_TYPE_OPTIONS,
} from "./core/constants";

interface BalanceStatementTableProps {
  data: BalanceStatementData[];
  onRowClick?: (transaction: BalanceStatementData) => void;
  onSelectionChange?: (selectedTransactions: BalanceStatementData[]) => void;
  loading?: boolean;
  error?: string;
  onOpenFilters: () => void;
  onOpenExport: () => void;
}

export function BalanceStatementTable({
  data,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
  onOpenFilters,
  onOpenExport,
}: BalanceStatementTableProps) {
  const [selectedRowForExport, setSelectedRowForExport] =
    useState<BalanceStatementData | null>(null);

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
    selectedTransactionTypes,
    selectedStatuses,
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
    handleRemoveTransactionType,
    handleRemoveStatus,
    activeFilterCount,
  } = useBalanceStatementFilters(data);

  const columns = useBalanceStatementTableColumns();

  const toolbarActions = useMemo(
    () =>
      BALANCE_STATEMENT_TOOLBAR_ACTIONS.map((action) => ({
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
        console.log("Exporting balance statement row", {
          format,
          email,
          id: selectedRowForExport.id,
        });
        return;
      }
      console.log("Exporting balance statements table", { format, email });
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
        BALANCE_STATEMENT_DATE_TYPE_OPTIONS.find(
          (option) => option.value === dateType
        )?.label ?? BALANCE_STATEMENT_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateTypeLabel,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedTransactionTypes.length > 0) {
      tags.push({
        id: "transaction-type-filter",
        label: "Transaction Type",
        value: selectedTransactionTypes.join(", "),
        onRemove: handleRemoveTransactionType,
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
    return tags;
  }, [
    activeDateFilter,
    dateType,
    selectedTransactionTypes,
    selectedStatuses,
    handleRemoveDate,
    handleRemoveTransactionType,
    handleRemoveStatus,
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
      BALANCE_STATEMENT_DATE_TYPE_OPTIONS.map((option) => ({
        label: option.label,
        value: option.value,
      })),
    []
  );

  const searchFieldsMemo = useMemo(() => searchFields, []);

  return (
    <>
      <DataTable<BalanceStatementData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Balance Statement",
          description: "View all balance activities",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: BALANCE_STATEMENT_SEARCH_PLACEHOLDER,
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
              ? BALANCE_STATEMENT_EMPTY_STATE.filteredTitle
              : BALANCE_STATEMENT_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? BALANCE_STATEMENT_EMPTY_STATE.filteredDescription
              : BALANCE_STATEMENT_EMPTY_STATE.defaultDescription,
          hasActiveFilters:
            activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: BALANCE_STATEMENT_PAGE_SIZE,
          pageSizeOptions: [...BALANCE_STATEMENT_PAGE_SIZE_OPTIONS],
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
          placeholder: BALANCE_STATEMENT_DATE_FILTER_PLACEHOLDER,
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
        title={selectedRowForExport ? "Export Balance Statement" : "Export"}
        description={
          selectedRowForExport
            ? `Balance Statement ${selectedRowForExport.referenceNumber} (${selectedRowForExport.status.label})`
            : undefined
        }
        onExport={handleExport}
      />
    </>
  );
}

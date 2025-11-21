"use client";

import React, { useMemo, useCallback, useState } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { useMerchantBalanceTableColumns } from "./merchant-balance-table-columns";
import { MerchantBalanceData } from "../../core/_model";
import { useMerchantBalanceFilters } from "./core/hooks/useMerchantBalanceFilters";
import { searchFields } from "./config";
import {
  MERCHANT_BALANCE_SEARCH_PLACEHOLDER,
  MERCHANT_BALANCE_TOOLBAR_ACTIONS,
  MERCHANT_BALANCE_PAGE_SIZE,
  MERCHANT_BALANCE_PAGE_SIZE_OPTIONS,
  MERCHANT_BALANCE_DATE_FILTER_PLACEHOLDER,
  MERCHANT_BALANCE_EMPTY_STATE,
  MERCHANT_BALANCE_DATE_TYPE_OPTIONS,
} from "./core/constants";

interface MerchantBalanceTableProps {
  data: MerchantBalanceData[];
  topUpBalance?: (merchant: MerchantBalanceData) => void;
  balanceAdjustment?: (merchant: MerchantBalanceData) => void;
  releaseBalance?: (merchant: MerchantBalanceData) => void;
  holdBalance?: (merchant: MerchantBalanceData) => void;
  onRowClick?: (merchant: MerchantBalanceData) => void;
  onSelectionChange?: (selectedMerchants: MerchantBalanceData[]) => void;
  loading?: boolean;
  error?: string;
  onOpenExport: () => void;
}

export function MerchantBalanceTable({
  data,
  topUpBalance,
  balanceAdjustment,
  releaseBalance,
  holdBalance,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
  onOpenExport,
}: MerchantBalanceTableProps) {
  const [selectedRowForExport, setSelectedRowForExport] =
    useState<MerchantBalanceData | null>(null);

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
    selectedMerchantLevels,
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
    handleRemoveMerchantLevel,
    handleRemoveStatus,
    activeFilterCount,
  } = useMerchantBalanceFilters(data);

  const columns = useMerchantBalanceTableColumns({
    topUpBalance,
    balanceAdjustment,
    releaseBalance,
    holdBalance,
  });

  const toolbarActions = useMemo(
    () =>
      MERCHANT_BALANCE_TOOLBAR_ACTIONS.map((action) => ({
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
        console.log("Exporting merchant balance row", {
          format,
          email,
          id: selectedRowForExport.id,
        });
        return;
      }
      console.log("Exporting merchant balances table", { format, email });
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
        MERCHANT_BALANCE_DATE_TYPE_OPTIONS.find(
          (option) => option.value === dateType
        )?.label ?? MERCHANT_BALANCE_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateTypeLabel,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedMerchantLevels.length > 0) {
      tags.push({
        id: "merchant-level-filter",
        label: "Merchant Level",
        value: selectedMerchantLevels.join(", "),
        onRemove: handleRemoveMerchantLevel,
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
    selectedMerchantLevels,
    selectedStatuses,
    handleRemoveDate,
    handleRemoveMerchantLevel,
    handleRemoveStatus,
  ]);

  const handleSearchFieldChange = useCallback(
    (value: string) => {
      setSearchField((prev) => {
        if (prev !== value) {
          return value;
        }
        return prev;
      });
    },
    []
  );

  const handleSearchValueChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleDateTypeChange = useCallback(
    (value: string) => {
      setDraftDateType((prev) => {
        if (prev !== value) {
          return value;
        }
        return prev;
      });
    },
    []
  );

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
      MERCHANT_BALANCE_DATE_TYPE_OPTIONS.map((option) => ({
        label: option.label,
        value: option.value,
      })),
    []
  );

  const searchFieldsMemo = useMemo(() => searchFields, []);

  return (
    <>
      <DataTable<MerchantBalanceData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Merchant Balance Summary",
          description: "View summary of all merchant balance",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: MERCHANT_BALANCE_SEARCH_PLACEHOLDER,
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
              ? MERCHANT_BALANCE_EMPTY_STATE.filteredTitle
              : MERCHANT_BALANCE_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? MERCHANT_BALANCE_EMPTY_STATE.filteredDescription
              : MERCHANT_BALANCE_EMPTY_STATE.defaultDescription,
          hasActiveFilters:
            activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: MERCHANT_BALANCE_PAGE_SIZE,
          pageSizeOptions: [...MERCHANT_BALANCE_PAGE_SIZE_OPTIONS],
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
          placeholder: MERCHANT_BALANCE_DATE_FILTER_PLACEHOLDER,
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
        title={selectedRowForExport ? "Export Merchant Balance" : "Export"}
        description={
          selectedRowForExport
            ? `Merchant Balance ${selectedRowForExport.merchantName} (${selectedRowForExport.status.label})`
            : undefined
        }
        onExport={handleExport}
      />
    </>
  );
}

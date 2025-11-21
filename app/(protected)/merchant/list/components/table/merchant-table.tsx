"use client";

import { useMemo, useCallback } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { MerchantData } from "../../../types/merchant";
import { useMerchantTableColumns } from "./merchant-table-columns";
import { useMerchantListFilters } from "./hooks/useMerchantListFilters";
import {
  MERCHANT_LIST_SEARCH_FIELDS,
  MERCHANT_LIST_SEARCH_PLACEHOLDER,
  MERCHANT_LIST_TOOLBAR_ACTIONS,
  MERCHANT_LIST_EMPTY_STATE,
  MERCHANT_LIST_PAGE_SIZE,
  MERCHANT_LIST_PAGE_SIZE_OPTIONS,
  MERCHANT_LIST_DATA_GRID_OPTIONS,
  MERCHANT_LIST_DATE_TYPE_OPTIONS,
  MERCHANT_LIST_DATE_FILTER_PLACEHOLDER,
  MERCHANT_LIST_FILTER_LABELS,
  MERCHANT_LIST_LEVEL_OPTIONS,
  MERCHANT_LIST_PRODUCTION_STATUS_OPTIONS,
  MERCHANT_LIST_SANDBOX_STATUS_OPTIONS,
} from "../../core/constants";

interface MerchantTableProps {
  data: MerchantData[];
  onView?: (merchant: MerchantData) => void;
  onEdit?: (merchant: MerchantData) => void;
  onDelete?: (merchant: MerchantData) => void;
  onDeactivateProduction?: (merchant: MerchantData) => void;
  onDeactivateSandbox?: (merchant: MerchantData) => void;
  onCreate?: () => void;
  onRowClick?: (merchant: MerchantData) => void;
  onSelectionChange?: (selectedMerchants: MerchantData[]) => void;
  loading?: boolean;
  error?: string;
}

export function MerchantTable({
  data,
  onView,
  onEdit,
  onDelete,
  onDeactivateProduction,
  onDeactivateSandbox,
  onCreate,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
}: MerchantTableProps) {
  const {
    searchValue,
    setSearchValue,
    searchField,
    setSearchField,
    isFilterOpen,
    setIsFilterOpen,
    isExportOpen,
    setIsExportOpen,
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
    handleRemoveLevels,
    handleRemoveProductionStatus,
    handleRemoveSandboxStatus,
    activeDateFilter,
    selectedLevels,
    selectedProductionStatuses,
    selectedSandboxStatuses,
    dateType,
    activeFilterCount,
  } = useMerchantListFilters(data);

  const columns = useMerchantTableColumns({
    onView,
    onEdit,
    onDeactivateProduction,
    onDeactivateSandbox,
    onDelete,
  });

  const toolbarActions = useMemo(
    () =>
      MERCHANT_LIST_TOOLBAR_ACTIONS.map((action) => ({
        ...action,
        onClick:
          action.id === "filter"
            ? openFilterModal
            : () => {
                setIsExportOpen(true);
              },
      })),
    [openFilterModal, setIsExportOpen],
  );

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      const dateLabel =
        MERCHANT_LIST_DATE_TYPE_OPTIONS.find((option) => option.value === dateType)
          ?.label ?? MERCHANT_LIST_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateLabel,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedLevels.length > 0) {
      const labels = MERCHANT_LIST_LEVEL_OPTIONS.filter((option) =>
        selectedLevels.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "merchant-level-filter",
        label: MERCHANT_LIST_FILTER_LABELS.MERCHANT_LEVEL,
        value: labels.join(", "),
        onRemove: handleRemoveLevels,
      });
    }
    if (selectedProductionStatuses.length > 0) {
      const labels = MERCHANT_LIST_PRODUCTION_STATUS_OPTIONS.filter((option) =>
        selectedProductionStatuses.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "production-status-filter",
        label: MERCHANT_LIST_FILTER_LABELS.PRODUCTION_STATUS,
        value: labels.join(", "),
        onRemove: handleRemoveProductionStatus,
      });
    }
    if (selectedSandboxStatuses.length > 0) {
      const labels = MERCHANT_LIST_SANDBOX_STATUS_OPTIONS.filter((option) =>
        selectedSandboxStatuses.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "sandbox-status-filter",
        label: MERCHANT_LIST_FILTER_LABELS.SANDBOX_STATUS,
        value: labels.join(", "),
        onRemove: handleRemoveSandboxStatus,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    dateType,
    handleRemoveDate,
    handleRemoveLevels,
    handleRemoveProductionStatus,
    handleRemoveSandboxStatus,
    selectedLevels,
    selectedProductionStatuses,
    selectedSandboxStatuses,
  ]);

  const handleExport = useCallback((format: string, email: string) => {
    console.log("Export merchant list", { format, email });
  }, []);

  return (
    <>
      <DataTable<MerchantData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Merchant List",
          description: "View and manage all registered merchants",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: MERCHANT_LIST_SEARCH_PLACEHOLDER,
            value: searchValue,
            onChange: setSearchValue,
            fields: [...MERCHANT_LIST_SEARCH_FIELDS],
            selectedField: searchField,
            onFieldChange: setSearchField,
          },
          actions: toolbarActions,
          showColumnVisibility: true,
          activeFilterCount,
          onClearFilters: handleResetFilters,
        }}
        emptyState={{
          title:
            activeFilterCount > 0 || searchValue.trim()
              ? MERCHANT_LIST_EMPTY_STATE.filteredTitle
              : MERCHANT_LIST_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? MERCHANT_LIST_EMPTY_STATE.filteredDescription
              : MERCHANT_LIST_EMPTY_STATE.defaultDescription,
          action: onCreate
            ? {
                label: "Add Merchant",
                onClick: onCreate,
              }
            : undefined,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: MERCHANT_LIST_PAGE_SIZE,
          pageSizeOptions: [...MERCHANT_LIST_PAGE_SIZE_OPTIONS],
        }}
        enableRowSelection={Boolean(onSelectionChange)}
        onSelectionChange={onSelectionChange}
        onRowClick={onRowClick}
        loading={loading}
        error={error}
        dataGridOptions={MERCHANT_LIST_DATA_GRID_OPTIONS}
      />

      <FilterModal
        key={filterModalKey}
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        dateFilter={{
          value: draftDateFilterString,
          dateType: draftDateType,
          dateRange: draftDateRange,
          onDateChange: setDraftDateFilterString,
          onDateTypeChange: setDraftDateType,
          onDateRangeChange: setDraftDateRange,
          onClear: () => {
            setDraftDateFilterString("");
            setDraftDateRange(undefined);
          },
          placeholder: MERCHANT_LIST_DATE_FILTER_PLACEHOLDER,
          presetDisplayValue:
            draftDateFilterString || MERCHANT_LIST_DATE_FILTER_PLACEHOLDER,
          dateTypeOptions: MERCHANT_LIST_DATE_TYPE_OPTIONS.map((option) => ({
            label: option.label,
            value: option.value,
          })),
        }}
        sections={filterSections}
        onReset={handleResetFilters}
        onApply={handleFilterApply}
      />

      <ExportModal
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        title="Export Merchants"
        description="Download the latest merchant list"
        onExport={handleExport}
      />
    </>
  );
}
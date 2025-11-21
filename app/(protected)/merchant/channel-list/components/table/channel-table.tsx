"use client";

import { useMemo, useCallback } from "react";
import type { CheckboxOption } from "@/components/reusable/CheckboxList";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { ChannelData } from "../../../types/channel";
import { useChannelTableColumns } from "./channel-table-columns";
import { useChannelListFilters } from "./hooks/useChannelListFilters";
import {
  CHANNEL_LIST_SEARCH_FIELDS,
  CHANNEL_LIST_SEARCH_PLACEHOLDER,
  CHANNEL_LIST_TOOLBAR_ACTIONS,
  CHANNEL_LIST_EMPTY_STATE,
  CHANNEL_LIST_PAGE_SIZE,
  CHANNEL_LIST_PAGE_SIZE_OPTIONS,
  CHANNEL_LIST_DATA_GRID_OPTIONS,
  CHANNEL_LIST_DATE_TYPE_OPTIONS,
  CHANNEL_LIST_DATE_FILTER_PLACEHOLDER,
  CHANNEL_LIST_DATE_RANGE_PLACEHOLDER,
  CHANNEL_LIST_FILTER_LABELS,
  CHANNEL_LIST_STATUS_OPTIONS,
  CHANNEL_LIST_PAYMENT_METHOD_OPTIONS,
  CHANNEL_LIST_PROVIDER_OPTIONS,
  CHANNEL_LIST_PRICE_TYPE_OPTIONS,
} from "../../core/constants";

const PAYMENT_METHOD_LABEL_MAP = (() => {
  const map = new Map<string, string>();
  const traverse = (options: readonly CheckboxOption[]) => {
    options.forEach((option) => {
      map.set(option.id, option.label);
      if (option.children) {
          traverse(option.children);
      }
    });
  };
  traverse(CHANNEL_LIST_PAYMENT_METHOD_OPTIONS);
  return map;
})();

interface ChannelTableProps {
  data: ChannelData[];
  onView?: (channel: ChannelData) => void;
  onEdit?: (channel: ChannelData) => void;
  onDelete?: (channel: ChannelData) => void;
  onCreate?: () => void;
  onExport?: (data: ChannelData[]) => void;
  onRowClick?: (channel: ChannelData) => void;
  onSelectionChange?: (selectedChannels: ChannelData[]) => void;
  loading?: boolean;
  error?: string;
}

export function ChannelTable({
  data,
  onView,
  onEdit,
  onDelete,
  onCreate,
  onExport,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
}: ChannelTableProps) {
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
    handleRemoveStatus,
    handleRemovePaymentMethod,
    handleRemoveProvider,
    handleRemoveMdrPriceType,
    handleRemoveSalesPriceType,
    handleRemoveMerchantPriceType,
    activeDateFilter,
    selectedStatuses,
    selectedPaymentMethods,
    selectedProviders,
    selectedMdrPriceTypes,
    selectedSalesPriceTypes,
    selectedMerchantPriceTypes,
    dateType,
    activeFilterCount,
  } = useChannelListFilters(data);

  const columns = useChannelTableColumns(onEdit);

  const toolbarActions = useMemo(
    () =>
      CHANNEL_LIST_TOOLBAR_ACTIONS.map((action) => ({
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
      const label =
        CHANNEL_LIST_DATE_TYPE_OPTIONS.find((option) => option.value === dateType)
          ?.label ?? CHANNEL_LIST_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedStatuses.length > 0) {
      const labels = CHANNEL_LIST_STATUS_OPTIONS.filter((option) =>
        selectedStatuses.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "status-filter",
        label: CHANNEL_LIST_FILTER_LABELS.STATUS,
        value: labels.join(", "),
        onRemove: handleRemoveStatus,
      });
    }
    if (selectedPaymentMethods.length > 0) {
      const labels = selectedPaymentMethods
        .map((id) => PAYMENT_METHOD_LABEL_MAP.get(id))
        .filter(Boolean) as string[];
      tags.push({
        id: "payment-method-filter",
        label: CHANNEL_LIST_FILTER_LABELS.PAYMENT_METHOD,
        value: labels.join(", "),
        onRemove: handleRemovePaymentMethod,
      });
    }
    if (selectedProviders.length > 0) {
      const labels = CHANNEL_LIST_PROVIDER_OPTIONS.filter((option) =>
        selectedProviders.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "provider-filter",
        label: CHANNEL_LIST_FILTER_LABELS.PROVIDER,
        value: labels.join(", "),
        onRemove: handleRemoveProvider,
      });
    }
    if (selectedMdrPriceTypes.length > 0) {
      const labels = CHANNEL_LIST_PRICE_TYPE_OPTIONS.filter((option) =>
        selectedMdrPriceTypes.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "mdr-price-type-filter",
        label: CHANNEL_LIST_FILTER_LABELS.MDR_PRICE_TYPE,
        value: labels.join(", "),
        onRemove: handleRemoveMdrPriceType,
      });
    }
    if (selectedSalesPriceTypes.length > 0) {
      const labels = CHANNEL_LIST_PRICE_TYPE_OPTIONS.filter((option) =>
        selectedSalesPriceTypes.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "sales-price-type-filter",
        label: CHANNEL_LIST_FILTER_LABELS.SALES_PRICE_TYPE,
        value: labels.join(", "),
        onRemove: handleRemoveSalesPriceType,
      });
    }
    if (selectedMerchantPriceTypes.length > 0) {
      const labels = CHANNEL_LIST_PRICE_TYPE_OPTIONS.filter((option) =>
        selectedMerchantPriceTypes.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "merchant-price-type-filter",
        label: CHANNEL_LIST_FILTER_LABELS.MERCHANT_PRICE_TYPE,
        value: labels.join(", "),
        onRemove: handleRemoveMerchantPriceType,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    dateType,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemovePaymentMethod,
    handleRemoveProvider,
    handleRemoveMdrPriceType,
    handleRemoveSalesPriceType,
    handleRemoveMerchantPriceType,
    selectedStatuses,
    selectedPaymentMethods,
    selectedProviders,
    selectedMdrPriceTypes,
    selectedSalesPriceTypes,
    selectedMerchantPriceTypes,
  ]);

  const handleExport = useCallback(
    (format: string, email: string) => {
      console.log("Export channel list", { format, email });
      onExport?.(filteredData);
    },
    [filteredData, onExport],
  );

  const rowClickHandler = onRowClick ?? onView;

  return (
    <>
      <DataTable<ChannelData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Channel List",
          description: "Monitor and manage merchant channels",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: CHANNEL_LIST_SEARCH_PLACEHOLDER,
            value: searchValue,
            onChange: setSearchValue,
            fields: [...CHANNEL_LIST_SEARCH_FIELDS],
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
              ? CHANNEL_LIST_EMPTY_STATE.filteredTitle
              : CHANNEL_LIST_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? CHANNEL_LIST_EMPTY_STATE.filteredDescription
              : CHANNEL_LIST_EMPTY_STATE.defaultDescription,
          action: onCreate
            ? {
                label: "Add New Channel",
                onClick: onCreate,
              }
            : undefined,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: CHANNEL_LIST_PAGE_SIZE,
          pageSizeOptions: [...CHANNEL_LIST_PAGE_SIZE_OPTIONS],
        }}
        enableRowSelection={Boolean(onSelectionChange)}
        onSelectionChange={onSelectionChange}
        onRowClick={rowClickHandler}
        loading={loading}
        error={error}
        dataGridOptions={CHANNEL_LIST_DATA_GRID_OPTIONS}
      />

      <FilterModal
        key={filterModalKey}
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        dateFilter={{
          label: "Date Filter",
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
          placeholder: CHANNEL_LIST_DATE_RANGE_PLACEHOLDER,
          presetDisplayValue:
            draftDateFilterString || CHANNEL_LIST_DATE_RANGE_PLACEHOLDER,
          dateTypeOptions: CHANNEL_LIST_DATE_TYPE_OPTIONS.map((option) => ({
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
        title="Export Channels"
        description="Download the latest channel list data"
        onExport={handleExport}
      />
    </>
  );
}

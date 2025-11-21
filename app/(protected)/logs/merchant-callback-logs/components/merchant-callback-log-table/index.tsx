"use client";

import { useMemo, useState, useCallback } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { useMerchantCallbackLogTableColumns } from "./merchant-callback-log-table-columns";
import { searchFields } from "./config";
import { useMerchantCallbackLogFilters } from "./core/hooks/useMerchantCallbackLogFilters";
import { ResendCallbackModal } from "../modal/resend-callback-modal";
import { ResponseDetailModal } from "../modal/response-detail-modal";
import {
  MERCHANT_CALLBACK_LOG_SEARCH_PLACEHOLDER,
  MERCHANT_CALLBACK_LOG_TOOLBAR_ACTIONS,
  MERCHANT_CALLBACK_LOG_DATA_GRID_OPTIONS,
  MERCHANT_CALLBACK_LOG_PAGE_SIZE,
  MERCHANT_CALLBACK_LOG_PAGE_SIZE_OPTIONS,
  MERCHANT_CALLBACK_LOG_DATE_FILTER_PLACEHOLDER,
  MERCHANT_CALLBACK_LOG_EMPTY_STATE,
  MERCHANT_CALLBACK_LOG_STATUS_OPTIONS,
  MERCHANT_CALLBACK_LOG_FILTER_LABELS,
  MERCHANT_CALLBACK_LOG_DATE_TYPE_OPTIONS,
} from "../../core/constants";
import { MerchantCallbackLogData } from "../../core/types";

interface MerchantCallbackLogTableProps {
  data: MerchantCallbackLogData[];
  loading?: boolean;
  error?: string | null;
}

export function MerchantCallbackLogTable({
  data,
  loading = false,
  error,
}: MerchantCallbackLogTableProps) {
  const [selectedRowForExport, setSelectedRowForExport] =
    useState<MerchantCallbackLogData | null>(null);
  const [selectedRowForResend, setSelectedRowForResend] =
    useState<MerchantCallbackLogData | null>(null);
  const [selectedRowForDetail, setSelectedRowForDetail] =
    useState<MerchantCallbackLogData | null>(null);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
    activeFilterCount,
    selectedStatuses,
    dateType,
    activeDateFilter,
  } = useMerchantCallbackLogFilters(data);

  const handleResendCallback = useCallback((row: MerchantCallbackLogData) => {
    setSelectedRowForResend(row);
    setIsResendModalOpen(true);
  }, []);

  const handleSeeResponseDetail = useCallback(
    (row: MerchantCallbackLogData) => {
      setSelectedRowForDetail(row);
      setIsDetailModalOpen(true);
    },
    []
  );

  const columns = useMerchantCallbackLogTableColumns(
    handleResendCallback,
    handleSeeResponseDetail
  );

  const toolbarActions = useMemo(
    () =>
      MERCHANT_CALLBACK_LOG_TOOLBAR_ACTIONS.map((action) => ({
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
        console.log("Exporting merchant callback log row", {
          format,
          email,
          id: selectedRowForExport.id,
        });
        return;
      }
      console.log("Exporting merchant callback logs table", {
        format,
        email,
      });
    },
    [selectedRowForExport]
  );

  const dateTypeOptionsMemo = useMemo(
    () =>
      MERCHANT_CALLBACK_LOG_DATE_TYPE_OPTIONS.map((option) => ({
        label: option.label,
        value: option.value,
      })),
    []
  );

  const searchFieldsMemo = useMemo(() => searchFields, []);

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      const dateTypeLabel =
        MERCHANT_CALLBACK_LOG_DATE_TYPE_OPTIONS.find(
          (option) => option.value === dateType
        )?.label ?? MERCHANT_CALLBACK_LOG_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateTypeLabel,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedStatuses.length > 0) {
      const statusLabels = selectedStatuses.map((status) => {
        const option = MERCHANT_CALLBACK_LOG_STATUS_OPTIONS.find(
          (opt) => opt.value === status
        );
        return option?.label || status;
      });
      tags.push({
        id: "status-filter",
        label: MERCHANT_CALLBACK_LOG_FILTER_LABELS.STATUS,
        value: statusLabels.join(", "),
        onRemove: handleRemoveStatus,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    selectedStatuses,
    handleRemoveDate,
    handleRemoveStatus,
    dateType,
  ]);

  const handleDateFilterClear = useCallback(() => {
    setDraftDateFilterString("");
    setDraftDateRange(undefined);
  }, []);

  const handleDateTypeChange = useCallback((value: string) => {
    // Only update if the value actually changed to prevent infinite loops
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

  const handleSearchFieldChange = useCallback((value: string) => {
    // Only update if the value actually changed to prevent infinite loops
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

  return (
    <>
      <DataTable<MerchantCallbackLogData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Callback Logs",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: MERCHANT_CALLBACK_LOG_SEARCH_PLACEHOLDER,
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
              ? MERCHANT_CALLBACK_LOG_EMPTY_STATE.filteredTitle
              : MERCHANT_CALLBACK_LOG_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? MERCHANT_CALLBACK_LOG_EMPTY_STATE.filteredDescription
              : MERCHANT_CALLBACK_LOG_EMPTY_STATE.defaultDescription,
          hasActiveFilters:
            activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: MERCHANT_CALLBACK_LOG_PAGE_SIZE,
          pageSizeOptions: [...MERCHANT_CALLBACK_LOG_PAGE_SIZE_OPTIONS],
        }}
        dataGridOptions={MERCHANT_CALLBACK_LOG_DATA_GRID_OPTIONS}
        loading={loading}
        error={error ?? undefined}
        enableRowSelection={false}
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
          placeholder: MERCHANT_CALLBACK_LOG_DATE_FILTER_PLACEHOLDER,
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
        title={selectedRowForExport ? "Export Callback Log" : "Export"}
        description={
          selectedRowForExport
            ? `Callback Log ${selectedRowForExport.referenceNumber} (${selectedRowForExport.status})`
            : undefined
        }
        onExport={handleExport}
      />

      <ResendCallbackModal
        open={isResendModalOpen}
        onOpenChange={(open) => {
          setIsResendModalOpen(open);
          if (!open) {
            setSelectedRowForResend(null);
          }
        }}
        data={selectedRowForResend}
      />

      <ResponseDetailModal
        open={isDetailModalOpen}
        onOpenChange={(open) => {
          setIsDetailModalOpen(open);
          if (!open) {
            setSelectedRowForDetail(null);
          }
        }}
        data={selectedRowForDetail}
      />
    </>
  );
}

export default MerchantCallbackLogTable;

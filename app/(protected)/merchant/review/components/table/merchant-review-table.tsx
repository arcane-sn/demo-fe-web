"use client";

import { useMemo, useCallback } from "react";
import { Eye, CheckCircle, XCircle, FileText } from "lucide-react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { MerchantReviewData } from "../../core";
import { useMerchantReviewTableColumns } from "./merchant-review-table-columns";
import { useMerchantReviewTableFilters } from "./hooks/useMerchantReviewTableFilters";
import {
  MERCHANT_REVIEW_SEARCH_FIELDS,
  MERCHANT_REVIEW_SEARCH_PLACEHOLDER,
  MERCHANT_REVIEW_TOOLBAR_ACTIONS,
  MERCHANT_REVIEW_EMPTY_STATE,
  MERCHANT_REVIEW_PAGE_SIZE,
  MERCHANT_REVIEW_PAGE_SIZE_OPTIONS,
  MERCHANT_REVIEW_DATA_GRID_OPTIONS,
  MERCHANT_REVIEW_DATE_TYPE_OPTIONS,
  MERCHANT_REVIEW_DATE_FILTER_PLACEHOLDER,
  MERCHANT_REVIEW_FILTER_LABELS,
  MERCHANT_REVIEW_STATUS_OPTIONS,
  MERCHANT_REVIEW_LEVEL_OPTIONS,
} from "../../core/constants";

interface MerchantReviewTableProps {
  data: MerchantReviewData[];
  onView?: (merchant: MerchantReviewData) => void;
  onApprove?: (merchant: MerchantReviewData) => void;
  onReject?: (merchant: MerchantReviewData) => void;
  onContinueDraft?: (merchant: MerchantReviewData) => void;
  onSelectionChange?: (selectedMerchants: MerchantReviewData[]) => void;
  loading?: boolean;
  error?: string;
}

export function MerchantReviewTable({
  data,
  onView,
  onApprove,
  onReject,
  onContinueDraft,
  onSelectionChange,
  loading = false,
  error,
}: MerchantReviewTableProps) {
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
    handleRemoveLevel,
    activeDateFilter,
    selectedReviewStatuses,
    selectedLevels,
    dateType,
    activeFilterCount,
  } = useMerchantReviewTableFilters(data);

  const columns = useMerchantReviewTableColumns();

  const actionConfig = useMemo(
    () => ({
      showDropdown: true,
      actions: [
        {
          label: "See Detail",
          icon: <Eye className="h-4 w-4 text-gray-600" />,
          onClick: (row: { original: MerchantReviewData }) => onView?.(row.original),
        },
        {
          label: "Continue Draft",
          icon: <FileText className="h-4 w-4 text-gray-600" />,
          onClick: (row: { original: MerchantReviewData }) => onContinueDraft?.(row.original),
          show: (row: { original: MerchantReviewData }) =>
            row.original.reviewStatus === "draft",
        },
        {
          label: "Approve Merchant",
          icon: <CheckCircle className="h-4 w-4 text-green-600" />,
          onClick: (row: { original: MerchantReviewData }) => onApprove?.(row.original),
          show: (row: { original: MerchantReviewData }) =>
            row.original.reviewStatus === "pending-review",
        },
        {
          label: "Reject Merchant",
          icon: <XCircle className="h-4 w-4 text-red-600" />,
          onClick: (row: { original: MerchantReviewData }) => onReject?.(row.original),
          show: (row: { original: MerchantReviewData }) =>
            row.original.reviewStatus === "pending-review",
        },
      ],
    }),
    [onView, onContinueDraft, onApprove, onReject],
  );

  const toolbarActions = useMemo(
    () =>
      MERCHANT_REVIEW_TOOLBAR_ACTIONS.map((action) => ({
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
        MERCHANT_REVIEW_DATE_TYPE_OPTIONS.find((option) => option.value === dateType)
          ?.label ?? MERCHANT_REVIEW_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedReviewStatuses.length > 0) {
      const labels = MERCHANT_REVIEW_STATUS_OPTIONS.filter((option) =>
        selectedReviewStatuses.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "review-status-filter",
        label: MERCHANT_REVIEW_FILTER_LABELS.REVIEW_STATUS,
        value: labels.join(", "),
        onRemove: handleRemoveStatus,
      });
    }
    if (selectedLevels.length > 0) {
      const labels = MERCHANT_REVIEW_LEVEL_OPTIONS.filter((option) =>
        selectedLevels.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "merchant-level-filter",
        label: MERCHANT_REVIEW_FILTER_LABELS.MERCHANT_LEVEL,
        value: labels.join(", "),
        onRemove: handleRemoveLevel,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    dateType,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveLevel,
    selectedReviewStatuses,
    selectedLevels,
  ]);

  const handleExport = useCallback((format: string, email: string) => {
    console.log("Export merchant review table", { format, email });
  }, []);

  return (
    <>
      <DataTable<MerchantReviewData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Merchant Review",
          description: "Monitor and manage merchant review progress",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: MERCHANT_REVIEW_SEARCH_PLACEHOLDER,
            value: searchValue,
            onChange: setSearchValue,
            fields: [...MERCHANT_REVIEW_SEARCH_FIELDS],
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
              ? MERCHANT_REVIEW_EMPTY_STATE.filteredTitle
              : MERCHANT_REVIEW_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? MERCHANT_REVIEW_EMPTY_STATE.filteredDescription
              : MERCHANT_REVIEW_EMPTY_STATE.defaultDescription,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: MERCHANT_REVIEW_PAGE_SIZE,
          pageSizeOptions: [...MERCHANT_REVIEW_PAGE_SIZE_OPTIONS],
        }}
        enableRowSelection={Boolean(onSelectionChange)}
        onSelectionChange={onSelectionChange}
        onRowClick={onView}
        loading={loading}
        error={error}
        actionConfig={actionConfig}
        dataGridOptions={MERCHANT_REVIEW_DATA_GRID_OPTIONS}
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
          placeholder: MERCHANT_REVIEW_DATE_FILTER_PLACEHOLDER,
          presetDisplayValue:
            draftDateFilterString || MERCHANT_REVIEW_DATE_FILTER_PLACEHOLDER,
          dateTypeOptions: MERCHANT_REVIEW_DATE_TYPE_OPTIONS.map((option) => ({
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
        title="Export Merchant Review"
        description="Download the merchant review table data"
        onExport={handleExport}
      />
    </>
  );
}

"use client";

import { useMemo, useCallback } from "react";
import {
  DataTable,
  type DataTableHeaderTag,
} from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { PendingApprovalData } from "./core/models";
import { usePendingApprovalTableColumns } from "./pending-approval-table-columns";
import { useActionConfig, searchFields } from "./config";
import { usePendingApprovalFilters } from "./core/hooks/usePendingApprovalFilters";
import { usePendingApprovalTableTags } from "./core/hooks/usePendingApprovalTableTags";
import {
  TABLE_DEFAULT_DATE_TYPE,
  TABLE_HEADER_TITLES,
  TABLE_PAGE_SIZE,
  TABLE_PAGE_SIZE_OPTIONS,
  TABLE_SEARCH_PLACEHOLDER,
  DEFAULT_TOOLBAR_ACTIONS,
  DEFAULT_DATA_GRID_OPTIONS,
  PENDING_APPROVAL_DATE_TYPE_OPTIONS,
  DATE_FILTER_PLACEHOLDERS,
  EMPTY_STATE_TITLES,
  EMPTY_STATE_DESCRIPTIONS,
} from "../_constants";

interface PendingApprovalTableProps {
  data: PendingApprovalData[];
  onView?: (disbursement: PendingApprovalData) => void;
  onApprove?: (disbursement: PendingApprovalData) => void;
  onReject?: (disbursement: PendingApprovalData) => void;
  onDetail?: (disbursement: PendingApprovalData) => void;
  onRowClick?: (disbursement: PendingApprovalData) => void;
  onSelectionChange?: (selected: PendingApprovalData[]) => void;
  loading?: boolean;
  error?: string;
}

export function PendingApprovalTable({
  data,
  onView,
  onApprove,
  onReject,
  onDetail,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
}: PendingApprovalTableProps) {
  const columns = usePendingApprovalTableColumns();
  const actionConfig = useActionConfig({
    onView,
    onApprove,
    onReject,
    onDetail,
  });

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
    selectedTypes,
    draftDateRange,
    setDraftDateRange,
    draftDateType,
    setDraftDateType,
    draftDateFilterString,
    setDraftDateFilterString,
    filteredData,
    filterSections,
    filterModalKey,
    handleFilterApply,
    handleResetFilters,
    openFilterModal,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveType,
    activeFilterCount,
  } = usePendingApprovalFilters(data);

  const headerTags = usePendingApprovalTableTags({
    activeDateFilter,
    dateType,
    selectedStatuses,
    selectedTypes,
    onRemoveDate: handleRemoveDate,
    onRemoveStatus: handleRemoveStatus,
    onRemoveType: handleRemoveType,
  });

  const handleRowClickCallback = useCallback((row: PendingApprovalData) => {
    if (onRowClick) {
      onRowClick(row);
    }
  }, [onRowClick]);

  const handleSelectionChangeCallback = useCallback(
    (selectedRows: PendingApprovalData[]) => {
      if (onSelectionChange) {
        onSelectionChange(selectedRows);
      }
    },
    [onSelectionChange],
  );

  const toolbarActions = useMemo(
    () =>
      DEFAULT_TOOLBAR_ACTIONS.map((action) => ({
        ...action,
        onClick:
          action.id === "filter"
            ? openFilterModal
            : () => setIsExportOpen(true),
      })),
    [openFilterModal, setIsExportOpen],
  );

  return (
    <>
      <DataTable<PendingApprovalData>
        data={filteredData}
        columns={columns}
        header={{
          title: TABLE_HEADER_TITLES.PENDING_APPROVAL,
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: TABLE_SEARCH_PLACEHOLDER,
            value: searchValue,
            onChange: setSearchValue,
            fields: searchFields,
            selectedField: searchField,
            onFieldChange: setSearchField,
          },
          actions: toolbarActions,
          showColumnVisibility: true,
          activeFilterCount: activeFilterCount,
          onClearFilters: handleResetFilters,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: TABLE_PAGE_SIZE,
          pageSizeOptions: TABLE_PAGE_SIZE_OPTIONS,
        }}
        enableRowSelection={true}
        actionConfig={actionConfig}
        onRowClick={handleRowClickCallback}
        onSelectionChange={handleSelectionChangeCallback}
        emptyState={{
          title:
            activeFilterCount > 0 || searchValue.trim()
              ? EMPTY_STATE_TITLES.NO_RESULTS
              : EMPTY_STATE_TITLES.PENDING_APPROVAL,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? EMPTY_STATE_DESCRIPTIONS.FILTERED("pending approvals")
              : EMPTY_STATE_DESCRIPTIONS.PENDING_APPROVAL,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        dataGridOptions={DEFAULT_DATA_GRID_OPTIONS}
        loading={loading}
        error={error}
      />

      <FilterModal
        key={filterModalKey}
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        dateFilter={{
          value: draftDateFilterString,
          dateType: draftDateType,
          onDateChange: setDraftDateFilterString,
          onDateTypeChange: setDraftDateType,
          onDateRangeChange: setDraftDateRange,
          onClear: () => {
            setDraftDateRange(undefined);
            setDraftDateFilterString("");
          },
          placeholder:
            draftDateType === TABLE_DEFAULT_DATE_TYPE
              ? DATE_FILTER_PLACEHOLDERS.LAST_ACTIVITY
              : DATE_FILTER_PLACEHOLDERS.SUBMITTED,
          dateTypeOptions: PENDING_APPROVAL_DATE_TYPE_OPTIONS,
        }}
        sections={filterSections}
        onReset={handleResetFilters}
        onApply={handleFilterApply}
      />

      <ExportModal
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        defaultEmail=""
        onExport={(formatType, email) => {}}
      />
    </>
  );
}

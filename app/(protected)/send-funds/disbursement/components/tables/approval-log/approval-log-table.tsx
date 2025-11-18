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
import { ApprovalLogData } from "./core/models";
import { useApprovalLogTableColumns } from "./approval-log-table-columns";
import { useActionConfig, searchFields } from "./config";
import { useApprovalLogFilters } from "./core/hooks/useApprovalLogFilters";
import { useApprovalLogTableTags } from "./core/hooks/useApprovalLogTableTags";
import {
  TABLE_DEFAULT_DATE_TYPE,
  TABLE_HEADER_TITLES,
  TABLE_PAGE_SIZE,
  TABLE_PAGE_SIZE_OPTIONS,
  TABLE_SEARCH_PLACEHOLDER,
  DEFAULT_TOOLBAR_ACTIONS,
  DEFAULT_DATA_GRID_OPTIONS,
  APPROVAL_LOG_DATE_TYPE_OPTIONS,
  DATE_FILTER_PLACEHOLDERS,
  EMPTY_STATE_TITLES,
  EMPTY_STATE_DESCRIPTIONS,
} from "../_constants";

interface ApprovalLogTableProps {
  data: ApprovalLogData[];
  onViewDetails?: (entry: ApprovalLogData) => void;
  onExport?: (entries: ApprovalLogData[]) => void;
  onRowClick?: (entry: ApprovalLogData) => void;
  onSelectionChange?: (selected: ApprovalLogData[]) => void;
  loading?: boolean;
  error?: string;
}

export function ApprovalLogTable({
  data,
  onViewDetails,
  onExport,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
}: ApprovalLogTableProps) {
  const columns = useApprovalLogTableColumns();
  const actionConfig = useActionConfig({
    onViewDetails,
    onExport,
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
  } = useApprovalLogFilters(data);

  const headerTags = useApprovalLogTableTags({
    activeDateFilter,
    dateType,
    selectedStatuses,
    selectedTypes,
    onRemoveDate: handleRemoveDate,
    onRemoveStatus: handleRemoveStatus,
    onRemoveType: handleRemoveType,
  });

  const handleRowClickCallback = useCallback((row: ApprovalLogData) => {
    if (onRowClick) {
      onRowClick(row);
    }
  }, [onRowClick]);

  const handleSelectionChangeCallback = useCallback(
    (selectedRows: ApprovalLogData[]) => {
      console.log("Selected :", selectedRows);

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
      <DataTable<ApprovalLogData>
        data={filteredData}
        columns={columns}
        header={{
          title: TABLE_HEADER_TITLES.APPROVAL_LOG,
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
        enableRowSelection={false}
        actionConfig={actionConfig}
        onRowClick={handleRowClickCallback}
        onSelectionChange={handleSelectionChangeCallback}
        emptyState={{
          title:
            activeFilterCount > 0 || searchValue.trim()
              ? EMPTY_STATE_TITLES.NO_RESULTS
              : EMPTY_STATE_TITLES.APPROVAL_LOG,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? EMPTY_STATE_DESCRIPTIONS.FILTERED("approval logs")
              : EMPTY_STATE_DESCRIPTIONS.APPROVAL_LOG,
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
              : draftDateType === "approvedDate"
              ? DATE_FILTER_PLACEHOLDERS.APPROVED
              : draftDateType === "scheduledDate"
              ? DATE_FILTER_PLACEHOLDERS.SCHEDULED
              : DATE_FILTER_PLACEHOLDERS.LAST_ACTIVITY,
          dateTypeOptions: APPROVAL_LOG_DATE_TYPE_OPTIONS,
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
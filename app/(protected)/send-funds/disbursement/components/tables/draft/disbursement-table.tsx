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
import { DisbursementDraft } from "./core/models";
import { useDisbursementTableColumns } from "./disbursement-table-columns";
import { useActionConfig, searchFields } from "./config";
import { useDisbursementFilters } from "./core/hooks/useDisbursementFilters";
import { useDisbursementTableTags } from "./core/hooks/useDisbursementTableTags";
import {
  TABLE_DEFAULT_DATE_TYPE,
  TABLE_HEADER_TITLES,
  TABLE_PAGE_SIZE,
  TABLE_PAGE_SIZE_OPTIONS,
  TABLE_SEARCH_PLACEHOLDER,
  DEFAULT_TOOLBAR_ACTIONS,
  DEFAULT_DATA_GRID_OPTIONS,
  DRAFT_DATE_TYPE_OPTIONS,
  DATE_FILTER_PLACEHOLDERS,
  EMPTY_STATE_TITLES,
  EMPTY_STATE_DESCRIPTIONS,
} from "../_constants";

interface DisbursementTableProps {
  data: DisbursementDraft[];
  onView?: (disbursement: DisbursementDraft) => void;
  onEdit?: (disbursement: DisbursementDraft) => void;
  onDelete?: (disbursement: DisbursementDraft) => void;
  onSend?: (disbursement: DisbursementDraft) => void;
  onDetail?: (disbursement: DisbursementDraft) => void;
  onCreate?: () => void;
  onRowClick?: (disbursement: DisbursementDraft) => void;
  onSelectionChange?: (selected: DisbursementDraft[]) => void;
  loading?: boolean;
  error?: string;
}

export function DisbursementTable({
  data,
  onView,
  onEdit,
  onDelete,
  onSend,
  onDetail,
  onCreate,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
}: DisbursementTableProps) {
  const columns = useDisbursementTableColumns();
  const actionConfig = useActionConfig({
    onDelete,
    onEdit,
    onSend,
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
  } = useDisbursementFilters(data);

  const headerTags = useDisbursementTableTags({
    activeDateFilter,
    dateType,
    selectedStatuses,
    selectedTypes,
    onRemoveDate: handleRemoveDate,
    onRemoveStatus: handleRemoveStatus,
    onRemoveType: handleRemoveType,
  });

  const handleRowClickCallback = useCallback((row: DisbursementDraft) => {
    if (onRowClick) {
      onRowClick(row);
    }
  }, [onRowClick]);

  const handleSelectionChangeCallback = useCallback(
    (selectedRows: DisbursementDraft[]) => {
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
      <DataTable<DisbursementDraft>
        data={filteredData}
        columns={columns}
        header={{
          title: TABLE_HEADER_TITLES.DRAFT,
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
              : EMPTY_STATE_TITLES.DRAFT,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? EMPTY_STATE_DESCRIPTIONS.FILTERED("draft disbursements")
              : EMPTY_STATE_DESCRIPTIONS.DRAFT,
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
              : DATE_FILTER_PLACEHOLDERS.CREATED,
          dateTypeOptions: DRAFT_DATE_TYPE_OPTIONS,
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

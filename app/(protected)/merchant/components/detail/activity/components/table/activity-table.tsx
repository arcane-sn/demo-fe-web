"use client";

import { useMemo, useState, useCallback } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { ActivityLog } from "../types";
import { useActivityTableColumns } from "./activity-table-columns";
import { searchFields } from "./config";
import { useActivityFilters } from "./core/hooks/useActivityFilters";
import {
  ACTIVITY_SEARCH_PLACEHOLDER,
  ACTIVITY_TOOLBAR_ACTIONS,
  ACTIVITY_DATA_GRID_OPTIONS,
  ACTIVITY_PAGE_SIZE,
  ACTIVITY_PAGE_SIZE_OPTIONS,
  ACTIVITY_DATE_FILTER_PLACEHOLDER,
  ACTIVITY_EMPTY_STATE,
  ACTIVITY_STATUS_OPTIONS,
  ACTIVITY_FILTER_LABELS,
  ACTIVITY_DATE_TYPE_OPTIONS,
  ACTIVITY_ACTION_OPTIONS,
} from "../../core/constants";
import { KeenIcon } from "@/components/keenicons";

interface ActivityTableProps {
  data: ActivityLog[];
  loading?: boolean;
  error?: string | null;
}

export function ActivityTable({
  data,
  loading = false,
  error,
}: ActivityTableProps) {
  const [selectedRowForExport, setSelectedRowForExport] = useState<ActivityLog | null>(null);

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
    handleRemoveAction,
    activeFilterCount,
    selectedStatuses,
    selectedActions,
    dateType,
  } = useActivityFilters(data);

  const handleRowExportClick = useCallback((row: ActivityLog) => {
    setSelectedRowForExport(row);
    setIsExportOpen(true);
  }, [setIsExportOpen]);

  const columns = useActivityTableColumns();

  const toolbarActions = useMemo(
    () =>
      ACTIVITY_TOOLBAR_ACTIONS.map((action) => ({
        ...action,
        onClick:
          action.id === "filter"
            ? openFilterModal
            : () => {
                setSelectedRowForExport(null);
                setIsExportOpen(true);
              },
      })),
    [openFilterModal, setIsExportOpen],
  );

  const handleToolbarExport = useCallback((format: string, email: string) => {
    console.log("Exporting activity table", { format, email });
  }, []);

  const handleExport = useCallback((format: string, email: string) => {
    if (selectedRowForExport) {
      console.log("Exporting activity log row", {
        format,
        email,
        id: selectedRowForExport.id,
      });
      return;
    }
    console.log("Exporting activity table", {
      format,
      email,
    });
  }, [selectedRowForExport]);

  const headerTags = useMemo(() => {
    const tags = [];
    if (draftDateFilterString) {
      const dateTypeLabel =
        ACTIVITY_DATE_TYPE_OPTIONS.find(
          (option) => option.value === dateType,
        )?.label ?? ACTIVITY_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateTypeLabel,
        value: draftDateFilterString,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedStatuses.length > 0) {
      const statusLabels = selectedStatuses.map((status) => {
        const option = ACTIVITY_STATUS_OPTIONS.find((opt) => opt.value === status);
        return option?.label || status;
      });
      tags.push({
        id: "status-filter",
        label: ACTIVITY_FILTER_LABELS.STATUS,
        value: statusLabels.join(", "),
        onRemove: handleRemoveStatus,
      });
    }
    if (selectedActions.length > 0) {
      const actionLabels = selectedActions.map((action) => {
        const option = ACTIVITY_ACTION_OPTIONS.find((opt) => opt.value === action);
        return option?.label || action;
      });
      tags.push({
        id: "action-filter",
        label: ACTIVITY_FILTER_LABELS.ACTION,
        value: actionLabels.join(", "),
        onRemove: handleRemoveAction,
      });
    }
    return tags;
  }, [
    draftDateFilterString,
    selectedStatuses,
    selectedActions,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveAction,
    dateType,
  ]);

  return (
    <>
      <DataTable<ActivityLog>
        data={filteredData}
        columns={columns}
        header={{
          title: "Activity Logs",
          description: "Recent merchant activities and system events",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: ACTIVITY_SEARCH_PLACEHOLDER,
            value: searchValue,
            onChange: setSearchValue,
            fields: searchFields,
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
              ? ACTIVITY_EMPTY_STATE.filteredTitle
              : ACTIVITY_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? ACTIVITY_EMPTY_STATE.filteredDescription
              : ACTIVITY_EMPTY_STATE.defaultDescription,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: ACTIVITY_PAGE_SIZE,
          pageSizeOptions: ACTIVITY_PAGE_SIZE_OPTIONS,
        }}
        dataGridOptions={ACTIVITY_DATA_GRID_OPTIONS}
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
          onDateChange: setDraftDateFilterString,
          onDateTypeChange: setDraftDateType,
          onDateRangeChange: setDraftDateRange,
          onClear: () => {
            setDraftDateFilterString("");
            setDraftDateRange(undefined);
          },
          placeholder: ACTIVITY_DATE_FILTER_PLACEHOLDER,
          dateTypeOptions: ACTIVITY_DATE_TYPE_OPTIONS.map((option) => ({
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
        onOpenChange={(open) => {
          setIsExportOpen(open);
          if (!open) {
            setSelectedRowForExport(null);
          }
        }}
        title={selectedRowForExport ? "Export Activity Log" : "Export"}
        description={
          selectedRowForExport
            ? `Activity: ${selectedRowForExport.action} (${selectedRowForExport.id})`
            : undefined
        }
        onExport={handleExport}
      />
    </>
  );
}


"use client";

import { useCallback, useMemo } from "react";
import { DataTable } from "@/components/reusable/table";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import {
  SETTLEMENT_SEARCH_PLACEHOLDER,
  SETTLEMENT_TOOLBAR_ACTIONS,
  SETTLEMENT_DATA_GRID_OPTIONS,
  SETTLEMENT_PAGE_SIZE,
  SETTLEMENT_PAGE_SIZE_OPTIONS,
  SETTLEMENT_DATE_FILTER_PLACEHOLDER,
  SETTLEMENT_DATE_TYPE_OPTIONS,
  SETTLEMENT_EMPTY_STATE,
  SETTLEMENT_SEARCH_FIELDS,
} from "../../core/constants";
import { getSettlementHistoryColumns } from "./config/hooks/columnData";
import { SettlementHistoryData } from "../../core/models";
import { useSettlementHistoryFilters } from "./config/hooks/useSettlementHistoryFilters";

interface SettlementHistoryTableProps {
  data: SettlementHistoryData[];
  loading?: boolean;
  error?: string | null;
}

export function SettlementHistoryTable({
  data,
  loading = false,
  error,
}: SettlementHistoryTableProps) {
  const columns = useMemo(() => getSettlementHistoryColumns(), []);

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
    activeDateFilter,
    selectedStatuses,
    dateType,
    activeFilterCount,
  } = useSettlementHistoryFilters(data);

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      tags.push({
        id: "date-filter",
        label: dateType === "reportDate" ? "Report Date" : "Settlement Date",
        value: activeDateFilter,
        onRemove: handleRemoveDate,
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
  }, [activeDateFilter, dateType, handleRemoveDate, handleRemoveStatus, selectedStatuses]);

  const toolbarActions = useMemo(
    () =>
      SETTLEMENT_TOOLBAR_ACTIONS.map((action) => ({
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

  const handleExport = useCallback(
    (format: string, email: string) => {
      console.log("Export settlement history table", { format, email });
    },
    [],
  );

  return (
    <>
      <DataTable<SettlementHistoryData>
        data={filteredData}
        columns={columns}
        actionConfig={{
          showDropdown: true,
          actions: [
            {
              label: "View details",
              icon: <Eye className="h-4 w-4" />,
              onClick: (row) => console.log("View", row.original.id),
            },
            {
              label: "Edit settlement",
              icon: <Edit className="h-4 w-4" />,
              onClick: (row) => console.log("Edit", row.original.id),
            },
            {
              label: "Delete settlement",
              icon: <Trash2 className="h-4 w-4" />,
              variant: "destructive",
              onClick: (row) => console.log("Delete", row.original.id),
            },
          ],
        }}
        header={{
          title: "Settlement History",
          description: "View all settled transactions",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: SETTLEMENT_SEARCH_PLACEHOLDER,
            value: searchValue,
            onChange: setSearchValue,
            fields: [...SETTLEMENT_SEARCH_FIELDS],
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
              ? SETTLEMENT_EMPTY_STATE.filteredTitle
              : SETTLEMENT_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? SETTLEMENT_EMPTY_STATE.filteredDescription
              : SETTLEMENT_EMPTY_STATE.defaultDescription,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: SETTLEMENT_PAGE_SIZE,
          pageSizeOptions: SETTLEMENT_PAGE_SIZE_OPTIONS,
        }}
        dataGridOptions={SETTLEMENT_DATA_GRID_OPTIONS}
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
            setDraftDateRange(undefined);
            setDraftDateFilterString("");
          },
          placeholder: SETTLEMENT_DATE_FILTER_PLACEHOLDER,
          dateTypeOptions: [...SETTLEMENT_DATE_TYPE_OPTIONS],
        }}
        sections={filterSections}
        onReset={handleResetFilters}
        onApply={handleFilterApply}
      />

      <ExportModal
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        onExport={handleExport}
      />
    </>
  );
}

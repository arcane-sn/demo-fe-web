"use client";

import { useMemo, useState, useCallback } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { AuditLogData } from "./core/types";
import { useAuditLogTableColumns } from "./audit-log-table-columns";
import { searchFields } from "./config";
import { useAuditLogFilters } from "./core/hooks/useAuditLogFilters";
import { ChangesDetailModal } from "../modal/changes-detail-modal";
import {
  AUDIT_LOG_SEARCH_PLACEHOLDER,
  AUDIT_LOG_TOOLBAR_ACTIONS,
  AUDIT_LOG_DATA_GRID_OPTIONS,
  AUDIT_LOG_PAGE_SIZE,
  AUDIT_LOG_PAGE_SIZE_OPTIONS,
  AUDIT_LOG_DATE_FILTER_PLACEHOLDER,
  AUDIT_LOG_EMPTY_STATE,
  AUDIT_LOG_ACTION_OPTIONS,
  AUDIT_LOG_FILTER_LABELS,
  AUDIT_LOG_DATE_TYPE_OPTIONS,
} from "../../core/constants";

interface AuditLogTableProps {
  data: AuditLogData[];
  loading?: boolean;
  error?: string | null;
  onView?: (row: AuditLogData) => void;
  isMerchantLogs?: boolean;
}

export function AuditLogTable({
  data,
  loading = false,
  error,
  onView,
  isMerchantLogs = false,
}: AuditLogTableProps) {
  const [selectedRowForExport, setSelectedRowForExport] = useState<AuditLogData | null>(null);
  const [selectedRowForDetail, setSelectedRowForDetail] = useState<AuditLogData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Auto-detect merchant logs if not explicitly set
  const isMerchant = isMerchantLogs || (data.length > 0 && !!data[0]?.clientId);

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
    handleRemoveAction,
    activeDateFilter,
    selectedActions,
    dateType,
    activeFilterCount,
  } = useAuditLogFilters(data);

  const handleViewDetail = useCallback((row: AuditLogData) => {
    setSelectedRowForDetail(row);
    setIsDetailModalOpen(true);
  }, []);

  const columns = useAuditLogTableColumns(isMerchant, handleViewDetail);

  const toolbarActions = useMemo(
    () =>
      AUDIT_LOG_TOOLBAR_ACTIONS.map((action) => ({
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

  const handleExport = useCallback((format: string, email: string) => {
    if (selectedRowForExport) {
      console.log("Exporting audit log row", {
        format,
        email,
        id: selectedRowForExport.id,
      });
      return;
    }
    console.log("Exporting audit logs table", {
      format,
      email,
    });
  }, [selectedRowForExport]);

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      const dateTypeLabel =
        AUDIT_LOG_DATE_TYPE_OPTIONS.find(
          (option) => option.value === dateType,
        )?.label ?? AUDIT_LOG_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateTypeLabel,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedActions.length > 0) {
      const actionLabels = selectedActions.map((action) => {
        const option = AUDIT_LOG_ACTION_OPTIONS.find((opt) => opt.value === action);
        return option?.label || action;
      });
      tags.push({
        id: "action-filter",
        label: AUDIT_LOG_FILTER_LABELS.ACTION,
        value: actionLabels.join(", "),
        onRemove: handleRemoveAction,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    selectedActions,
    handleRemoveDate,
    handleRemoveAction,
    dateType,
  ]);

  return (
    <>
      <DataTable<AuditLogData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Audit Logs",
          description: "View all system activity logs",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: AUDIT_LOG_SEARCH_PLACEHOLDER,
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
              ? AUDIT_LOG_EMPTY_STATE.filteredTitle
              : AUDIT_LOG_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? AUDIT_LOG_EMPTY_STATE.filteredDescription
              : AUDIT_LOG_EMPTY_STATE.defaultDescription,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: AUDIT_LOG_PAGE_SIZE,
          pageSizeOptions: [...AUDIT_LOG_PAGE_SIZE_OPTIONS],
        }}
        dataGridOptions={AUDIT_LOG_DATA_GRID_OPTIONS}
        loading={loading}
        error={error ?? undefined}
        enableRowSelection={false}
        onRowClick={onView}
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
          placeholder: AUDIT_LOG_DATE_FILTER_PLACEHOLDER,
          presetDisplayValue: "01/12/2025 - 31/12/2025",
          dateTypeOptions: AUDIT_LOG_DATE_TYPE_OPTIONS.map((option) => ({
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
        title={selectedRowForExport ? "Export Audit Log" : "Export"}
        description={
          selectedRowForExport
            ? `Audit Log ${selectedRowForExport.id} (${selectedRowForExport.action})`
            : undefined
        }
        onExport={handleExport}
      />

      <ChangesDetailModal
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

export default AuditLogTable;


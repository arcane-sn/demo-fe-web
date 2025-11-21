"use client";

import { useMemo, useState, useCallback } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { useApplicationLogTableColumns } from "./application-log-table-columns";
import { searchFields } from "./config";
import { useApplicationLogFilters } from "./core/hooks/useApplicationLogFilters";
import { ApplicationLogDetailModal } from "../modal/application-log-detail-modal";
import {
  APPLICATION_LOG_SEARCH_PLACEHOLDER,
  APPLICATION_LOG_TOOLBAR_ACTIONS,
  APPLICATION_LOG_DATA_GRID_OPTIONS,
  APPLICATION_LOG_PAGE_SIZE,
  APPLICATION_LOG_PAGE_SIZE_OPTIONS,
  APPLICATION_LOG_DATE_FILTER_PLACEHOLDER,
  APPLICATION_LOG_EMPTY_STATE,
  APPLICATION_LOG_LEVEL_OPTIONS,
  APPLICATION_LOG_SERVICE_OPTIONS,
  APPLICATION_LOG_EVENT_TYPE_OPTIONS,
  APPLICATION_LOG_ENV_OPTIONS,
  APPLICATION_LOG_FILTER_LABELS,
  APPLICATION_LOG_DATE_TYPE_OPTIONS,
} from "../../core/constants";
import { ApplicationLogData } from "../../core/types";

interface ApplicationLogTableProps {
  data: ApplicationLogData[];
  loading?: boolean;
  error?: string | null;
  onView?: (row: ApplicationLogData) => void;
}

export function ApplicationLogTable({
  data,
  loading = false,
  error,
  onView,
}: ApplicationLogTableProps) {
  const [selectedRowForExport, setSelectedRowForExport] =
    useState<ApplicationLogData | null>(null);
  const [selectedRowForDetail, setSelectedRowForDetail] =
    useState<ApplicationLogData | null>(null);
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
    handleRemoveLevel,
    handleRemoveService,
    handleRemoveEventType,
    handleRemoveEnv,
    activeFilterCount,
    selectedLevels,
    selectedServices,
    selectedEventTypes,
    selectedEnvs,
    dateType,
    activeDateFilter,
  } = useApplicationLogFilters(data);

  const handleViewDetail = useCallback((row: ApplicationLogData) => {
    setSelectedRowForDetail(row);
    setIsDetailModalOpen(true);
  }, []);

  const columns = useApplicationLogTableColumns(handleViewDetail);

  const toolbarActions = useMemo(
    () =>
      APPLICATION_LOG_TOOLBAR_ACTIONS.map((action) => ({
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
        console.log("Exporting application log row", {
          format,
          email,
          id: selectedRowForExport.id,
        });
        return;
      }
      console.log("Exporting application logs table", {
        format,
        email,
      });
    },
    [selectedRowForExport]
  );

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      const dateTypeLabel =
        APPLICATION_LOG_DATE_TYPE_OPTIONS.find(
          (option) => option.value === dateType
        )?.label ?? APPLICATION_LOG_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateTypeLabel,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedLevels.length > 0) {
      const levelLabels = selectedLevels.map((level) => {
        const option = APPLICATION_LOG_LEVEL_OPTIONS.find(
          (opt) => opt.value === level
        );
        return option?.label || level;
      });
      tags.push({
        id: "level-filter",
        label: APPLICATION_LOG_FILTER_LABELS.LEVEL,
        value: levelLabels.join(", "),
        onRemove: handleRemoveLevel,
      });
    }
    if (selectedServices.length > 0) {
      const serviceLabels = selectedServices.map((service) => {
        const option = APPLICATION_LOG_SERVICE_OPTIONS.find(
          (opt) => opt.value === service
        );
        return option?.label || service;
      });
      tags.push({
        id: "service-filter",
        label: APPLICATION_LOG_FILTER_LABELS.SERVICE_NAME,
        value: serviceLabels.join(", "),
        onRemove: handleRemoveService,
      });
    }
    if (selectedEventTypes.length > 0) {
      const eventTypeLabels = selectedEventTypes.map((eventType) => {
        const option = APPLICATION_LOG_EVENT_TYPE_OPTIONS.find(
          (opt) => opt.value === eventType
        );
        return option?.label || eventType;
      });
      tags.push({
        id: "event-type-filter",
        label: APPLICATION_LOG_FILTER_LABELS.EVENT_TYPE,
        value: eventTypeLabels.join(", "),
        onRemove: handleRemoveEventType,
      });
    }
    if (selectedEnvs.length > 0) {
      const envLabels = selectedEnvs.map((env) => {
        const option = APPLICATION_LOG_ENV_OPTIONS.find(
          (opt) => opt.value === env
        );
        return option?.label || env;
      });
      tags.push({
        id: "env-filter",
        label: APPLICATION_LOG_FILTER_LABELS.ENV,
        value: envLabels.join(", "),
        onRemove: handleRemoveEnv,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    selectedLevels,
    selectedServices,
    selectedEventTypes,
    selectedEnvs,
    handleRemoveDate,
    handleRemoveLevel,
    handleRemoveService,
    handleRemoveEventType,
    handleRemoveEnv,
    dateType,
  ]);

  return (
    <>
      <DataTable<ApplicationLogData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Application Logs",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: APPLICATION_LOG_SEARCH_PLACEHOLDER,
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
              ? APPLICATION_LOG_EMPTY_STATE.filteredTitle
              : APPLICATION_LOG_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? APPLICATION_LOG_EMPTY_STATE.filteredDescription
              : APPLICATION_LOG_EMPTY_STATE.defaultDescription,
          hasActiveFilters:
            activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: APPLICATION_LOG_PAGE_SIZE,
          pageSizeOptions: [...APPLICATION_LOG_PAGE_SIZE_OPTIONS],
        }}
        dataGridOptions={APPLICATION_LOG_DATA_GRID_OPTIONS}
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
          placeholder: APPLICATION_LOG_DATE_FILTER_PLACEHOLDER,
          presetDisplayValue: "01/12/2025 - 31/12/2025",
          dateTypeOptions: APPLICATION_LOG_DATE_TYPE_OPTIONS.map((option) => ({
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
        title={selectedRowForExport ? "Export Application Log" : "Export"}
        description={
          selectedRowForExport
            ? `Application Log ${selectedRowForExport.logId} (${selectedRowForExport.level})`
            : undefined
        }
        onExport={handleExport}
      />

      <ApplicationLogDetailModal
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

export default ApplicationLogTable;

"use client";

import { useMemo, useState, useCallback } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { ProviderMasterData } from "../../core/_models";
import { useProviderMasterDataColumns } from "./provider-master-data-table-columns";
import { searchFields } from "./config";
import { useProviderMasterDataFilters } from "./core/hooks/useProviderMasterDataFilters";
import {
  PROVIDER_MASTER_DATA_SEARCH_PLACEHOLDER,
  PROVIDER_MASTER_DATA_TOOLBAR_ACTIONS,
  PROVIDER_MASTER_DATA_DATA_GRID_OPTIONS,
  PROVIDER_MASTER_DATA_PAGE_SIZE,
  PROVIDER_MASTER_DATA_PAGE_SIZE_OPTIONS,
  PROVIDER_MASTER_DATA_DATE_FILTER_PLACEHOLDER,
  PROVIDER_MASTER_DATA_EMPTY_STATE,
  PROVIDER_MASTER_DATA_STATUS_OPTIONS,
  PROVIDER_MASTER_DATA_FILTER_LABELS,
  PROVIDER_MASTER_DATA_DATE_TYPE_OPTIONS,
} from "../../core/constants";
import { useMasterDataStore } from "../../hooks/useMasterDataStore";
import { KeenIcon } from "@/components/keenicons";

interface ProviderMasterDataTableProps {
  data: ProviderMasterData[];
  loading?: boolean;
  error?: string | null;
}

export function ProviderMasterDataTable({
  data,
  loading = false,
  error,
}: ProviderMasterDataTableProps) {
  const [selectedRowForExport, setSelectedRowForExport] = useState<ProviderMasterData | null>(null);
  const { setModal } = useMasterDataStore();

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
    handleRemoveType,
    activeDateFilter,
    selectedStatuses,
    selectedTypes,
    dateType,
    activeFilterCount,
  } = useProviderMasterDataFilters(data);

  const handleRowExportClick = useCallback((row: ProviderMasterData) => {
    setSelectedRowForExport(row);
    setIsExportOpen(true);
  }, [setIsExportOpen]);

  const columns = useProviderMasterDataColumns();

  const toolbarActions = useMemo(
    () =>
      PROVIDER_MASTER_DATA_TOOLBAR_ACTIONS.map((action) => ({
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
    console.log("Exporting provider master data table", { format, email });
  }, []);

  const handleExport = useCallback((format: string, email: string) => {
    if (selectedRowForExport) {
      console.log("Exporting provider master data row", {
        format,
        email,
        id: selectedRowForExport.id,
      });
      return;
    }
    console.log("Exporting provider master data table", {
      format,
      email,
    });
  }, [selectedRowForExport]);

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      const dateTypeLabel =
        PROVIDER_MASTER_DATA_DATE_TYPE_OPTIONS.find(
          (option) => option.value === dateType,
        )?.label ?? PROVIDER_MASTER_DATA_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateTypeLabel,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedStatuses.length > 0) {
      const statusLabels = selectedStatuses.map((status) => {
        const option = PROVIDER_MASTER_DATA_STATUS_OPTIONS.find((opt) => opt.value === status);
        return option?.label || status;
      });
      tags.push({
        id: "status-filter",
        label: PROVIDER_MASTER_DATA_FILTER_LABELS.STATUS,
        value: statusLabels.join(", "),
        onRemove: handleRemoveStatus,
      });
    }
    if (selectedTypes.length > 0) {
      tags.push({
        id: "type-filter",
        label: PROVIDER_MASTER_DATA_FILTER_LABELS.PROVIDER_TYPE,
        value: selectedTypes.join(", "),
        onRemove: handleRemoveType,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    selectedStatuses,
    selectedTypes,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveType,
    dateType,
  ]);

  return (
    <>
      <DataTable<ProviderMasterData>
        data={filteredData}
        columns={columns}
        actionConfig={{
          showDropdown: false,
          actions: [
            {
              label: "",
              icon: <KeenIcon icon="notepad-edit" style="outline" className="text-lg border border-gray-300 text-gray-600 rounded-md p-1" />,
              onClick: (row) => {
                setModal("edit", true);
              },
            },
          ],
        }}
        header={{
          title: "Provider List",
          description: "Manage your provider master data",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: PROVIDER_MASTER_DATA_SEARCH_PLACEHOLDER,
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
              ? PROVIDER_MASTER_DATA_EMPTY_STATE.filteredTitle
              : PROVIDER_MASTER_DATA_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? PROVIDER_MASTER_DATA_EMPTY_STATE.filteredDescription
              : PROVIDER_MASTER_DATA_EMPTY_STATE.defaultDescription,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: PROVIDER_MASTER_DATA_PAGE_SIZE,
          pageSizeOptions: PROVIDER_MASTER_DATA_PAGE_SIZE_OPTIONS,
        }}
        dataGridOptions={PROVIDER_MASTER_DATA_DATA_GRID_OPTIONS}
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
          placeholder: PROVIDER_MASTER_DATA_DATE_FILTER_PLACEHOLDER,
          presetDisplayValue: "01/12/2025 - 31/12/2025",
          dateTypeOptions: PROVIDER_MASTER_DATA_DATE_TYPE_OPTIONS.map((option) => ({
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
        title={selectedRowForExport ? "Export Provider" : "Export"}
        description={
          selectedRowForExport
            ? `Provider ${selectedRowForExport.providerName} (${selectedRowForExport.providerId})`
            : undefined
        }
        onExport={handleExport}
      />
    </>
  );
}


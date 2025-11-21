'use client';

import { useCallback, useMemo } from 'react';
import { DataTable } from '@/components/reusable/table';
import {
  ExportModal,
  FilterModal,
} from '@/components/reusable/table/components/modals';
import { MerchantData } from '../../types/merchant-data';
import { useMerchantTableColumns } from './merchant-table-columns';
import { useSchedulerTableFilters } from './hooks/useSchedulerTableFilters';
import {
  SCHEDULER_DATE_RANGE_PLACEHOLDER,
  SCHEDULER_DATE_TYPE_OPTIONS,
  SCHEDULER_DATA_GRID_OPTIONS,
  SCHEDULER_PAGE_SIZE,
  SCHEDULER_PAGE_SIZE_OPTIONS,
  SCHEDULER_SEARCH_FIELDS,
  SCHEDULER_TOOLBAR_ACTIONS,
  SCHEDULER_FILTER_LABELS,
  SCHEDULER_SERVICE_OPTIONS,
} from '../../core/constants';

interface MerchantTableProps {
  data: MerchantData[];
  onEdit?: (merchant: MerchantData) => void;
  onCreate?: () => void;
  onExport?: (data: MerchantData[]) => void;
  onRowClick?: (merchant: MerchantData) => void;
  onSelectionChange?: (selected: MerchantData[]) => void;
  loading?: boolean;
  error?: string;
}

export function MerchantTable({
  data,
  onEdit,
  onCreate,
  onExport,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
}: MerchantTableProps) {
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
    handleRemoveActiveServices,
    handleRemoveInactiveServices,
    activeDateFilter,
    selectedActiveServices,
    selectedInactiveServices,
    activeFilterCount,
  } = useSchedulerTableFilters(data);

  const columns = useMerchantTableColumns(onEdit);

  const hasSearchValue = Boolean(searchValue.trim());
  const hasActiveFilters = activeFilterCount > 0 || hasSearchValue;

  const toolbarActions = useMemo(
    () =>
      SCHEDULER_TOOLBAR_ACTIONS.map((action) => ({
        ...action,
        onClick:
          action.id === 'filter' ? openFilterModal : () => setIsExportOpen(true),
      })),
    [openFilterModal, setIsExportOpen],
  );

  const serviceLabelMap = useMemo(
    () =>
      new Map(
        SCHEDULER_SERVICE_OPTIONS.map((option) => [option.value, option.label]),
      ),
    [],
  );

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      tags.push({
        id: 'date-filter',
        label: 'Updated Date',
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedActiveServices.length) {
      tags.push({
        id: 'active-services',
        label: SCHEDULER_FILTER_LABELS.ACTIVE_SERVICES,
        value: selectedActiveServices
          .map((key) => serviceLabelMap.get(key))
          .filter(Boolean)
          .join(', '),
        onRemove: handleRemoveActiveServices,
      });
    }
    if (selectedInactiveServices.length) {
      tags.push({
        id: 'inactive-services',
        label: SCHEDULER_FILTER_LABELS.INACTIVE_SERVICES,
        value: selectedInactiveServices
          .map((key) => serviceLabelMap.get(key))
          .filter(Boolean)
          .join(', '),
        onRemove: handleRemoveInactiveServices,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    selectedActiveServices,
    selectedInactiveServices,
    serviceLabelMap,
    handleRemoveDate,
    handleRemoveActiveServices,
    handleRemoveInactiveServices,
  ]);

  const handleExport = useCallback(
    (format: string, email: string) => {
      console.log('Export scheduler data', { format, email });
      onExport?.(filteredData);
    },
    [filteredData, onExport],
  );

  return (
    <>
      <DataTable<MerchantData>
        data={filteredData}
        columns={columns}
        header={{
          title: 'Scheduler',
          description: 'Monitor merchant scheduler configuration',
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: 'Search merchants',
            value: searchValue,
            onChange: setSearchValue,
            fields: [...SCHEDULER_SEARCH_FIELDS],
            selectedField: searchField,
            onFieldChange: setSearchField,
          },
          actions: toolbarActions,
          showColumnVisibility: true,
          activeFilterCount,
          onClearFilters: handleResetFilters,
        }}
        emptyState={{
          title: hasActiveFilters ? 'No results found' : 'No Scheduler Data',
          description: hasActiveFilters
            ? 'Try adjusting your filters or search keywords.'
            : 'No merchants to show. Add one to get started.',
          action:
            !hasActiveFilters && onCreate
              ? {
                  label: 'Add Merchant',
                  onClick: onCreate,
                }
              : undefined,
          hasActiveFilters,
        }}
        pagination={{
          pageSize: SCHEDULER_PAGE_SIZE,
          pageSizeOptions: [...SCHEDULER_PAGE_SIZE_OPTIONS],
        }}
        enableRowSelection={Boolean(onSelectionChange)}
        onSelectionChange={onSelectionChange}
        onRowClick={onRowClick}
        loading={loading}
        error={error}
        dataGridOptions={SCHEDULER_DATA_GRID_OPTIONS}
      />

      <FilterModal
        key={filterModalKey}
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        dateFilter={{
          label: 'Updated Date',
          value: draftDateFilterString,
          placeholder: SCHEDULER_DATE_RANGE_PLACEHOLDER,
          dateType: draftDateType,
          dateRange: draftDateRange,
          dateTypeOptions: SCHEDULER_DATE_TYPE_OPTIONS.map((option) => ({
            label: option.label,
            value: option.value,
          })),
          onDateChange: setDraftDateFilterString,
          onDateTypeChange: setDraftDateType,
          onDateRangeChange: setDraftDateRange,
          onClear: () => {
            setDraftDateFilterString('');
            setDraftDateRange(undefined);
          },
          presetDisplayValue:
            draftDateFilterString || SCHEDULER_DATE_RANGE_PLACEHOLDER,
        }}
        sections={filterSections}
        onReset={handleResetFilters}
        onApply={handleFilterApply}
      />

      <ExportModal
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        title="Export Scheduler"
        description="Export scheduler configuration data"
        onExport={handleExport}
      />
    </>
  );
}
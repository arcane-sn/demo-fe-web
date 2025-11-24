'use client';

import { useMemo, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/reusable/table';
import {
  FilterModal,
  ExportModal,
} from '@/components/reusable/table/components/modals';
import { BankData, useDisbursementFilters } from './core/hooks/useDisbursementFilters';
import { useDisbursementTableColumns } from './components/disbursement-table-columns';
import { searchFields } from './components/config';
import {
  DISBURSEMENT_SEARCH_PLACEHOLDER,
  DISBURSEMENT_TOOLBAR_ACTIONS,
  DISBURSEMENT_DATA_GRID_OPTIONS,
  DISBURSEMENT_PAGE_SIZE,
  DISBURSEMENT_PAGE_SIZE_OPTIONS,
  DISBURSEMENT_DATE_FILTER_PLACEHOLDER,
  DISBURSEMENT_EMPTY_STATE,
  DISBURSEMENT_STATUS_OPTIONS,
  DISBURSEMENT_FILTER_LABELS,
  DISBURSEMENT_DATE_TYPE_OPTIONS,
} from './core/constants';

// Mock data - replace with actual data fetching
const bankData: BankData[] = [
  {
    id: '1',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: '-',
    updatedBy: '-',
    deletedDate: '-',
    deletedBy: '-',
  },
  {
    id: '2',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
  {
    id: '3',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
  {
    id: '4',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
  {
    id: '5',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
];

export function DisbursementContent() {
  const [activeTab, setActiveTab] = useState('bank-list');
  const [selectedRowForExport, setSelectedRowForExport] = useState<BankData | null>(null);

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
  } = useDisbursementFilters(bankData);

  const handleRowExportClick = useCallback((row: BankData) => {
    setSelectedRowForExport(row);
    setIsExportOpen(true);
  }, [setIsExportOpen]);

  const columns = useDisbursementTableColumns();

  const toolbarActions = useMemo(
    () =>
      DISBURSEMENT_TOOLBAR_ACTIONS.map((action) => ({
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
    console.log("Exporting disbursement bank list table", { format, email });
  }, []);

  const handleExport = useCallback((format: string, email: string) => {
    if (selectedRowForExport) {
      console.log("Exporting disbursement bank row", {
        format,
        email,
        id: selectedRowForExport.id,
      });
      return;
    }
    console.log("Exporting disbursement bank list table", {
      format,
      email,
    });
  }, [selectedRowForExport]);

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      const dateTypeLabel =
        DISBURSEMENT_DATE_TYPE_OPTIONS.find(
          (option) => option.value === dateType,
        )?.label ?? DISBURSEMENT_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateTypeLabel,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedStatuses.length > 0) {
      const statusLabels = selectedStatuses.map((status) => {
        const option = DISBURSEMENT_STATUS_OPTIONS.find((opt) => opt.value === status);
        return option?.label || status;
      });
      tags.push({
        id: "status-filter",
        label: DISBURSEMENT_FILTER_LABELS.STATUS,
        value: statusLabels.join(", "),
        onRemove: handleRemoveStatus,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    selectedStatuses,
    handleRemoveDate,
    handleRemoveStatus,
    dateType,
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Disbursement Service</h2>
          <p className="text-muted-foreground">See all banks pricing and routing setup to this merchant</p>
        </div>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b">
        <button
          onClick={() => setActiveTab('bank-list')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'bank-list'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Bank List
        </button>
        <button
          onClick={() => setActiveTab('routing')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'routing'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Routing
        </button>
      </div>

      {/* Bank List Content */}
      {activeTab === 'bank-list' && (
        <>
          <DataTable<BankData>
            data={filteredData}
            columns={columns}
            header={{
              title: "Bank List",
              description: "See all banks pricing and routing setup to this merchant",
              tags: headerTags,
            }}
            toolbar={{
              search: {
                placeholder: DISBURSEMENT_SEARCH_PLACEHOLDER,
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
                  ? DISBURSEMENT_EMPTY_STATE.filteredTitle
                  : DISBURSEMENT_EMPTY_STATE.defaultTitle,
              description:
                activeFilterCount > 0 || searchValue.trim()
                  ? DISBURSEMENT_EMPTY_STATE.filteredDescription
                  : DISBURSEMENT_EMPTY_STATE.defaultDescription,
              hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
            }}
            pagination={{
              totalItems: filteredData.length,
              page: 1,
              pageSize: DISBURSEMENT_PAGE_SIZE,
              pageSizeOptions: DISBURSEMENT_PAGE_SIZE_OPTIONS,
            }}
            dataGridOptions={DISBURSEMENT_DATA_GRID_OPTIONS}
            loading={false}
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
              placeholder: DISBURSEMENT_DATE_FILTER_PLACEHOLDER,
              presetDisplayValue: "01/12/2025 - 31/12/2025",
              dateTypeOptions: DISBURSEMENT_DATE_TYPE_OPTIONS.map((option) => ({
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
            title={selectedRowForExport ? "Export Bank" : "Export"}
            description={
              selectedRowForExport
                ? `Bank ${selectedRowForExport.bankName} (${selectedRowForExport.bankCode})`
                : undefined
            }
            onExport={handleExport}
        />
        </>
      )}

      {/* Routing Content */}
      {activeTab === 'routing' && (
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Routing</h3>
          <p className="text-muted-foreground">Routing configuration will be displayed here.</p>
        </div>
      )}
    </div>
  );
}

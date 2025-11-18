"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  DataTable,
  type DataTableHeaderTag,
} from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { PayInTransaction } from "../../core/_models";
import { PAY_IN_TABLE_CONFIG } from "../../core/_consts";
import { useColumnPayInDynamic } from "./hooks/useColumnPayInDynamic";
import { usePayinStore } from "../../hooks/usePayinStore";
import { HEADER_TITLE, DEFAULT_DATE_TYPE } from "../../../core/_constants";
import { formatDateRange } from "../../../components/shared/utils";
import { useActionConfig, searchFields } from "./config";
import { usePayInFilters } from "./hooks/usePayInFilters";
import { usePayInTableTags } from "./hooks/usePayInTableTags";

export function TablePayInHistory() {
  const router = useRouter();
  const setSelectedTransactions = usePayinStore((state) => state.setSelectedTransactions);

  const columns = useColumnPayInDynamic();
  const actionConfig = useActionConfig();

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
    selectedActivities,
    selectedProviderNames,
    selectedPaymentMethods,
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
    handleRemoveActivity,
    handleRemoveProviderName,
    handleRemovePaymentMethod,
    selectedVATypes,
    selectedVAStatuses,
    selectedVABanks,
    selectedQRISAcquirers,
    handleRemoveVAType,
    handleRemoveVAStatus,
    handleRemoveVABanks,
    handleRemoveQRISAcquirer,
  } = usePayInFilters();

  const headerTags = usePayInTableTags({
    activeDateFilter,
    dateType,
    selectedStatuses,
    selectedActivities,
    selectedProviderNames,
    selectedPaymentMethods,
    selectedVATypes,
    selectedVAStatuses,
    selectedVABanks,
    selectedQRISAcquirers,
    onRemoveDate: handleRemoveDate,
    onRemoveStatus: handleRemoveStatus,
    onRemoveActivity: handleRemoveActivity,
    onRemoveProviderName: handleRemoveProviderName,
    onRemovePaymentMethod: handleRemovePaymentMethod,
    onRemoveVAType: handleRemoveVAType,
    onRemoveVAStatus: handleRemoveVAStatus,
    onRemoveVABanks: handleRemoveVABanks,
    onRemoveQRISAcquirer: handleRemoveQRISAcquirer,
  });

  const handleRowClick = useCallback((row: PayInTransaction) => {
    router.push(`/transactions/pay-in/${row.id}`);
  }, [router]);

  const handleSelectionChange = useCallback(
    (selectedRows: PayInTransaction[]) => {
    setSelectedTransactions(selectedRows);
    },
    [setSelectedTransactions],
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedStatuses.length > 0) count++;
    if (selectedActivities.length > 0) count++;
    if (selectedProviderNames.length > 0) count++;
    if (selectedPaymentMethods.length > 0) count++;
    if (selectedVATypes.length > 0) count++;
    if (selectedVAStatuses.length > 0) count++;
    if (selectedVABanks.length > 0) count++;
    if (selectedQRISAcquirers.length > 0) count++;
    return count;
  }, [
    activeDateFilter,
    selectedStatuses,
    selectedActivities,
    selectedProviderNames,
    selectedPaymentMethods,
    selectedVATypes,
    selectedVAStatuses,
    selectedVABanks,
    selectedQRISAcquirers,
  ]);

  const toolbarActions = useMemo(
    () => [
      {
        id: "filter",
        label: "Filter",
        onClick: openFilterModal,
      },
      {
        id: "export",
        label: "Export",
        onClick: () => setIsExportOpen(true),
      },
    ],
    [openFilterModal, setIsExportOpen],
  );

  return (
    <>
      <DataTable<PayInTransaction>
        data={filteredData}
        columns={columns}
        header={{
          title: HEADER_TITLE,
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: PAY_IN_TABLE_CONFIG.searchPlaceholder,
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
          pageSize: PAY_IN_TABLE_CONFIG.pageSize,
          pageSizeOptions: [10, 20, 50],
        }}
        enableRowSelection={PAY_IN_TABLE_CONFIG.enableRowSelection}
        actionConfig={actionConfig}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelectionChange}
        emptyState={{
          title: activeFilterCount > 0 || searchValue.trim() 
            ? "No Results Found" 
            : "No Transactions Yet",
          description: activeFilterCount > 0 || searchValue.trim()
            ? "No transactions match your current filters. Try adjusting your search or filter criteria."
            : "Looks like you don't have any transactions. All payment transactions will be recorded here.",
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        dataGridOptions={{
          tableLayout: {
            width: "fixed",
            columnsPinnable: true,
            columnsMovable: true,
            columnsVisibility: true,
            cellBorder: true,
          },
        }}
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
          placeholder: draftDateType === DEFAULT_DATE_TYPE ? "Transaction Date" : "Requested Date",
          dateTypeOptions: [
            { label: "Transaction Date", value: "transactionDate" },
            { label: "Requested Date", value: "requestedDate" },
          ],
        }}
        sections={filterSections}
        onReset={handleResetFilters}
        onApply={handleFilterApply}
      />

      <ExportModal
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        defaultEmail="wakwaw@gmail.com"
        onExport={(formatType, email) => {
          console.log("Exporting pay-in transactions as", formatType, "to", email);
        }}
      />
    </>
  );
}

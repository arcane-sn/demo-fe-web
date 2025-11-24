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
import { PayOutTransaction } from "../../core/_models";
import { PAY_OUT_TABLE_CONFIG } from "../../core/_consts";
import { useColumnPayOut } from "./hooks/useColumnPayOut";
import { HEADER_TITLE, DEFAULT_DATE_TYPE } from "../../../core/_constants";
import { useActionConfig, searchFields } from "./config";
import { usePayOutFilters } from "./hooks/usePayOutFilters";
import { usePayOutTableTags } from "./hooks/usePayOutTableTags";
import { usePayoutStore } from "../../hooks/usePayoutStore";

export function TablePayoutHistory() {
  const router = useRouter();
  const setSelectedTransactions = usePayoutStore((state) => state.setSelectedTransactions);

  const columns = useColumnPayOut();
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
    selectedTransactionTypes,
    selectedProviderNames,
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
    handleRemoveTransactionType,
    handleRemoveProviderName,
  } = usePayOutFilters();

  const headerTags = usePayOutTableTags({
    activeDateFilter,
    dateType,
    selectedStatuses,
    selectedTransactionTypes,
    selectedProviderNames,
    onRemoveDate: handleRemoveDate,
    onRemoveStatus: handleRemoveStatus,
    onRemoveTransactionType: handleRemoveTransactionType,
    onRemoveProviderName: handleRemoveProviderName,
  });

  const handleRowClick = useCallback((row: PayOutTransaction) => {
    router.push(`/transactions/pay-out/${row.id}`);
  }, [router]);

  const handleSelectionChange = useCallback(
    (selectedRows: PayOutTransaction[]) => {
      setSelectedTransactions(selectedRows);
    },
    [setSelectedTransactions],
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedStatuses.length > 0) count++;
    if (selectedTransactionTypes.length > 0) count++;
    if (selectedProviderNames.length > 0) count++;
    return count;
  }, [activeDateFilter, selectedStatuses, selectedTransactionTypes, selectedProviderNames]);

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
      <DataTable<PayOutTransaction>
        data={filteredData}
        columns={columns}
        header={{
          title: HEADER_TITLE,
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: PAY_OUT_TABLE_CONFIG.searchPlaceholder,
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
          pageSize: PAY_OUT_TABLE_CONFIG.pageSize,
          pageSizeOptions: [10, 20, 50],
        }}
        enableRowSelection={PAY_OUT_TABLE_CONFIG.enableRowSelection}
        actionConfig={actionConfig}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelectionChange}
        emptyState={{
          title: activeFilterCount > 0 || searchValue.trim() 
            ? "No Results Found" 
            : "No Transactions Yet",
          description: activeFilterCount > 0 || searchValue.trim()
            ? "No transactions match your current filters. Try adjusting your search or filter criteria."
            : "Looks like you don't have any transactions. All disbursement transactions will be recorded here.",
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
          placeholder: draftDateType === DEFAULT_DATE_TYPE ? "Transaction Date" : "Served Date",
          dateTypeOptions: [
            { label: "Transaction Date", value: "transactionDate" },
            { label: "Served Date", value: "servedDate" },
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
          console.log("Exporting pay-out transactions as", formatType, "to", email);
        }}
      />
    </>
  );
}


"use client";

import { useMemo, useState, useCallback } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { AccountInquiryRecord } from "./core/models";
import { useAccountInquiryColumns } from "./account-inquiry-table-columns";
import { searchFields } from "./config";
import { useAccountInquiryFilters } from "./core/hooks/useAccountInquiryFilters";
import {
  ACCOUNT_INQUIRY_SEARCH_PLACEHOLDER,
  ACCOUNT_INQUIRY_TOOLBAR_ACTIONS,
  ACCOUNT_INQUIRY_DATA_GRID_OPTIONS,
  ACCOUNT_INQUIRY_PAGE_SIZE,
  ACCOUNT_INQUIRY_PAGE_SIZE_OPTIONS,
  ACCOUNT_INQUIRY_DATE_FILTER_PLACEHOLDER,
  ACCOUNT_INQUIRY_EMPTY_STATE,
} from "../../core/constants";

interface AccountInquiryTableProps {
  data: AccountInquiryRecord[];
  loading?: boolean;
  error?: string | null;
}

export function AccountInquiryTable({
  data,
  loading = false,
  error,
}: AccountInquiryTableProps) {
  const [selectedRowForExport, setSelectedRowForExport] = useState<AccountInquiryRecord | null>(null);

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
    activeFilterCount,
  } = useAccountInquiryFilters(data);

  const handleRowExportClick = useCallback((row: AccountInquiryRecord) => {
    setSelectedRowForExport(row);
    setIsExportOpen(true);
  }, [setIsExportOpen]);

  const columns = useAccountInquiryColumns(handleRowExportClick);

  const toolbarActions = useMemo(
    () =>
      ACCOUNT_INQUIRY_TOOLBAR_ACTIONS.map((action) => ({
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
    console.log("Exporting account inquiry table", { format, email });
  }, []);

  const handleExport = useCallback((format: string, email: string) => {
    if (selectedRowForExport) {
      console.log("Exporting account inquiry row", {
        format,
        email,
        id: selectedRowForExport.id,
      });
      return;
    }
    console.log("Exporting account inquiry table", {
      format,
      email,
    });
  }, [selectedRowForExport]);

  return (
    <>
      <DataTable<AccountInquiryRecord>
        data={filteredData}
        columns={columns}
        header={{
          title: "Balance Statements",
          description: "Review all account inquiry activities",
        }}
        toolbar={{
          search: {
            placeholder: ACCOUNT_INQUIRY_SEARCH_PLACEHOLDER,
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
              ? ACCOUNT_INQUIRY_EMPTY_STATE.filteredTitle
              : ACCOUNT_INQUIRY_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? ACCOUNT_INQUIRY_EMPTY_STATE.filteredDescription
              : ACCOUNT_INQUIRY_EMPTY_STATE.defaultDescription,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: ACCOUNT_INQUIRY_PAGE_SIZE,
          pageSizeOptions: ACCOUNT_INQUIRY_PAGE_SIZE_OPTIONS,
        }}
        dataGridOptions={ACCOUNT_INQUIRY_DATA_GRID_OPTIONS}
        loading={loading}
        error={error ?? undefined}
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
          placeholder: ACCOUNT_INQUIRY_DATE_FILTER_PLACEHOLDER,
          dateTypeOptions: [{ label: "Activity Date", value: "activityDate" }],
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
        title={selectedRowForExport ? "Export Activity" : "Export"}
        description={
          selectedRowForExport
            ? `Account Number ${selectedRowForExport.accountNumber}`
            : undefined
        }
        onExport={handleExport}
      />
    </>
  );
}


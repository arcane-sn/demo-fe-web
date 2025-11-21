"use client";

import React, { useMemo, useState, useCallback } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { AccountData, AccountServiceTableProps } from "./core";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { getAccountColumns } from "./core/hooks/columnData";
import AccountDetailsDialog from "../account-details-dialog";
import { useDialogStore } from "../../core/hooks/use-dialog";
import { useAccountListFilters } from "./core/hooks/useAccountListFilters";
import {
  ACCOUNT_LIST_SEARCH_FIELDS,
  ACCOUNT_LIST_SEARCH_PLACEHOLDER,
  ACCOUNT_LIST_TOOLBAR_ACTIONS,
  ACCOUNT_LIST_PAGE_SIZE,
  ACCOUNT_LIST_PAGE_SIZE_OPTIONS,
  ACCOUNT_LIST_DATE_FILTER_PLACEHOLDER,
  ACCOUNT_LIST_EMPTY_STATE,
  ACCOUNT_LIST_DATE_TYPE_OPTIONS,
} from "./core/constants";

const AccountListTable: React.FC<AccountServiceTableProps> = ({
  data,
  loading,
  error,
  onDelete,
  onEdit,
  onSelectionChange,
  onView,
  onOpenExport,
}) => {
  const { copyToClipboard } = useCopyToClipboard();
  const [selectedAccount, setSelectedAccount] = useState<
    AccountData | undefined
  >(undefined);
  const [selectedRowForExport, setSelectedRowForExport] =
    useState<AccountData | null>(null);
  const { openAccountDetails, closeAccountDetails } = useDialogStore();

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
    selectedAccessLevels,
    selectedRoles,
    selectedAccountStatuses,
    selectedAdditionalStatuses,
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
    handleRemoveAccessLevel,
    handleRemoveRole,
    handleRemoveAccountStatus,
    handleRemoveAdditionalStatus,
    activeFilterCount,
  } = useAccountListFilters(data);

  const columns = useMemo(
    () => getAccountColumns({ copyToClipboard }),
    [copyToClipboard]
  );

  const handleRowExportClick = useCallback(
    (row: AccountData) => {
      setSelectedRowForExport(row);
      setIsExportOpen(true);
    },
    [setIsExportOpen]
  );

  const toolbarActions = useMemo(
    () =>
      ACCOUNT_LIST_TOOLBAR_ACTIONS.map((action) => ({
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

  const handleToolbarExport = useCallback(
    (format: string, email: string) => {
      console.log("Exporting account list table", { format, email });
      if (onOpenExport) {
        onOpenExport();
      }
    },
    [onOpenExport]
  );

  const handleExport = useCallback(
    (format: string, email: string) => {
      if (selectedRowForExport) {
        console.log("Exporting account row", {
          format,
          email,
          id: selectedRowForExport.id,
        });
        return;
      }
      handleToolbarExport(format, email);
    },
    [selectedRowForExport, handleToolbarExport]
  );

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      const dateTypeLabel =
        ACCOUNT_LIST_DATE_TYPE_OPTIONS.find(
          (option) => option.value === dateType
        )?.label ?? ACCOUNT_LIST_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateTypeLabel,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedAccessLevels.length > 0) {
      tags.push({
        id: "access-level-filter",
        label: "Access Level",
        value: selectedAccessLevels.join(", "),
        onRemove: handleRemoveAccessLevel,
      });
    }
    if (selectedRoles.length > 0) {
      tags.push({
        id: "role-filter",
        label: "Role",
        value: selectedRoles.join(", "),
        onRemove: handleRemoveRole,
      });
    }
    if (selectedAccountStatuses.length > 0) {
      tags.push({
        id: "account-status-filter",
        label: "Account Status",
        value: selectedAccountStatuses.join(", "),
        onRemove: handleRemoveAccountStatus,
      });
    }
    if (selectedAdditionalStatuses.length > 0) {
      tags.push({
        id: "additional-status-filter",
        label: "Additional Status",
        value: selectedAdditionalStatuses.join(", "),
        onRemove: handleRemoveAdditionalStatus,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    dateType,
    selectedAccessLevels,
    selectedRoles,
    selectedAccountStatuses,
    selectedAdditionalStatuses,
    handleRemoveDate,
    handleRemoveAccessLevel,
    handleRemoveRole,
    handleRemoveAccountStatus,
    handleRemoveAdditionalStatus,
  ]);

  return (
    <>
      <AccountDetailsDialog
        visible={false}
        close={() => {
          console.log("close account details dialog");
          closeAccountDetails();
        }}
        accountData={selectedAccount}
      />

      <DataTable<AccountData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Account List",
          description: "Manage your accounts",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: ACCOUNT_LIST_SEARCH_PLACEHOLDER,
            value: searchValue,
            onChange: setSearchValue,
            fields: ACCOUNT_LIST_SEARCH_FIELDS,
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
              ? ACCOUNT_LIST_EMPTY_STATE.filteredTitle
              : ACCOUNT_LIST_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? ACCOUNT_LIST_EMPTY_STATE.filteredDescription
              : ACCOUNT_LIST_EMPTY_STATE.defaultDescription,
          hasActiveFilters:
            activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: ACCOUNT_LIST_PAGE_SIZE,
          pageSizeOptions: ACCOUNT_LIST_PAGE_SIZE_OPTIONS,
        }}
        enableRowSelection={false}
        onRowClick={(row) => {
          console.log("row clicked", row);
          setSelectedAccount(row);
          openAccountDetails();
        }}
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
          placeholder: ACCOUNT_LIST_DATE_FILTER_PLACEHOLDER,
          dateTypeOptions: ACCOUNT_LIST_DATE_TYPE_OPTIONS.map((option) => ({
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
        title={selectedRowForExport ? "Export Account" : "Export"}
        description={
          selectedRowForExport
            ? `Account ${selectedRowForExport.name} (${selectedRowForExport.userID})`
            : undefined
        }
        onExport={handleExport}
      />
    </>
  );
};

export default AccountListTable;

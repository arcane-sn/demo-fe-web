"use client";

import { useMemo, useState, useCallback } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { UserData } from "./core/types";
import { useUserListTableColumns } from "./user-list-table-columns";
import { searchFields } from "./config";
import { useUserManagementFilters } from "./core/hooks/useUserManagementFilters";
import {
  USER_MANAGEMENT_SEARCH_PLACEHOLDER,
  USER_MANAGEMENT_TOOLBAR_ACTIONS,
  USER_MANAGEMENT_DATA_GRID_OPTIONS,
  USER_MANAGEMENT_PAGE_SIZE,
  USER_MANAGEMENT_PAGE_SIZE_OPTIONS,
  USER_MANAGEMENT_DATE_FILTER_PLACEHOLDER,
  USER_MANAGEMENT_EMPTY_STATE,
  USER_MANAGEMENT_STATUS_OPTIONS,
  USER_MANAGEMENT_FILTER_LABELS,
  USER_MANAGEMENT_DATE_TYPE_OPTIONS,
  USER_MANAGEMENT_ROLE_OPTIONS,
} from "../../core/constants";
import AccountDetailsDialog from "../modal/account-details-dialog";

interface UserListTableProps {
  data: UserData[];
  loading?: boolean;
  error?: string | null;
}

export function UserListTable({
  data,
  loading = false,
  error,
}: UserListTableProps) {
  const [selectedRowForExport, setSelectedRowForExport] = useState<UserData | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | undefined>(undefined);
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false);

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
    handleRemoveRole,
    activeDateFilter,
    selectedStatuses,
    selectedRoles,
    dateType,
    activeFilterCount,
  } = useUserManagementFilters(data);

  const columns = useUserListTableColumns();

  const toolbarActions = useMemo(
    () =>
      USER_MANAGEMENT_TOOLBAR_ACTIONS.map((action) => ({
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
      console.log("Exporting user row", {
        format,
        email,
        id: selectedRowForExport.id,
      });
      return;
    }
    console.log("Exporting user management table", {
      format,
      email,
    });
  }, [selectedRowForExport]);

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      const dateTypeLabel =
        USER_MANAGEMENT_DATE_TYPE_OPTIONS.find(
          (option) => option.value === dateType,
        )?.label ?? USER_MANAGEMENT_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label: dateTypeLabel,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedStatuses.length > 0) {
      const statusLabels = selectedStatuses.map((status) => {
        const option = USER_MANAGEMENT_STATUS_OPTIONS.find((opt) => opt.value === status);
        return option?.label || status;
      });
      tags.push({
        id: "status-filter",
        label: USER_MANAGEMENT_FILTER_LABELS.STATUS,
        value: statusLabels.join(", "),
        onRemove: handleRemoveStatus,
      });
    }
    if (selectedRoles.length > 0) {
      const roleLabels = selectedRoles.map((role) => {
        const option = USER_MANAGEMENT_ROLE_OPTIONS.find((opt) => opt.value === role);
        return option?.label || role;
      });
      tags.push({
        id: "role-filter",
        label: USER_MANAGEMENT_FILTER_LABELS.ROLE,
        value: roleLabels.join(", "),
        onRemove: handleRemoveRole,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    selectedStatuses,
    selectedRoles,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveRole,
    dateType,
  ]);

  return (
    <>
      <AccountDetailsDialog
        visible={isUserDetailsDialogOpen}
        close={() => {
          setIsUserDetailsDialogOpen(false);
          setSelectedUser(undefined);
        }}
        accountData={selectedUser}
      />
      <DataTable<UserData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Account List",
          description: "View and manage all registered accounts",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: USER_MANAGEMENT_SEARCH_PLACEHOLDER,
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
              ? USER_MANAGEMENT_EMPTY_STATE.filteredTitle
              : USER_MANAGEMENT_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? USER_MANAGEMENT_EMPTY_STATE.filteredDescription
              : USER_MANAGEMENT_EMPTY_STATE.defaultDescription,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: USER_MANAGEMENT_PAGE_SIZE,
          pageSizeOptions: [...USER_MANAGEMENT_PAGE_SIZE_OPTIONS],
        }}
        dataGridOptions={USER_MANAGEMENT_DATA_GRID_OPTIONS}
        loading={loading}
        error={error ?? undefined}
        enableRowSelection={false}
        onRowClick={(row) => {
          setSelectedUser(row);
          setIsUserDetailsDialogOpen(true);
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
            setDraftDateFilterString("");
            setDraftDateRange(undefined);
          },
          placeholder: USER_MANAGEMENT_DATE_FILTER_PLACEHOLDER,
          presetDisplayValue: "01/12/2025 - 31/12/2025",
          dateTypeOptions: USER_MANAGEMENT_DATE_TYPE_OPTIONS.map((option) => ({
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
        title={selectedRowForExport ? "Export User" : "Export"}
        description={
          selectedRowForExport
            ? `User ${selectedRowForExport.name} (${selectedRowForExport.userID})`
            : undefined
        }
        onExport={handleExport}
      />
    </>
  );
}

export default UserListTable;


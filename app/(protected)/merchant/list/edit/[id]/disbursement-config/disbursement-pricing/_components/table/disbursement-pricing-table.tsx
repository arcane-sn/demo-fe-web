"use client";

import { useMemo, useState, useCallback } from "react";
import { DataTable } from "@/components/reusable/table";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { BankData } from "../../_lib/types";
import { useDisbursementPricingColumns } from "./disbursement-pricing-table-columns";
import { searchFields } from "./config";
import { KeenIcon } from "@/components/keenicons";
import {
  DISBURSEMENT_PRICING_SEARCH_PLACEHOLDER,
  DISBURSEMENT_PRICING_TOOLBAR_ACTIONS,
  DISBURSEMENT_PRICING_DATA_GRID_OPTIONS,
  DISBURSEMENT_PRICING_PAGE_SIZE,
  DISBURSEMENT_PRICING_PAGE_SIZE_OPTIONS,
  DISBURSEMENT_PRICING_EMPTY_STATE,
  DISBURSEMENT_PRICING_STATUS_OPTIONS,
  DISBURSEMENT_PRICING_FILTER_LABELS,
} from "../../_lib/constants";

interface DisbursementPricingTableProps {
  data: BankData[];
  loading?: boolean;
  error?: string | null;
  onEdit?: (bankData: BankData) => void;
  onDelete?: (bankData: BankData) => void;
  onSelectionChange?: (selectedBanks: BankData[]) => void;
}

export function DisbursementPricingTable({
  data,
  loading = false,
  error,
  onEdit,
  onDelete,
  onSelectionChange,
}: DisbursementPricingTableProps) {
  const [selectedRowForExport, setSelectedRowForExport] = useState<BankData | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(searchFields[0].value);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchValue.trim()) {
      const normalized = searchValue.toLowerCase();
      result = result.filter((row) => {
        if (searchField === "bankCode") {
          return row.bankCode.toLowerCase().includes(normalized);
        }
        if (searchField === "bankName") {
          return row.bankName.toLowerCase().includes(normalized);
        }
        if (searchField === "salesReferralId") {
          return row.salesReferralId.toLowerCase().includes(normalized);
        }
        if (searchField === "merchantReferralId") {
          return row.merchantReferralId.toLowerCase().includes(normalized);
        }
        return false;
      });
    }

    // Apply status filter
    if (selectedStatuses.length > 0) {
      result = result.filter((row) => selectedStatuses.includes(row.status));
    }

    return result;
  }, [data, searchValue, searchField, selectedStatuses]);

  const handleRowExportClick = useCallback((row: BankData) => {
    setSelectedRowForExport(row);
    setIsExportOpen(true);
  }, []);

  const columns = useDisbursementPricingColumns();

  const toolbarActions = useMemo(
    () =>
      DISBURSEMENT_PRICING_TOOLBAR_ACTIONS.map((action) => ({
        ...action,
        onClick:
          action.id === "filter"
            ? () => setIsFilterOpen(true)
            : () => {
                setSelectedRowForExport(null);
                setIsExportOpen(true);
              },
      })),
    [],
  );

  const handleToolbarExport = useCallback((format: string, email: string) => {
    console.log("Exporting disbursement pricing table", { format, email });
  }, []);

  const handleExport = useCallback((format: string, email: string) => {
    if (selectedRowForExport) {
      console.log("Exporting bank row", {
        format,
        email,
        id: selectedRowForExport.id,
      });
      return;
    }
    console.log("Exporting disbursement pricing table", {
      format,
      email,
    });
  }, [selectedRowForExport]);

  const headerTags = useMemo(() => {
    const tags = [];
    if (selectedStatuses.length > 0) {
      const statusLabels = selectedStatuses.map((status) => {
        const option = DISBURSEMENT_PRICING_STATUS_OPTIONS.find((opt) => opt.value === status);
        return option?.label || status;
      });
      tags.push({
        id: "status-filter",
        label: DISBURSEMENT_PRICING_FILTER_LABELS.STATUS,
        value: statusLabels.join(", "),
        onRemove: () => setSelectedStatuses([]),
      });
    }
    return tags;
  }, [selectedStatuses]);

  const activeFilterCount = selectedStatuses.length;

  const handleResetFilters = useCallback(() => {
    setSelectedStatuses([]);
    setSearchValue("");
  }, []);

  const handleStatusOptionChange = useCallback((optionId: string, checked: boolean) => {
    setSelectedStatuses((prev) => {
      if (checked) {
        return [...prev, optionId];
      } else {
        return prev.filter((id) => id !== optionId);
      }
    });
  }, []);

  const handleStatusSelectAll = useCallback(() => {
    setSelectedStatuses(DISBURSEMENT_PRICING_STATUS_OPTIONS.map((opt) => opt.value));
  }, []);

  const handleStatusClear = useCallback(() => {
    setSelectedStatuses([]);
  }, []);

  const handleFilterApply = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  const filterSections = useMemo(
    () => [
      {
        id: "status",
        title: DISBURSEMENT_PRICING_FILTER_LABELS.STATUS,
        options: DISBURSEMENT_PRICING_STATUS_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
          checked: selectedStatuses.includes(option.value),
        })),
        onOptionChange: handleStatusOptionChange,
        onSelectAll: handleStatusSelectAll,
        onClear: handleStatusClear,
      },
    ],
    [selectedStatuses, handleStatusOptionChange, handleStatusSelectAll, handleStatusClear],
  );

  return (
    <>
      <DataTable<BankData>
        data={filteredData}
        columns={columns}
        actionConfig={{
          showDropdown: false,
          actions: [
            {
              label: "",
              icon: (
                <KeenIcon
                  icon="notepad-edit"
                  style="outline"
                  className="text-lg border border-gray-300 text-gray-600 rounded-md p-1"
                />
              ),
              onClick: (row) => {
                onEdit?.(row.original);
              },
            },
          ],
        }}
        header={{
          title: "Bank List",
          description: "All banks pricing setup to this merchant",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: DISBURSEMENT_PRICING_SEARCH_PLACEHOLDER,
            value: searchValue,
            onChange: setSearchValue,
            fields: [...searchFields],
            selectedField: searchField,
            onFieldChange: (value: string) => setSearchField(value),
          },
          actions: toolbarActions,
          showColumnVisibility: true,
          activeFilterCount,
          onClearFilters: handleResetFilters,
        }}
        emptyState={{
          title:
            activeFilterCount > 0 || searchValue.trim()
              ? DISBURSEMENT_PRICING_EMPTY_STATE.filteredTitle
              : DISBURSEMENT_PRICING_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? DISBURSEMENT_PRICING_EMPTY_STATE.filteredDescription
              : DISBURSEMENT_PRICING_EMPTY_STATE.defaultDescription,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: DISBURSEMENT_PRICING_PAGE_SIZE,
          pageSizeOptions: [...DISBURSEMENT_PRICING_PAGE_SIZE_OPTIONS],
        }}
        dataGridOptions={DISBURSEMENT_PRICING_DATA_GRID_OPTIONS}
        loading={loading}
        error={error ?? undefined}
        enableRowSelection={true}
        onSelectionChange={onSelectionChange}
      />

      <FilterModal
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
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
  );
}


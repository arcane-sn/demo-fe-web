"use client";

import { TableConfig } from "@/components/table";
import { ActionCellConfig, EmptyStateConfig } from "@/components/table/types";
import { BalanceRequestData } from "../../../core/_model";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleCheck, Download, Search, XCircle } from "lucide-react";

export interface BalanceRequestTableConfigProps {
  data: BalanceRequestData[];
  onOpenExport: () => void;
  onOpenFilter: () => void;
  seeDetail: (row: BalanceRequestData) => void;
  approveRequest: (row: BalanceRequestData) => void;
  rejectRequest: (row: BalanceRequestData) => void;
}

export function useBalanceRequestTableConfig({
  data,
  onOpenExport,
  onOpenFilter,
  seeDetail,
  approveRequest,
  rejectRequest,
}: BalanceRequestTableConfigProps) {
  // Define action configuration
  const actionConfig: ActionCellConfig<BalanceRequestData> = {
    actions: [
      {
        label: "See Detail",
        icon: <Search className="h-4 w-4" />,
        onClick: (row) => seeDetail?.(row.original),
      },
      {
        label: "Approve Request",
        icon: <CircleCheck className="h-4 w-4 text-success" />,
        onClick: (row) => approveRequest?.(row.original),
      },
      {
        label: "Reject Request",
        icon: <XCircle className="h-4 w-4 text-danger" />,
        onClick: (row) => rejectRequest?.(row.original),
      },
    ],
    showDropdown: true,
  };
  // Define table configuration (without columns - will be added in main component)
  const tableConfig: Omit<TableConfig<BalanceRequestData>, "columns"> = {
    data,
    enableRowSelection: true,
    enableSorting: true,
    enablePagination: true,
    enableColumnVisibility: true,
    enableColumnResizing: false,
    pageSize: 10,
    searchable: true,
    searchPlaceholder: "Search requests...",
    searchFields: [
      "merchantName",
      "clientId",
      "notesReason",
    ] as (keyof BalanceRequestData)[],

    // SearchBar configuration
    showSearchBar: true,
    searchBarPlaceholder: "Search balance requests",
    searchBarOptions: [
      { value: "merchantName", label: "Merchant Name" },
      { value: "clientId", label: "Client ID" },
      { value: "notesReason", label: "Notes/Reason" },
      { value: "requestedBy", label: "Requested By" },
    ],
    customFilters: [
      {
        id: "status",
        label: "Status",
        type: "multiselect" as const,
        options: [
          { label: "Pending", value: "pending", count: 3 },
          { label: "Approved", value: "approved", count: 2 },
          { label: "Rejected", value: "rejected", count: 2 },
          { label: "Processing", value: "processing", count: 1 },
        ],
      },
      {
        id: "activityType",
        label: "Activity Type",
        type: "multiselect" as const,
        options: [
          { label: "Top Up", value: "topup", count: 3 },
          { label: "Withdrawal", value: "withdrawal", count: 3 },
          { label: "Adjustment", value: "adjustment", count: 2 },
        ],
      },
      {
        id: "dateRange",
        label: "Date Range",
        type: "multiselect" as const,
        options: [
          { label: "Today", value: "today", count: 0 },
          { label: "Yesterday", value: "yesterday", count: 0 },
          { label: "Last 7 days", value: "last7days", count: 8 },
          { label: "Last 30 days", value: "last30days", count: 8 },
        ],
      },
    ],
  };

  // Define header configuration
  const headerConfig = {
    title: "Balance Requests",
    subtitle: "View and review submitted balance requests",
    showRecordCount: true,
  };

  // Define toolbar configuration
  const toolbarConfig = {
    showSearch: false,
    showSearchBar: true,
    showFilters: true,
    showColumnVisibility: false,
    searchPlaceholder: "Search requests...",
    searchBarPlaceholder: "Search balance requests",
    searchBarOptions: [
      { value: "merchantName", label: "Merchant Name" },
      { value: "clientId", label: "Client ID" },
      { value: "notesReason", label: "Notes/Reason" },
      { value: "requestedBy", label: "Requested By" },
    ],
    showCustomActions: true,
    customActions: (
      <Button variant="outline" onClick={onOpenExport}>
        <Download className="h-4 w-4" /> Export
      </Button>
    ),
    onFilterPressed: () => {
      onOpenFilter();
    },
  };

  // Define footer configuration
  const footerConfig = {
    showPagination: true,
    showRowCount: true,
    showSelectedCount: true,
  };

  // Custom illustration component for balance request empty state
  const BalanceRequestEmptyIllustration = () => (
    <Image
      src="/assets/image/puzzle.svg"
      alt="Empty State Illustration"
      width={150}
      height={150}
    />
  );

  // Define empty state configuration
  const emptyStateConfig: EmptyStateConfig = {
    title: "No Balance Requests",
    description:
      "Looks like you don't have any balance requests yet. Requests will appear here once merchants submit them.",
    illustration: <BalanceRequestEmptyIllustration />,
  };

  return {
    tableConfig,
    actionConfig,
    headerConfig,
    toolbarConfig,
    footerConfig,
    emptyStateConfig,
  };
}

"use client";

import { TableConfig } from "@/components/table";
import { EmptyStateConfig } from "@/components/table/types";
import { Download } from "lucide-react";
import { BalanceStatementData } from "../../../core/_model";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface BalanceStatementTableConfigProps {
  data: BalanceStatementData[];
  onOpenFilters: () => void;
  onOpenExport: () => void;
}

export function useBalanceStatementTableConfig({
  data,
  onOpenFilters,
  onOpenExport,
}: BalanceStatementTableConfigProps) {
  // Define table configuration (without columns - will be added in main component)
  const tableConfig: Omit<TableConfig<BalanceStatementData>, "columns"> = {
    data,
    enableRowSelection: false,
    enableSorting: true,
    enablePagination: true,
    enableColumnVisibility: true,
    enableColumnResizing: false,
    pageSize: 10,
    searchable: true,
    searchPlaceholder: "Search transactions...",
    searchFields: [
      "merchantName",
      "clientId",
      "referenceNumber",
      "partnerReferenceNumber",
    ] as (keyof BalanceStatementData)[],

    // SearchBar configuration
    showSearchBar: true,
    searchBarPlaceholder: "Search transaction details",
    searchBarOptions: [
      { value: "merchantName", label: "Merchant Name" },
      { value: "clientId", label: "Client ID" },
      { value: "referenceNumber", label: "Reference Number" },
      { value: "partnerReferenceNumber", label: "Partner Reference" },
      { value: "transactionRemark", label: "Transaction Remark" },
    ],
    customFilters: [
      {
        id: "transactionType",
        label: "Transaction Type",
        type: "multiselect" as const,
        options: [
          { label: "Transfer", value: "transfer", count: 4 },
          { label: "Top Up", value: "topup", count: 2 },
          { label: "Withdrawal", value: "withdrawal", count: 1 },
          { label: "Adjustment", value: "adjustment", count: 1 },
        ],
      },
      {
        id: "status",
        label: "Status",
        type: "multiselect" as const,
        options: [
          { label: "Success", value: "success", count: 5 },
          { label: "Pending", value: "pending", count: 1 },
          { label: "Failed", value: "failed", count: 1 },
          { label: "Cancelled", value: "cancelled", count: 1 },
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
    title: "Balance Statement",
    showRecordCount: true,
  };

  // Define toolbar configuration
  const toolbarConfig = {
    showSearch: false,
    showSearchBar: true,
    showFilters: true,
    onFilterPressed: () => {
      onOpenFilters();
    },
    showColumnVisibility: false,
    searchPlaceholder: "Search transactions...",
    searchBarPlaceholder: "Search transaction details",
    searchBarOptions: [
      { value: "merchantName", label: "Merchant Name" },
      { value: "clientId", label: "Client ID" },
      { value: "referenceNumber", label: "Reference Number" },
      { value: "partnerReferenceNumber", label: "Partner Reference" },
      { value: "transactionRemark", label: "Transaction Remark" },
    ],
    showCustomActions: true,
    customActions: (
      <Button variant="outline" onClick={onOpenExport}>
        <Download className="h-4 w-4" /> Export
      </Button>
    ),
  };

  // Define footer configuration
  const footerConfig = {
    showPagination: true,
    showRowCount: true,
    showSelectedCount: true,
  };

  // Custom illustration component for balance statement empty state
  const BalanceStatementEmptyIllustration = () => (
    <Image
      src="/assets/image/puzzle.svg"
      alt="Empty State Illustration"
      width={150}
      height={150}
    />
  );

  // Define empty state configuration
  const emptyStateConfig: EmptyStateConfig = {
    title: "No Balance Statement Data",
    description:
      "Looks like you don't have any balance statement data yet. Transactions will appear here once merchants start transacting.",
    illustration: <BalanceStatementEmptyIllustration />,
  };

  return {
    tableConfig,
    headerConfig,
    toolbarConfig,
    footerConfig,
    emptyStateConfig,
  };
}

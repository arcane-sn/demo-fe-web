"use client";

import { TableConfig, ActionCellConfig } from "@/components/table";
import { EmptyStateConfig } from "@/components/table/types";
import {
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Upload,
  FolderSync,
  FileSymlink,
  ShieldClose,
  Download,
} from "lucide-react";
import { MerchantBalanceData } from "../../../core/_model";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface MerchantBalanceTableConfigProps {
  data: MerchantBalanceData[];
  topUpBalance?: (merchant: MerchantBalanceData) => void;
  balanceAdjustment?: (merchant: MerchantBalanceData) => void;
  releaseBalance?: (merchant: MerchantBalanceData) => void;
  holdBalance?: (merchant: MerchantBalanceData) => void;
  onOpenExport: () => void;
}

export function useMerchantBalanceTableConfig({
  data,
  topUpBalance,
  balanceAdjustment,
  releaseBalance,
  holdBalance,
  onOpenExport,
}: MerchantBalanceTableConfigProps) {
  // Define action configuration
  const actionConfig: ActionCellConfig<MerchantBalanceData> = {
    actions: [
      {
        label: "Top-Up Balance",
        icon: <Upload className="h-4 w-4" />,
        onClick: (row) => topUpBalance?.(row.original),
      },
      {
        label: "Balance Adjustment",
        icon: <FolderSync className="h-4 w-4" />,
        onClick: (row) => balanceAdjustment?.(row.original),
      },
      {
        label: "Release Balance",
        icon: <FileSymlink className="h-4 w-4" />,
        onClick: (row) => releaseBalance?.(row.original),
      },
      {
        label: "Hold Balance",
        icon: <ShieldClose className="h-4 w-4" />,
        variant: "destructive",
        onClick: (row) => holdBalance?.(row.original),
      },
    ],
    showDropdown: true,
  };

  // Define table configuration (without columns - will be added in main component)
  const tableConfig: Omit<TableConfig<MerchantBalanceData>, "columns"> = {
    data,
    enableRowSelection: false,
    enableSorting: true,
    enablePagination: true,
    enableColumnVisibility: true,
    enableColumnResizing: false,
    pageSize: 10,
    searchable: true,
    searchPlaceholder: "Search merchants...",
    searchFields: ["merchantName", "clientId"] as (keyof MerchantBalanceData)[],

    // SearchBar configuration
    showSearchBar: true,
    searchBarPlaceholder: "Search merchant name",
    searchBarOptions: [
      { value: "merchantName", label: "Merchant Name" },
      { value: "clientId", label: "Client ID" },
      { value: "status", label: "Status" },
      { value: "merchantLevel", label: "Merchant Level" },
    ],
    customFilters: [
      {
        id: "merchantLevel",
        label: "Merchant Level",
        type: "multiselect" as const,
        options: [
          { label: "Level 0", value: "Level 0", count: 1 },
          { label: "Level 1", value: "Level 1", count: 4 },
          { label: "Level 2", value: "Level 2", count: 3 },
        ],
      },
      {
        id: "status",
        label: "Status",
        type: "multiselect" as const,
        options: [
          { label: "Active", value: "active", count: 7 },
          { label: "Inactive", value: "inactive", count: 1 },
          { label: "Suspended", value: "suspended", count: 0 },
        ],
      },
      {
        id: "balanceRange",
        label: "Balance Range",
        type: "multiselect" as const,
        options: [
          { label: "0 - 50M", value: "0-50m", count: 1 },
          { label: "50M - 100M", value: "50m-100m", count: 2 },
          { label: "100M - 200M", value: "100m-200m", count: 2 },
          { label: "200M - 400M", value: "200m-400m", count: 3 },
        ],
      },
    ],
  };

  // Define header configuration
  const headerConfig = {
    title: "Merchant Balance Summary",
    subtitle: "",
    showRecordCount: true,
  };

  // Define toolbar configuration
  const toolbarConfig = {
    showSearch: false,
    showSearchBar: true,
    showFilters: false,
    showColumnVisibility: true,
    searchPlaceholder: "Search merchants...",
    searchBarPlaceholder: "Search merchant name",
    searchBarOptions: [
      { value: "merchantName", label: "Merchant Name" },
      { value: "clientId", label: "Client ID" },
      { value: "status", label: "Status" },
      { value: "merchantLevel", label: "Merchant Level" },
      { value: "lastActivity", label: "Last Activity" },
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

  // Custom illustration component for merchant balance empty state
  const MerchantBalanceEmptyIllustration = () => (
    <Image
      src="/assets/image/puzzle.svg"
      alt="Empty State Illustration"
      width={150}
      height={150}
    />
  );

  // Define empty state configuration
  const emptyStateConfig: EmptyStateConfig = {
    title: "No Merchant Balances Yet",
    description:
      "Looks like you don't have any merchant balance data. Merchants will appear here once they start transacting.",
    illustration: <MerchantBalanceEmptyIllustration />,
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

import { useMemo } from "react";
import { PermissionData, PermissionTableConfig } from "../types";
import {
  defaultPermissionSearchConfig,
  searchPlaceholders,
} from "../config/search-config";
import { TableFilter } from "@/components/table/types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface UsePermissionTableConfigProps {
  data: PermissionData[];
  columns: any[];
  onOpenExport?: () => void;
}

export function usePermissionTableConfig({
  data,
  columns,
  onOpenExport,
}: UsePermissionTableConfigProps): {
  tableConfig: PermissionTableConfig;
  toolbarConfig: any;
} {
  // Define custom filters for permission list
  const customFilters: TableFilter[] = [
    {
      id: "service",
      label: "Service",
      type: "select",
      options: [
        { label: "Merchant Management", value: "Merchant Management" },
        { label: "Channel Configuration", value: "Channel Configuration" },
        { label: "Merchant Pricing", value: "Merchant Pricing" },
        { label: "Transaction Management", value: "Transaction Management" },
        { label: "User Management", value: "User Management" },
      ],
    },
    {
      id: "createdDate",
      label: "Created Date",
      type: "dateRange",
    },
  ];

  const tableConfig: PermissionTableConfig = useMemo(
    () => ({
      data,
      columns,
      enableRowSelection: false,
      enableSorting: true,
      enablePagination: true,
      enableColumnVisibility: false, // Hide column visibility
      enableColumnResizing: true,
      pageSize: 10,
      // Simple search configuration like merchant list
      searchable: true,
      searchFields: defaultPermissionSearchConfig.searchFields,
      searchPlaceholder: "Search permissions",
      // Add custom filters
      customFilters,
    }),
    [data, columns]
  );

  // Define toolbar configuration with export button
  const toolbarConfig = {
    showSearch: true,
    showFilters: true,
    showColumnVisibility: false, // Hide column visibility button
    searchPlaceholder: "Search permissions",
    showCustomActions: true,
    customActions: onOpenExport ? (
      <Button variant="outline" onClick={onOpenExport}>
        <Download className="h-4 w-4" /> Export
      </Button>
    ) : null,
  };

  return {
    tableConfig,
    toolbarConfig,
  };
}

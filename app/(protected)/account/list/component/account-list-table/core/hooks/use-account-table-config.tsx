import { useMemo } from "react";
import { AccountData, AccountTableConfig } from "../types";
import {
  defaultAccountSearchConfig,
  searchPlaceholders,
} from "../config/search-config";
import { TableFilter } from "@/components/table/types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface UseAccountTableConfigProps {
  data: AccountData[];
  columns: any[];
  onOpenExport?: () => void;
}

export function useAccountTableConfig({
  data,
  columns,
  onOpenExport,
}: UseAccountTableConfigProps): {
  tableConfig: AccountTableConfig;
  toolbarConfig: any;
} {
  // Define custom filters for account list
  const customFilters: TableFilter[] = [
    {
      id: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Pending", value: "pending" },
      ],
    },
    {
      id: "accountType",
      label: "Account Type",
      type: "select",
      options: [
        { label: "Individual", value: "individual" },
        { label: "Business", value: "business" },
        { label: "Premium", value: "premium" },
      ],
    },
    {
      id: "createdDate",
      label: "Created Date",
      type: "dateRange",
    },
  ];

  const tableConfig: AccountTableConfig = useMemo(
    () => ({
      data,
      columns,
      enableRowSelection: false,
      enableSorting: true,
      enablePagination: true,
      enableColumnVisibility: true,
      enableColumnResizing: true,
      pageSize: 10,
      // Spread search configuration properties
      searchable: defaultAccountSearchConfig.searchable,
      searchFields: defaultAccountSearchConfig.searchFields,
      showSearchBar: defaultAccountSearchConfig.showSearchBar,
      searchBarPlaceholder: defaultAccountSearchConfig.searchBarPlaceholder,
      searchBarOptions: defaultAccountSearchConfig.searchBarOptions,
      searchBarPlaceholderMapping: searchPlaceholders,
      // searchPosition: "bottom", // Set search position to bottom for account list
      // Add custom filters
      customFilters,
    }),
    [data, columns]
  );

  // Define toolbar configuration with export button
  const toolbarConfig = {
    showSearch: true,
    showFilters: true,
    showColumnVisibility: false,
    searchPlaceholder: "Search accounts...",
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

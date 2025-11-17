"use client";

import React from "react";
import { ReusableTable, TableConfig } from "@/components/table";
import { useBalanceStatementTableColumns } from "./balance-statement-table-columns";
import { useBalanceStatementTableConfig } from "./config";
import { BalanceStatementData } from "../../core/_model";

interface BalanceStatementTableProps {
  data: BalanceStatementData[];
  onRowClick?: (transaction: BalanceStatementData) => void;
  onSelectionChange?: (selectedTransactions: BalanceStatementData[]) => void;
  loading?: boolean;
  error?: string;
  onOpenFilters: () => void;
  onOpenExport: () => void;
}

export function BalanceStatementTable({
  data,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
  onOpenFilters,
  onOpenExport,
}: BalanceStatementTableProps) {
  // Get columns from custom hook
  const columns = useBalanceStatementTableColumns();

  // Get table configuration from custom hook
  const {
    tableConfig,
    headerConfig,
    toolbarConfig,
    footerConfig,
    emptyStateConfig,
  } = useBalanceStatementTableConfig({
    data,
    onOpenFilters,
    onOpenExport,
  });

  // Add columns to table config
  const finalTableConfig: TableConfig<BalanceStatementData> = {
    ...tableConfig,
    ...toolbarConfig,
    columns,
  };

  const handleRowClick = (row: any) => {
    if (onRowClick) {
      if (row && row.original) {
        onRowClick(row.original);
      } else if (row && row.id) {
        onRowClick(row);
      } else {
        console.error("Invalid row data received:", row);
      }
    }
  };

  return (
    <div>
      <ReusableTable
        config={finalTableConfig}
        headerConfig={headerConfig}
        toolbarConfig={toolbarConfig}
        footerConfig={footerConfig}
        emptyStateConfig={emptyStateConfig}
        onRowClick={handleRowClick}
        onSelectionChange={onSelectionChange}
        onFilterPressed={onOpenFilters}
        loading={loading}
        error={error}
      />
    </div>
  );
}

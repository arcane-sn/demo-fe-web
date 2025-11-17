"use client";

import React from "react";
import { ReusableTable, TableConfig } from "@/components/table";
import { useBalanceRequestTableColumns } from "./balance-request-table-columns";
import { useBalanceRequestTableConfig } from "./config";
import { BalanceRequestData } from "../../core/_model";

interface BalanceRequestTableProps {
  data: BalanceRequestData[];
  onRowClick?: (request: BalanceRequestData) => void;
  onSelectionChange?: (selectedRequests: BalanceRequestData[]) => void;
  loading?: boolean;
  error?: string;
  onOpenExport: () => void;
  onOpenFilter: () => void;
  seeDetail: (row: BalanceRequestData) => void;
  approveRequest: (row: BalanceRequestData) => void;
  rejectRequest: (row: BalanceRequestData) => void;
}

export function BalanceRequestTable({
  data,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
  onOpenExport,
  onOpenFilter,
  seeDetail,
  approveRequest,
  rejectRequest,
}: BalanceRequestTableProps) {
  // Get columns from custom hook
  const columns = useBalanceRequestTableColumns();

  // Get table configuration from custom hook
  const {
    tableConfig,
    actionConfig,
    headerConfig,
    toolbarConfig,
    footerConfig,
    emptyStateConfig,
  } = useBalanceRequestTableConfig({
    data,
    onOpenExport,
    onOpenFilter,
    seeDetail,
    approveRequest,
    rejectRequest,
  });

  // Add columns to table config
  const finalTableConfig: TableConfig<BalanceRequestData> = {
    ...tableConfig,
    ...toolbarConfig,
    columns,
  };

  const handleSelectionChange = (selectedRows: BalanceRequestData[]) => {
    console.log("Table selection changed:", selectedRows.length, "items");
    if (onSelectionChange) {
      onSelectionChange(selectedRows);
    }
  };

  return (
    <div>
      <ReusableTable
        config={finalTableConfig}
        headerConfig={headerConfig}
        actionConfig={actionConfig}
        toolbarConfig={toolbarConfig}
        footerConfig={footerConfig}
        emptyStateConfig={emptyStateConfig}
        onSelectionChange={handleSelectionChange}
        onFilterPressed={onOpenFilter}
        loading={loading}
        error={error}
      />
    </div>
  );
}

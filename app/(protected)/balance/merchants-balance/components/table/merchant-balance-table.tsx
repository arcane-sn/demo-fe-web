"use client";

import React from "react";
import { ReusableTable, TableConfig } from "@/components/table";
import { useMerchantBalanceTableColumns } from "./merchant-balance-table-columns";
import { useMerchantBalanceTableConfig } from "./config";
import { MerchantBalanceData } from "../../core/_model";

interface MerchantBalanceTableProps {
  data: MerchantBalanceData[];
  topUpBalance?: (merchant: MerchantBalanceData) => void;
  balanceAdjustment?: (merchant: MerchantBalanceData) => void;
  releaseBalance?: (merchant: MerchantBalanceData) => void;
  holdBalance?: (merchant: MerchantBalanceData) => void;
  onRowClick?: (merchant: MerchantBalanceData) => void;
  onSelectionChange?: (selectedMerchants: MerchantBalanceData[]) => void;
  loading?: boolean;
  error?: string;
  onOpenExport: () => void;
}

export function MerchantBalanceTable({
  data,
  topUpBalance,
  balanceAdjustment,
  releaseBalance,
  holdBalance,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
  onOpenExport,
}: MerchantBalanceTableProps) {
  // Get columns from custom hook
  const columns = useMerchantBalanceTableColumns();

  // Get table configuration from custom hook
  const {
    tableConfig,
    actionConfig,
    headerConfig,
    toolbarConfig,
    footerConfig,
    emptyStateConfig,
  } = useMerchantBalanceTableConfig({
    data,
    topUpBalance,
    balanceAdjustment,
    releaseBalance,
    holdBalance,
    onOpenExport,
  });

  // Add columns to table config
  const finalTableConfig: TableConfig<MerchantBalanceData> = {
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
        actionConfig={actionConfig}
        emptyStateConfig={emptyStateConfig}
        onRowClick={handleRowClick}
        onSelectionChange={onSelectionChange}
        loading={loading}
        error={error}
      />
    </div>
  );
}

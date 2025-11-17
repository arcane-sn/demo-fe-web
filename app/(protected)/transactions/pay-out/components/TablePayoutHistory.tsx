"use client";

import React, { useState } from "react";
import {
  ActionCellConfig,
  ReusableTable,
  TableConfig,
} from "@/components/table";
import { useRouter } from "next/navigation";
import { PayOutTransaction } from "../core/_models";
import {
  MOCK_PAY_OUT_TRANSACTIONS,
  PAY_OUT_FILTER_OPTIONS,
  PAY_OUT_SEARCH_FIELDS,
  PAY_OUT_TABLE_CONFIG,
} from "../core/_consts";
import { useColumnPayOut } from "../hooks/useColumnPayOut";
import FilterTransactionHistory from "./FilterTransactionHistory";
import { ModalExportPayout, ModalFilterPayout } from "./modals";
import DropdownActionPayout from "./DropdownActionPayout";

export function TablePayoutHistory() {
  // Table configuration
  const tableConfig: TableConfig<PayOutTransaction> = {
    data: MOCK_PAY_OUT_TRANSACTIONS,
    // data: [],
    columns: useColumnPayOut(),
    ...PAY_OUT_TABLE_CONFIG,
    searchFields: PAY_OUT_SEARCH_FIELDS,
    customFilters: PAY_OUT_FILTER_OPTIONS,
  };
  const actionConfig: ActionCellConfig<PayOutTransaction> = {
    actions: [
      {
        label: "",
        icon: <DropdownActionPayout isInsideTable={true} />,
        onClick: () => {},
      },
    ],
    showDropdown: true,
    maxVisibleActions: 1,
  };
  const router = useRouter();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleRowClick = (row: { original: PayOutTransaction }) => {
    router.push(`/transactions/pay-out/detail/${row.original.id}`);
  };

  const handleSelectionChange = (selectedRows: PayOutTransaction[]) => {
    console.log("Selected transactions:", selectedRows);
  };

  return (
    <>
      <ReusableTable
        config={tableConfig}
        headerConfig={{
          customHeader: (
            <FilterTransactionHistory
              onOpenFilter={() => setIsFilterModalOpen(true)}
              onOpenExport={() => setIsExportModalOpen(true)}
            />
          ),
        }}
        actionConfig={actionConfig}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelectionChange}
        emptyStateConfig={{
          type: "noTransactions",
          title: "No Pay-Out Transactions Yet",
          description:
            "Looks like you don't have any pay-out transactions. All disbursement transactions will be recorded here.",
          illustration: (
            <img
              src="/assets/illustrations/puzzle.svg"
              alt="No transactions illustration"
              className="w-32 h-32"
            />
          ),
        }}
      />
      <ModalExportPayout
        open={isExportModalOpen}
        onOpenChange={setIsExportModalOpen}
      />
      <ModalFilterPayout
        open={isFilterModalOpen}
        onOpenChange={setIsFilterModalOpen}
      />
    </>
  );
}

export default TablePayoutHistory;

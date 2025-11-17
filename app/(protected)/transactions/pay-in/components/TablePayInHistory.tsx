"use client";

import React, { useState } from "react";
import {
  ReusableTable,
  TableConfig,
  ActionCellConfig,
} from "@/components/table";

import { useRouter } from "next/navigation";
import { PayInTransaction } from "../core/_models";
import { MOCK_PAY_IN_TRANSACTIONS, PAY_IN_TABLE_CONFIG } from "../core/_consts";
import { useColumnPayIn } from "../hooks/useColumnPayIn";
import FilterTransactionHistory from "./FilterTransactionHistory";
import { ModalExportPayIn } from "./modal-export-pay-in";
import { ModalFilterPayIn } from "./modal-filter-pay-in";
import DropdownActionPayin from "./DropdownActionPayIn";

// Action configuration
const actionConfig: ActionCellConfig<PayInTransaction> = {
  actions: [
    {
      label: "",
      icon: <DropdownActionPayin isInsideTable={true} />,
      onClick: () => {},
    },
  ],
  showDropdown: true,
  maxVisibleActions: 3,
};

export function TablePayInHistory() {
  const [isModal, setIsModal] = useState({
    filter: false,
    export: false,
  });

  const tableConfig: TableConfig<PayInTransaction> = {
    data: MOCK_PAY_IN_TRANSACTIONS,
    columns: useColumnPayIn(),
    ...PAY_IN_TABLE_CONFIG,
  };
  const router = useRouter();

  const handleRowClick = (row: { original: PayInTransaction }) => {
    router.push(`/transactions/pay-in/detail/${row.original.id}`);
  };

  const handleSelectionChange = (selectedRows: PayInTransaction[]) => {
    console.log("Selected transactions:", selectedRows);
  };

  return (
    <>
      <ReusableTable
        config={tableConfig}
        headerConfig={{
          customHeader: (
            <FilterTransactionHistory
              onOpenFilter={() => setIsModal({ ...isModal, filter: true })}
              onOpenExport={() => setIsModal({ ...isModal, export: true })}
            />
          ),
        }}
        footerConfig={{
          showPagination: true,
          showRowCount: true,
          showSelectedCount: true,
        }}
        actionConfig={actionConfig}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelectionChange}
        emptyStateConfig={{
          type: "noTransactions",
          title: "No Transactions Yet",
          description:
            "Looks like you don’t have any transactions. All payment transactions will be recorded here.",
          illustration: (
            <img
              src="/pay-in/images/puzzle.svg"
              alt="No transactions illustration"
            />
          ),
        }}
      />
      <ModalFilterPayIn
        open={isModal.filter}
        onOpenChange={(open) => setIsModal({ ...isModal, filter: open })}
      />
      <ModalExportPayIn
        open={isModal.export}
        onOpenChange={(open) => setIsModal({ ...isModal, export: open })}
      />
    </>
  );
}

"use client";

import type { ActionCellConfig } from "@/components/reusable/table";
import type { DataTableSearchField } from "@/components/reusable/table/types";
import type { PayOutTransaction } from "../../core/_models";
import { PAY_OUT_TRANSACTION_ACTIONS } from "../../core/_consts";
import { usePayoutStore } from "../../hooks/usePayoutStore";
import { KeenIcon } from "@/components/keenicons";
import type { Row } from "@tanstack/react-table";

// Mapping action value to modal key
const ACTION_TO_MODAL_KEY: Record<string, keyof import("../../core/_models").IsModalPayout> = {
  resend_callback: "responseVendor",
  force_update_status: "forceUpdateStatus",
};

export const useActionConfig = (): ActionCellConfig<PayOutTransaction> => {
  const setModal = usePayoutStore((state) => state.setModal);
  const setSelectedTransactions = usePayoutStore((state) => state.setSelectedTransactions);

  return {
    actions: PAY_OUT_TRANSACTION_ACTIONS.map((action) => {
      const modalKey = ACTION_TO_MODAL_KEY[action.value];
      
      return {
        label: action.label,
        icon: (
          <div className="flex items-center justify-center w-5 h-5">
            <KeenIcon
              icon={action.icon}
              style="outline"
              className="size-4 text-slate-700"
            />
          </div>
        ),
        onClick: (row: Row<PayOutTransaction>) => {
          if (modalKey) {
            // When clicking from table row, set this single transaction as selected
            setSelectedTransactions([row.original]);
            setModal(modalKey, true);
          }
        },
      };
    }),
    showDropdown: true,
    maxVisibleActions: 3,
  };
};

export const searchFields: DataTableSearchField[] = [
  { label: "Reference Number", value: "referenceNumber" },
  { label: "Client ID", value: "clientId" },
  { label: "Merchant Name", value: "merchantName" },
  { label: "Partner Reference Number", value: "partnerReferenceNumber" },
  { label: "Beneficiary Account Number", value: "beneficiaryAccountNumber" },
  { label: "Bank Name", value: "bankName" },
];


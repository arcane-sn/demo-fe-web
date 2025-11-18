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

  return {
    actions: PAY_OUT_TRANSACTION_ACTIONS.map((action) => {
      const modalKey = ACTION_TO_MODAL_KEY[action.value];
      
      return {
        label: action.label,
        icon: action.icon ? (
          <div className="flex items-center justify-center w-5 h-5">
            <action.icon className="size-4 text-slate-700" />
          </div>
        ) : undefined,
        onClick: (row: Row<PayOutTransaction>) => {
          if (modalKey) {
            setModal(modalKey, true);
          } else if (action.value === "see_detail") {
            // Handle see detail - navigate to detail page
            window.location.href = `/transactions/pay-out/${row.original.id}`;
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


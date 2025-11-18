"use client";

import type { ActionCellConfig } from "@/components/reusable/table";
import type { DataTableSearchField } from "@/components/reusable/table/types";
import type { PayInTransaction, IsModalPayIn } from "../../core/_models";
import { TRANSACTION_ACTIONS } from "../../core/_consts";
import { usePayinStore } from "../../hooks/usePayinStore";
import { KeenIcon } from "@/components/keenicons";
import type { Row } from "@tanstack/react-table";

// Mapping action value to modal key
const ACTION_TO_MODAL_KEY: Record<string, keyof IsModalPayIn> = {
  resend_callback: "resendCallback",
  force_update_status: "forceUpdateStatus",
  refund: "refundRequest",
  chargeback: "chargebackRequest",
  void: "voidTransaction",
  cancel: "cancelTransaction",
};

export const useActionConfig = (): ActionCellConfig<PayInTransaction> => {
  const setModal = usePayinStore((state) => state.setModal);

  return {
    actions: TRANSACTION_ACTIONS.map((action) => {
      const modalKey = ACTION_TO_MODAL_KEY[action.value];
      
      return {
        label: action.label,
        icon: (
          <div className="flex items-center justify-center w-5 h-5">
            <KeenIcon
              icon={action.icon}
              style="outline"
              className={
                action.value === "cancel"
                  ? "size-4"
                  : "size-4 text-slate-700"
              }
            />
          </div>
        ),
        variant:
          action.value === "cancel"
            ? ("destructive" as const)
            : undefined,
        onClick: (row: Row<PayInTransaction>) => {
          if (modalKey) {
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
];


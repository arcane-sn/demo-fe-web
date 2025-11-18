"use client";

import { useMemo } from "react";
import type { ActionCellConfig } from "@/components/reusable/table";
import type { DataTableSearchField } from "@/components/reusable/table/types";
import type { PendingApprovalData } from "./core/models";
import { KeenIcon } from "@/components/keenicons";
import type { Row } from "@tanstack/react-table";
import { DEFAULT_ACTION_CONFIG } from "../_constants";

interface UseActionConfigProps {
  onView?: (disbursement: PendingApprovalData) => void;
  onApprove?: (disbursement: PendingApprovalData) => void;
  onReject?: (disbursement: PendingApprovalData) => void;
  onDetail?: (disbursement: PendingApprovalData) => void;
}

export const useActionConfig = ({
  onView,
  onApprove,
  onReject,
  onDetail,
}: UseActionConfigProps = {}): ActionCellConfig<PendingApprovalData> => {
  return useMemo(() => ({
    actions: [
      {
        label: "See Detail",
        icon: (
          <div className="flex items-center justify-center w-5 h-5">
            <KeenIcon
              icon="magnifier"
              style="outline"
              className="size-4 text-gray-400"
            />
          </div>
        ),
        onClick: (row: Row<PendingApprovalData>) => {
          if (onDetail) {
            onDetail(row.original);
            return;
          }
          if (onView) {
            onView(row.original);
          }
        },
      },
      {
        label: "Approve Request",
        icon: (
          <div className="flex items-center justify-center w-5 h-5">
            <KeenIcon
              icon="check-circle"
              style="outline"
              className="size-4 text-green-600"
            />
          </div>
        ),
        onClick: (row: Row<PendingApprovalData>) => {
          if (onApprove) {
            onApprove(row.original);
          }
        },
      },
      {
        label: "Reject Request",
        icon: (
          <div className="flex items-center justify-center w-5 h-5">
            <KeenIcon
              icon="cross-circle"
              style="outline"
              className="size-4 text-red-600"
            />
          </div>
        ),
        variant: "destructive" as const,
        onClick: (row: Row<PendingApprovalData>) => {
          if (onReject) {
            onReject(row.original);
          }
        },
      },
    ],
    ...DEFAULT_ACTION_CONFIG,
  }), [onView, onApprove, onReject, onDetail]);
};

export const searchFields: DataTableSearchField[] = [
  { label: "Creation ID", value: "creationId" },
  { label: "Created By", value: "createdBy" },
];


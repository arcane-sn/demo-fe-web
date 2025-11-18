"use client";

import { useMemo } from "react";
import type { ActionCellConfig } from "@/components/reusable/table";
import type { DataTableSearchField } from "@/components/reusable/table/types";
import type { DisbursementDraft } from "./core/models";
import { KeenIcon } from "@/components/keenicons";
import type { Row } from "@tanstack/react-table";
import { DEFAULT_ACTION_CONFIG } from "../_constants";

interface UseActionConfigProps {
  onDelete?: (disbursement: DisbursementDraft) => void;
  onEdit?: (disbursement: DisbursementDraft) => void;
  onSend?: (disbursement: DisbursementDraft) => void;
  onDetail?: (disbursement: DisbursementDraft) => void;
}

export const useActionConfig = ({
  onDelete,
  onEdit,
  onSend,
  onDetail,
}: UseActionConfigProps = {}): ActionCellConfig<DisbursementDraft> => {
  return useMemo(() => ({
    actions: [
      {
        label: "Detail",
        icon: (
          <div className="flex items-center justify-center w-5 h-5">
            <KeenIcon
              icon="eye"
              style="outline"
              className="size-4 text-slate-700"
            />
          </div>
        ),
        onClick: (row: Row<DisbursementDraft>) => {
          if (onDetail) {
            onDetail(row.original);
          }
        },
      },
      {
        label: "Delete",
        icon: (
          <div className="flex items-center justify-center w-5 h-5">
            <KeenIcon
              icon="trash"
              style="outline"
              className="size-4 text-slate-700"
            />
          </div>
        ),
        variant: "destructive" as const,
        onClick: (row: Row<DisbursementDraft>) => {
          if (onDelete) {
            onDelete(row.original);
          }
        },
      },
      {
        label: "Edit",
        icon: (
          <div className="flex items-center justify-center w-5 h-5">
            <KeenIcon
              icon="pencil"
              style="outline"
              className="size-4 text-slate-700"
            />
          </div>
        ),
        onClick: (row: Row<DisbursementDraft>) => {
          if (onEdit) {
            onEdit(row.original);
          }
        },
      },
      {
        label: "Send",
        icon: (
          <div className="flex items-center justify-center w-5 h-5">
            <KeenIcon
              icon="paper-plane"
              style="outline"
              className="size-4 text-slate-700"
            />
          </div>
        ),
        onClick: (row: Row<DisbursementDraft>) => {
          if (onSend) {
            onSend(row.original);
          }
        },
      },
    ],
    ...DEFAULT_ACTION_CONFIG,
  }), [onDelete, onEdit, onSend, onDetail]);
};

export const searchFields: DataTableSearchField[] = [
  { label: "Creation ID", value: "creationId" },
  { label: "Created By", value: "createdBy" },
];


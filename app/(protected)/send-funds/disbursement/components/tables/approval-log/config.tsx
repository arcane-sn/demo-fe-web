"use client";

import { useMemo } from "react";
import type { ActionCellConfig } from "@/components/reusable/table";
import type { DataTableSearchField } from "@/components/reusable/table/types";
import type { ApprovalLogData } from "./core/models";
import { KeenIcon } from "@/components/keenicons";
import type { Row } from "@tanstack/react-table";
import { DEFAULT_ACTION_CONFIG } from "../_constants";

interface UseActionConfigProps {
  onViewDetails?: (entry: ApprovalLogData) => void;
  onExport?: (entries: ApprovalLogData[]) => void;
}

export const useActionConfig = ({
  onViewDetails,
  onExport,
}: UseActionConfigProps = {}): ActionCellConfig<ApprovalLogData> => {
  return useMemo(() => ({
    actions: [
      {
        label: "View Details",
        icon: (
          <div className="flex items-center justify-center w-5 h-5">
            <KeenIcon
              icon="eye"
              style="outline"
              className="size-4 text-slate-700"
            />
          </div>
        ),
        onClick: (row: Row<ApprovalLogData>) => {
          if (onViewDetails) {
            onViewDetails(row.original);
          }
        },
      },
      {
        label: "Export Entry",
        icon: (
          <div className="flex items-center justify-center w-5 h-5">
            <KeenIcon
              icon="exit-down"
              style="outline"
              className="size-4 text-slate-700"
            />
          </div>
        ),
        onClick: (row: Row<ApprovalLogData>) => {
          if (onExport) {
            onExport([row.original]);
          }
        },
      },
    ],
    ...DEFAULT_ACTION_CONFIG,
  }), [onViewDetails, onExport]);
};

export const searchFields: DataTableSearchField[] = [
  { label: "Creation ID", value: "creationId" },
  { label: "Created By", value: "createdBy" },
];


"use client";

import React, { useMemo } from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { BaseTableData, ActionCellConfig } from "../../types";
import { DataGridTableRowSelect, DataGridTableRowSelectAll } from "@/components/ui/data-grid-table";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function useTableColumns<TData extends BaseTableData = BaseTableData>(
  columns: ColumnDef<TData, any>[],
  actionConfig?: ActionCellConfig<TData>,
  enableRowSelection: boolean = true
) {
  return useMemo<ColumnDef<TData>[]>(() => {
    const tableColumns: ColumnDef<TData>[] = [];

    // Add row selection column if enabled
    if (enableRowSelection) {
      tableColumns.push({
        accessorKey: "id",
        accessorFn: (row) => row.id,
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        size: 51,
        meta: {
          cellClassName: "",
        },
      });
    }

    // Add user-defined columns
    // Note: If you want sort/pin/move features, use DataGridColumnHeader in your column definition
    // Example: header: ({ column }) => <DataGridColumnHeader column={column} title="Column Name" visibility={true} />
    tableColumns.push(...columns);

    // Add actions column if configured
    if (actionConfig && actionConfig.actions.length > 0) {
      const ActionsCell = ({ row }: { row: Row<TData> }) => {
        const visibleActions = actionConfig.actions.filter((action) =>
          action.show ? action.show(row) : true
        );

        if (actionConfig.showDropdown !== false && visibleActions.length > 1) {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="size-7"
                  mode="icon"
                  variant="ghost"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                {visibleActions.map((action, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick(row);
                      }}
                      variant={
                        action.variant === "destructive" ? "destructive" : undefined
                      }
                      className={action.className}
                    >
                      {action.icon}
                      {action.label}
                    </DropdownMenuItem>
                    {action.separatorAfter && index < visibleActions.length - 1 && (
                      <DropdownMenuSeparator />
                    )}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        // Show actions as buttons if not using dropdown
        return (
          <div className="flex items-center justify-center gap-1">
            {visibleActions
              .slice(0, actionConfig.maxVisibleActions || 3)
              .map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={action.variant || "ghost"}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick(row);
                  }}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
          </div>
        );
      };

      tableColumns.push({
        id: "actions",
        header: "",
        cell: ActionsCell,
        enableSorting: false,
        size: 60,
        meta: {
          headerClassName: "",
        },
      });
    }

    return tableColumns;
  }, [columns, actionConfig, enableRowSelection]);
}


"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { KeenIcon } from "@/components/keenicons";
import { Button } from "@/components/ui/button";
import type { TransactionItem } from "../../../types/batch-detail";
import { FIELD_LABELS } from "../core/constants";

interface UseTransactionTableColumnsProps {
  showStatus?: boolean;
  onEdit?: (transaction: TransactionItem) => void;
  showActions?: boolean;
}

export function useTransactionTableColumns({ showStatus = false, onEdit, showActions = true }: UseTransactionTableColumnsProps = {}): ColumnDef<TransactionItem>[] {
  return useMemo<ColumnDef<TransactionItem>[]>(
    () => {
      const columns: ColumnDef<TransactionItem>[] = [];

      // Status column - only show for valid and issue status
      if (showStatus) {
        columns.push({
          id: "status",
          accessorKey: "status",
          header: ({ column }) => (
            <DataGridColumnHeader title={FIELD_LABELS.STATUS} column={column} />
          ),
          cell: ({ row }) => {
            const status = row.original.status || 'valid';
            const isValid = status === 'valid';
            return (
              <Badge
                variant={isValid ? "success" : "destructive"}
                appearance="outline"
                className="whitespace-nowrap rounded-full"
              >
                <BadgeDot />
                {isValid ? 'Valid' : 'Invalid'}
              </Badge>
            );
          },
          enableSorting: true,
          size: 120,
        });
      }

      columns.push(
        {
          id: "transferAmount",
          accessorKey: "transferAmount",
          header: ({ column }) => (
            <DataGridColumnHeader title={FIELD_LABELS.TRANSFER_AMOUNT_COLUMN} column={column} />
          ),
          cell: ({ row }) => (
            <span className="font-medium text-gray-900">
              {row.original.transferAmount}
            </span>
          ),
          enableSorting: true,
          size: 150,
        },
      {
        id: "partnerReferenceNumber",
        accessorKey: "partnerReferenceNumber",
        header: ({ column }) => (
          <DataGridColumnHeader title={FIELD_LABELS.PARTNER_REFERENCE_NUMBER} column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-gray-700">
            {row.original.partnerReferenceNumber}
          </span>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "accountNumber",
        accessorKey: "accountNumber",
        header: ({ column }) => (
          <DataGridColumnHeader title={FIELD_LABELS.ACCOUNT_NUMBER} column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-gray-700">
            {row.original.accountNumber}
          </span>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: "bankNameCode",
        accessorKey: "bankName",
        header: ({ column }) => (
          <DataGridColumnHeader title={FIELD_LABELS.BANK_NAME_CODE} column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-gray-700">
            {row.original.bankName} / {row.original.bankCode}
          </span>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "accountName",
        accessorKey: "accountName",
        header: ({ column }) => (
          <DataGridColumnHeader title={FIELD_LABELS.ACCOUNT_NAME} column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-gray-700">
            {row.original.accountName}
          </span>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "remark",
        accessorKey: "remark",
        header: ({ column }) => (
          <DataGridColumnHeader title={FIELD_LABELS.REMARK} column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-gray-700">
            {row.original.remark || '-'}
          </span>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "sendTo",
        accessorKey: "sendToEmail",
        header: ({ column }) => (
          <DataGridColumnHeader title={FIELD_LABELS.SEND_TO} column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-gray-700">
              {row.original.sendToEmail || '-'}
            </span>
            {row.original.sendToName && (
              <span className="text-xs text-gray-500 mt-0.5">
                {row.original.sendToName}
              </span>
            )}
          </div>
        ),
        enableSorting: true,
        size: 250,
      },
      );

      // Action columns - only show for valid and issue status, not for pending-approval
      if (showStatus && showActions) {
        columns.push(
          {
            id: "delete",
            header: () => null,
            cell: ({ row }) => (
              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded border border-gray-300 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Delete transaction", row.original);
                  }}
                >
                  <KeenIcon
                    icon="trash"
                    style="outline"
                    className="h-4 w-4 text-gray-600"
                  />
                </Button>
              </div>
            ),
            enableSorting: false,
            size: 60,
          },
          {
            id: "edit",
            header: () => null,
            cell: ({ row }) => (
              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded border border-gray-300 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onEdit) {
                      onEdit(row.original);
                    } else {
                      console.log("Edit transaction", row.original);
                    }
                  }}
                >
                  <KeenIcon
                    icon="pencil"
                    style="outline"
                    className="h-4 w-4 text-gray-600"
                  />
                </Button>
              </div>
            ),
            enableSorting: false,
            size: 60,
          }
        );
      }

      return columns;
    },
    [showStatus, onEdit, showActions]
  );
}


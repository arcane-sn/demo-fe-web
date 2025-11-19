"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { AccountInquiryRecord } from "./core/models";
import { DateCell } from "./cells/date-cell";
import { CopyInlineButton } from "./cells/copy-inline-button";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { KeenIcon } from "@/components/keenicons";

const STATUS_BADGES: Record<
  AccountInquiryRecord["status"],
  {
    label: string;
    variant: "success" | "warning" | "destructive" | "secondary";
    appearance?: "outline" | "light" | "ghost";
  }
> = {
  valid: { label: "Valid", variant: "success", appearance: "light" },
  init: { label: "Init", variant: "warning", appearance: "outline" },
  invalid: { label: "Invalid", variant: "destructive", appearance: "outline" },
  failed: { label: "Failed", variant: "destructive" },
};

export function useAccountInquiryColumns(
  onExportRow?: (row: AccountInquiryRecord) => void,
): ColumnDef<AccountInquiryRecord>[] {
  return useMemo<ColumnDef<AccountInquiryRecord>[]>(() => [
    {
      id: "activityDate",
      accessorKey: "activityDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Activity Date" column={column} />
      ),
      cell: ({ row }) => (
        <DateCell
          date={row.original.activityDate}
          time={row.original.activityTime}
        />
      ),
      enableSorting: true,
      size: 220,
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataGridColumnHeader title="Status" column={column} />
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        const config = STATUS_BADGES[status];
        return (
          <Badge
            variant={config.variant}
            appearance={config.appearance}
            size="md"
            className="rounded-full text-xs font-medium"
          >
            <BadgeDot />
            {config.label}
          </Badge>
        );
      },
      enableSorting: true,
      size: 160,
    },
    {
      id: "accountNumber",
      accessorKey: "accountNumber",
      header: ({ column }) => (
        <DataGridColumnHeader title="Account Number" column={column} />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-gray-900">{row.original.accountNumber}</span>
      ),
      enableSorting: true,
      size: 220,
    },
    {
      id: "bankNameCode",
      accessorKey: "bankNameCode",
      header: ({ column }) => (
        <DataGridColumnHeader title="Bank Name / Code" column={column} />
      ),
      enableSorting: true,
      size: 180,
    },
    {
      id: "accountName",
      accessorKey: "accountName",
      header: ({ column }) => (
        <DataGridColumnHeader title="Account Name" column={column} />
      ),
      cell: ({ row }) => <span>{row.original.accountName || "-"}</span>,
      enableSorting: true,
      size: 200,
    },
    {
      id: "inquiryFee",
      accessorKey: "inquiryFee",
      header: ({ column }) => (
        <DataGridColumnHeader title="Inquiry Fee" column={column} />
      ),
      cell: ({ row }) => (
        <span className="font-normal text-gray-900">
          {row.original.inquiryFee}
        </span>
      ),
      enableSorting: true,
      size: 160,
    },
    {
      id: "referenceNumber",
      accessorKey: "referenceNumber",
      header: ({ column }) => (
        <DataGridColumnHeader title="Reference Number" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-normal text-blue-500">{row.original.referenceNumber}</span>
          <CopyInlineButton value={row.original.referenceNumber} label="Reference Number" />
        </div>
      ),
      enableSorting: true,
      size: 250,
    },
    {
      id: "partnerReferenceNumber",
      accessorKey: "partnerReferenceNumber",
      header: ({ column }) => (
        <DataGridColumnHeader title="Partner Reference Number" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-gray-900">{row.original.partnerReferenceNumber}</span>
          <CopyInlineButton
            value={row.original.partnerReferenceNumber}
            label="Partner Reference Number"
          />
        </div>
      ),
      enableSorting: true,
      size: 280,
    },
    {
      id: "merchantName",
      accessorKey: "merchantName",
      header: ({ column }) => (
        <DataGridColumnHeader title="Merchant Name" column={column} />
      ),
      enableSorting: true,
      size: 200,
    },
    {
      id: "clientId",
      accessorKey: "clientId",
      header: ({ column }) => (
        <DataGridColumnHeader title="Client ID" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-gray-900">{row.original.clientId}</span>
          <CopyInlineButton value={row.original.clientId} label="Client ID" />
        </div>
      ),
      enableSorting: true,
      size: 220,
    },
    {
      id: "response",
      accessorKey: "response",
      header: ({ column }) => (
        <DataGridColumnHeader title="Response" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-gray-900">{row.original.response}</span>
          <CopyInlineButton value={row.original.response} label="Response" />
        </div>
      ),
      enableSorting: true,
      size: 220,
    },
    {
      id: "actions",
      header: "",
      size: 80,
      cell: ({ row }) => (
        <button
          type="button"
          className="w-10 h-10 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center justify-center"
          aria-label="Export row"
          onClick={() => onExportRow?.(row.original)}
        >
          <KeenIcon icon="exit-down" style="outline" className="text-lg" />
        </button>
      ),
      enableSorting: false,
    },
  ], [onExportRow]);
}


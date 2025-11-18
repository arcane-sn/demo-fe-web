import { ColumnDef } from "@tanstack/react-table";
import { PayInTransaction } from "../../../core/_models";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import CopyButton from "../../../../components/shared/CopyButton";
import { StatusBadge } from "../components";

/**
 * Common columns that appear in all transaction types (VA, QRIS, and Default)
 */
export function getCommonColumns(): ColumnDef<PayInTransaction>[] {
  return [
    {
      id: "transactionDate",
      accessorKey: "transactionDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Transaction Date" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-normal text-slate-800">
            {row.original.transactionDate}
          </div>
          <div className="text-xs text-slate-600">
            {row.original.transactionTime}
          </div>
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "merchantName",
      accessorKey: "merchantName",
      header: ({ column }) => (
        <DataGridColumnHeader title="Merchant Name" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.merchantName}
        </div>
      ),
      enableSorting: true,
      size: 192,
    },
    {
      id: "clientId",
      accessorKey: "clientId",
      header: ({ column }) => (
        <DataGridColumnHeader title="Client ID" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-slate-800">
            {row.original.clientId}
          </div>
          <CopyButton text={row.original.clientId} label="Client ID" />
        </div>
      ),
      enableSorting: true,
      size: 192,
    },
    {
      id: "referenceNumber",
      accessorKey: "referenceNumber",
      header: ({ column }) => (
        <DataGridColumnHeader title="Reference Number" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.referenceNumber}
          </div>
          <CopyButton
            text={row.original.referenceNumber}
            label="Reference Number"
          />
        </div>
      ),
      enableSorting: true,
      size: 288,
    },
    {
      id: "partnerReferenceNumber",
      accessorKey: "partnerReferenceNumber",
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Partner Reference Number"
          column={column}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.partnerReferenceNumber}
          </div>
          <CopyButton
            text={row.original.partnerReferenceNumber}
            label="Partner Reference Number"
          />
        </div>
      ),
      enableSorting: true,
      size: 288,
    },
    {
      id: "paymentStatus",
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <DataGridColumnHeader title="Payment Status" column={column} />
      ),
      cell: ({ row }) => <StatusBadge status={row.original.paymentStatus} />,
      enableSorting: true,
      size: 176,
    },
  ];
}


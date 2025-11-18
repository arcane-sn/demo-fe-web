import { ColumnDef } from "@tanstack/react-table";
import { PayInTransaction } from "../../../core/_models";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { formatCurrency } from "../../../../components/shared/utils";

/**
 * Ending columns for VA and QRIS transactions
 * Includes Amount, Customer Info, and Date fields
 */
export function getEndingColumns(): ColumnDef<PayInTransaction>[] {
  return [
    {
      id: "amount",
      accessorKey: "amount",
      header: ({ column }) => (
        <DataGridColumnHeader title="Amount" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {formatCurrency(row.original.amount)}
        </div>
      ),
      enableSorting: true,
      size: 192,
    },
    {
      id: "customerInfo",
      accessorKey: "customerInfo",
      header: ({ column }) => (
        <DataGridColumnHeader title="Customer Info" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-normal text-slate-800">
            {row.original.customerEmail}
          </div>
          <div className="text-xs text-slate-600">
            {row.original.customerPhone}
          </div>
        </div>
      ),
      enableSorting: false,
      size: 192,
    },
    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Created Date" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.createdDate || "-"}
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "expiryDate",
      accessorKey: "expiryDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Expiry Date" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.expiryDate || "-"}
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "lastUpdatedDate",
      accessorKey: "lastUpdatedDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Last Updated Date" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.lastUpdatedDate || "-"}
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
  ];
}


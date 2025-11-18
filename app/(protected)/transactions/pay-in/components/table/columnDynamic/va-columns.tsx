import { ColumnDef } from "@tanstack/react-table";
import { PayInTransaction } from "../../../core/_models";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import CopyButton from "../../../../components/shared/CopyButton";
import { VAStatusBadge } from "../components";

/**
 * VA (Virtual Account) specific columns
 */
export function getVAColumns(): ColumnDef<PayInTransaction>[] {
  return [
    {
      id: "bankName",
      accessorKey: "bankName",
      header: ({ column }) => (
        <DataGridColumnHeader title="Bank Name" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.bankName || "-"}
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "vaNumber",
      accessorKey: "vaNumber",
      header: ({ column }) => (
        <DataGridColumnHeader title="VA Number" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.vaNumber || "-"}
          </div>
          {row.original.vaNumber && (
            <CopyButton text={row.original.vaNumber} label="VA Number" />
          )}
        </div>
      ),
      enableSorting: true,
      size: 192,
    },
    {
      id: "vaId",
      accessorKey: "vaId",
      header: ({ column }) => (
        <DataGridColumnHeader title="VA ID" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.vaId || "-"}
          </div>
          {row.original.vaId && (
            <CopyButton text={row.original.vaId} label="VA ID" />
          )}
        </div>
      ),
      enableSorting: true,
      size: 192,
    },
    {
      id: "vaType",
      accessorKey: "vaType",
      header: ({ column }) => (
        <DataGridColumnHeader title="VA Type" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.vaType || "-"}
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "vaStatus",
      accessorKey: "vaStatus",
      header: ({ column }) => (
        <DataGridColumnHeader title="VA Status" column={column} />
      ),
      cell: ({ row }) => (
        <VAStatusBadge status={row.original.vaStatus || "Inactive"} />
      ),
      enableSorting: true,
      size: 176,
    },
  ];
}


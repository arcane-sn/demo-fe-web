import { ColumnDef } from "@tanstack/react-table";
import { PayInTransaction } from "../../../core/_models";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import CopyButton from "../../../../components/shared/CopyButton";

/**
 * QRIS (QR Code) specific columns
 */
export function getQRISColumns(): ColumnDef<PayInTransaction>[] {
  return [
    {
      id: "channel",
      accessorKey: "channel",
      header: ({ column }) => (
        <DataGridColumnHeader title="Channel" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.channel || row.original.paymentChannel || "-"}
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "issuingBank",
      accessorKey: "issuingBank",
      header: ({ column }) => (
        <DataGridColumnHeader title="Bank Name (Issuing Bank)" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.issuingBank || "-"}
        </div>
      ),
      enableSorting: true,
      size: 200,
    },
    {
      id: "acquirerBank",
      accessorKey: "acquirerBank",
      header: ({ column }) => (
        <DataGridColumnHeader title="Acquirer Bank" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.acquirerBank || "-"}
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "acquirerRefNumber",
      accessorKey: "acquirerRefNumber",
      header: ({ column }) => (
        <DataGridColumnHeader title="Reference Number (Acquirer)" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.acquirerRefNumber || "-"}
          </div>
          {row.original.acquirerRefNumber && (
            <CopyButton
              text={row.original.acquirerRefNumber}
              label="Acquirer Reference Number"
            />
          )}
        </div>
      ),
      enableSorting: true,
      size: 240,
    },
  ];
}


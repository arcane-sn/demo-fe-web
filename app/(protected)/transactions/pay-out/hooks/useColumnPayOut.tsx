import { ColumnDef } from "@tanstack/react-table";
import { PayOutTransaction } from "../core/_models";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

// Status badge component using the UI Badge component
const StatusBadge = ({ status }: { status: PayOutTransaction["status"] }) => {
  const getStatusConfig = (status: PayOutTransaction["status"]) => {
    switch (status) {
      case "Success":
        return {
          variant: "success" as const,
          appearance: "light" as const,
        };
      case "Request":
        return {
          variant: "warning" as const,
          appearance: "light" as const,
        };
      case "Failed":
        return {
          variant: "destructive" as const,
          appearance: "light" as const,
        };
      case "Pending":
        return {
          variant: "secondary" as const,
          appearance: "light" as const,
        };
      default:
        return {
          variant: "secondary" as const,
          appearance: "light" as const,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant={config.variant}
      appearance={config.appearance}
      size="sm"
      shape="circle"
      className="gap-1.5"
    >
      <BadgeDot />
      {status}
    </Badge>
  );
};

// Copy button component
const CopyButton = ({ text, label }: { text: string; label: string }) => (
  <Button
    variant="ghost"
    size="sm"
    className="p-1.5 h-auto"
    onClick={() => {
      navigator.clipboard.writeText(text);
      // You can add toast notification here if needed
    }}
    title={`Copy ${label}`}
  >
    <Copy className="size-3 text-slate-400" />
  </Button>
);

// Table columns configuration
export const useColumnPayOut: () => ColumnDef<PayOutTransaction>[] = () => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return [
    {
      id: "transactionDate",
      accessorKey: "transactionDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Transaction Date" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-1.5">
          <div className="text-sm font-normal text-slate-800">
            {row.original.transactionDate}
          </div>
          <div className="text-xs font-normal text-slate-600">
            {row.original.transactionTime}
          </div>
        </div>
      ),
      enableSorting: true,
      size: 176, // w-44
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
      size: 192, // w-48
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
      size: 192, // w-48
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataGridColumnHeader title="Status" column={column} />
      ),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      enableSorting: true,
      size: 176, // w-44
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
      size: 288, // w-72
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
          <div className="text-sm font-normal text-slate-800">
            {row.original.partnerReferenceNumber}
          </div>
          <CopyButton
            text={row.original.partnerReferenceNumber}
            label="Partner Reference Number"
          />
        </div>
      ),
      enableSorting: true,
      size: 288, // w-72
    },
    {
      id: "transactionType",
      accessorKey: "transactionType",
      header: ({ column }) => (
        <DataGridColumnHeader title="Transaction Type" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.transactionType}
        </div>
      ),
      enableSorting: true,
      size: 176, // w-44
    },
    {
      id: "transferAmount",
      accessorKey: "transferAmount",
      header: ({ column }) => (
        <DataGridColumnHeader title="Transfer Amount" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {formatCurrency(row.original.transferAmount)}
        </div>
      ),
      enableSorting: true,
      size: 176, // w-44
    },
    {
      id: "adminFee",
      accessorKey: "adminFee",
      header: ({ column }) => (
        <DataGridColumnHeader title="Admin Fee" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {formatCurrency(row.original.adminFee)}
        </div>
      ),
      enableSorting: true,
      size: 144, // w-36
    },
    {
      id: "totalTransferAmount",
      accessorKey: "totalTransferAmount",
      header: ({ column }) => (
        <DataGridColumnHeader title="Total Transfer Amount" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {formatCurrency(row.original.totalTransferAmount)}
        </div>
      ),
      enableSorting: true,
      size: 192, // w-48
    },
    {
      id: "beneficiaryAccountNumber",
      accessorKey: "beneficiaryAccountNumber",
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Beneficiary Account Number"
          column={column}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-slate-800">
            {row.original.beneficiaryAccountNumber}
          </div>
          <CopyButton
            text={row.original.beneficiaryAccountNumber}
            label="Beneficiary Account Number"
          />
        </div>
      ),
      enableSorting: true,
      size: 288, // w-72
    },
    {
      id: "bankName",
      accessorKey: "bankName",
      header: ({ column }) => (
        <DataGridColumnHeader title="Bank Name" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.bankName}
        </div>
      ),
      enableSorting: true,
      size: 176, // w-44
    },
    {
      id: "remark",
      accessorKey: "remark",
      header: ({ column }) => (
        <DataGridColumnHeader title="Remark" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.remark}
        </div>
      ),
      enableSorting: true,
      size: 288, // w-72
    },
    {
      id: "servedDate",
      accessorKey: "servedDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Served Date" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-1.5">
          <div className="text-sm font-normal text-slate-800">
            {row.original.servedDate}
          </div>
          <div className="text-xs font-normal text-slate-600">
            {row.original.servedTime}
          </div>
        </div>
      ),
      enableSorting: true,
      size: 176, // w-44
    },
  ];
};

"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { BalanceStatementData } from "../../core/_model";

export function useBalanceStatementTableColumns(): ColumnDef<BalanceStatementData>[] {
  const { copyToClipboard } = useCopyToClipboard();

  return useMemo<ColumnDef<BalanceStatementData>[]>(
    () => [
      {
        id: "transactionDate",
        accessorKey: "transactionDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Transaction Date" column={column} />
        ),
        cell: ({ row }) => <DateCell dateInfo={row.original.transactionDate} />,
        enableSorting: true,
        size: 180,
      },
      {
        id: "merchantName",
        accessorKey: "merchantName",
        header: ({ column }) => (
          <DataGridColumnHeader title="Merchant Name" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.merchantName}
          </span>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "clientId",
        accessorKey: "clientId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Client ID" column={column} />
        ),
        cell: ({ row }) => (
          <CopyableCell
            value={row.original.clientId}
            onCopy={copyToClipboard}
          />
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: "referenceNumber",
        accessorKey: "referenceNumber",
        header: ({ column }) => (
          <DataGridColumnHeader title="Reference Number" column={column} />
        ),
        cell: ({ row }) => (
          <CopyableCell
            value={row.original.referenceNumber}
            onCopy={copyToClipboard}
          />
        ),
        enableSorting: true,
        size: 200,
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
          <CopyableCell
            value={row.original.partnerReferenceNumber}
            onCopy={copyToClipboard}
          />
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "transactionType",
        accessorKey: "transactionType",
        header: ({ column }) => (
          <DataGridColumnHeader title="Transaction Type" column={column} />
        ),
        cell: ({ row }) => (
          <TransactionTypeCell type={row.original.transactionType} />
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => <StatusCell status={row.original.status} />,
        enableSorting: true,
        size: 100,
      },
      {
        id: "transferAmount",
        accessorKey: "transferAmount",
        header: ({ column }) => (
          <DataGridColumnHeader title="Transfer Amount" column={column} />
        ),
        cell: ({ row }) => (
          <CurrencyCell currency={row.original.transferAmount} />
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: "adminFee",
        accessorKey: "adminFee",
        header: ({ column }) => (
          <DataGridColumnHeader title="Admin Fee" column={column} />
        ),
        cell: ({ row }) => <CurrencyCell currency={row.original.adminFee} />,
        enableSorting: true,
        size: 120,
      },
      {
        id: "tax",
        accessorKey: "tax",
        header: ({ column }) => (
          <DataGridColumnHeader title="Tax (11%)" column={column} />
        ),
        cell: ({ row }) => <CurrencyCell currency={row.original.tax} />,
        enableSorting: true,
        size: 120,
      },
      {
        id: "totalAmount",
        accessorKey: "totalAmount",
        header: ({ column }) => (
          <DataGridColumnHeader title="Total Amount" column={column} />
        ),
        cell: ({ row }) => <CurrencyCell currency={row.original.totalAmount} />,
        enableSorting: true,
        size: 140,
      },
      {
        id: "balanceBefore",
        accessorKey: "balanceBefore",
        header: ({ column }) => (
          <DataGridColumnHeader title="Balance Before" column={column} />
        ),
        cell: ({ row }) => (
          <CurrencyCell currency={row.original.balanceBefore} />
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: "balanceAfter",
        accessorKey: "balanceAfter",
        header: ({ column }) => (
          <DataGridColumnHeader title="Balance After" column={column} />
        ),
        cell: ({ row }) => (
          <CurrencyCell currency={row.original.balanceAfter} />
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: "vendorAdminFee",
        accessorKey: "vendorAdminFee",
        header: ({ column }) => (
          <DataGridColumnHeader title="Vendor Admin Fee" column={column} />
        ),
        cell: ({ row }) => (
          <CurrencyCell currency={row.original.vendorAdminFee} />
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "flypayRevenue",
        accessorKey: "flypayRevenue",
        header: ({ column }) => (
          <DataGridColumnHeader title="Flypay Revenue" column={column} />
        ),
        cell: ({ row }) => (
          <CurrencyCell currency={row.original.flypayRevenue} />
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: "transactionRemark",
        accessorKey: "transactionRemark",
        header: ({ column }) => (
          <DataGridColumnHeader title="Transaction Remark" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground max-w-[200px] truncate text-wrap">
            {row.original.transactionRemark}
          </span>
        ),
        enableSorting: true,
        size: 200,
      },
    ],
    [copyToClipboard]
  );
}

// Reusable cell components
interface CopyableCellProps {
  value: string;
  onCopy: (text: string) => void;
}

function CopyableCell({ value, onCopy }: CopyableCellProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-foreground">{value}</span>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0"
        onClick={() => {
          onCopy(value);
          toast.success("Copied to clipboard");
        }}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}

interface CurrencyCellProps {
  currency: BalanceStatementData["transferAmount"];
}

function CurrencyCell({ currency }: CurrencyCellProps) {
  return <span className="text-sm text-gray-800 ">{currency.formatted}</span>;
}

interface DateCellProps {
  dateInfo: BalanceStatementData["transactionDate"];
}

function DateCell({ dateInfo }: DateCellProps) {
  return (
    <div className="text-sm">
      <div className="text-foreground font-medium">{dateInfo.date}</div>
      <div className="text-muted-foreground">
        {dateInfo.time} ({dateInfo.timezone})
      </div>
    </div>
  );
}

interface TransactionTypeCellProps {
  type: BalanceStatementData["transactionType"];
}

function TransactionTypeCell({ type }: TransactionTypeCellProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "transfer":
        return "bg-blue-100 text-blue-800";
      case "topup":
        return "bg-green-100 text-green-800";
      case "withdrawal":
        return "bg-orange-100 text-orange-800";
      case "adjustment":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
        type.type
      )}`}
    >
      {type.label}
    </span>
  );
}

interface StatusCellProps {
  status: BalanceStatementData["status"];
}

function StatusCell({ status }: StatusCellProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
        status.status
      )}`}
    >
      {status.label}
    </span>
  );
}

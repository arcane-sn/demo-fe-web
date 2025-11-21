"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Copy,
  Upload,
  FolderSync,
  FileSymlink,
  ShieldClose,
} from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MerchantBalanceData } from "../../core/_model";

interface UseMerchantBalanceTableColumnsProps {
  topUpBalance?: (merchant: MerchantBalanceData) => void;
  balanceAdjustment?: (merchant: MerchantBalanceData) => void;
  releaseBalance?: (merchant: MerchantBalanceData) => void;
  holdBalance?: (merchant: MerchantBalanceData) => void;
}

export function useMerchantBalanceTableColumns({
  topUpBalance,
  balanceAdjustment,
  releaseBalance,
  holdBalance,
}: UseMerchantBalanceTableColumnsProps): ColumnDef<MerchantBalanceData>[] {
  const { copyToClipboard } = useCopyToClipboard();

  return useMemo<ColumnDef<MerchantBalanceData>[]>(
    () => [
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
        size: 250,
      },
      {
        id: "clientId",
        accessorKey: "clientId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Client ID" column={column} />
        ),
        cell: ({ row }) => (
          <ClientIdCell
            clientId={row.original.clientId}
            onCopy={copyToClipboard}
          />
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "activeBalance",
        accessorKey: "activeBalance",
        header: ({ column }) => (
          <DataGridColumnHeader title="Active Balance" column={column} />
        ),
        cell: ({ row }) => <BalanceCell balance={row.original.activeBalance} />,
        enableSorting: true,
        size: 150,
      },
      {
        id: "pendingBalance",
        accessorKey: "pendingBalance",
        header: ({ column }) => (
          <DataGridColumnHeader title="Pending Balance" column={column} />
        ),
        cell: ({ row }) => (
          <BalanceCell balance={row.original.pendingBalance} />
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "holdBalance",
        accessorKey: "holdBalance",
        header: ({ column }) => (
          <DataGridColumnHeader title="Hold Balance" column={column} />
        ),
        cell: ({ row }) => <BalanceCell balance={row.original.holdBalance} />,
        enableSorting: true,
        size: 150,
      },
      {
        id: "totalBalance",
        accessorKey: "totalBalance",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Total Merchant Balance"
            column={column}
          />
        ),
        cell: ({ row }) => <BalanceCell balance={row.original.totalBalance} />,
        enableSorting: true,
        size: 180,
      },
      {
        id: "lastActivityDate",
        accessorKey: "lastActivityDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Activity Date" column={column} />
        ),
        cell: ({ row }) => (
          <DateCell dateInfo={row.original.lastActivityDate} />
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <ActionsCell
            row={row.original}
            topUpBalance={topUpBalance}
            balanceAdjustment={balanceAdjustment}
            releaseBalance={releaseBalance}
            holdBalance={holdBalance}
          />
        ),
        enableSorting: false,
        size: 100,
      },
    ],
    [
      copyToClipboard,
      topUpBalance,
      balanceAdjustment,
      releaseBalance,
      holdBalance,
    ]
  );
}

// Reusable cell components
interface ClientIdCellProps {
  clientId: string;
  onCopy: (text: string) => void;
}

function ClientIdCell({ clientId, onCopy }: ClientIdCellProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-foreground">{clientId}</span>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0"
        onClick={() => {
          onCopy(clientId);
          toast.success("Client ID copied to clipboard");
        }}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}

interface BalanceCellProps {
  balance: MerchantBalanceData["activeBalance"];
}

function BalanceCell({ balance }: BalanceCellProps) {
  return (
    <span className={`text-B-14-14-400 text-gray-800 `}>
      {balance.formatted}
    </span>
  );
}

interface DateCellProps {
  dateInfo: MerchantBalanceData["lastActivityDate"];
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

interface ActionsCellProps {
  row: MerchantBalanceData;
  topUpBalance?: (merchant: MerchantBalanceData) => void;
  balanceAdjustment?: (merchant: MerchantBalanceData) => void;
  releaseBalance?: (merchant: MerchantBalanceData) => void;
  holdBalance?: (merchant: MerchantBalanceData) => void;
}

function ActionsCell({
  row,
  topUpBalance,
  balanceAdjustment,
  releaseBalance,
  holdBalance,
}: ActionsCellProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {topUpBalance && (
          <DropdownMenuItem onClick={() => topUpBalance(row)}>
            <Upload className="mr-2 h-4 w-4" />
            Top-Up Balance
          </DropdownMenuItem>
        )}
        {balanceAdjustment && (
          <DropdownMenuItem onClick={() => balanceAdjustment(row)}>
            <FolderSync className="mr-2 h-4 w-4" />
            Balance Adjustment
          </DropdownMenuItem>
        )}
        {releaseBalance && (
          <DropdownMenuItem onClick={() => releaseBalance(row)}>
            <FileSymlink className="mr-2 h-4 w-4" />
            Release Balance
          </DropdownMenuItem>
        )}
        {holdBalance && (
          <DropdownMenuItem
            onClick={() => holdBalance(row)}
            className="text-destructive"
          >
            <ShieldClose className="mr-2 h-4 w-4" />
            Hold Balance
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

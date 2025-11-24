"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, Search, CircleCheck, XCircle } from "lucide-react";
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
import { BalanceRequestData } from "../../core/_model";
import { Badge, BadgeDot } from "@/components/ui/badge";

interface UseBalanceRequestTableColumnsProps {
  seeDetail: (row: BalanceRequestData) => void;
  approveRequest: (row: BalanceRequestData) => void;
  rejectRequest: (row: BalanceRequestData) => void;
}

export function useBalanceRequestTableColumns({
  seeDetail,
  approveRequest,
  rejectRequest,
}: UseBalanceRequestTableColumnsProps): ColumnDef<BalanceRequestData>[] {
  const { copyToClipboard } = useCopyToClipboard();

  return useMemo<ColumnDef<BalanceRequestData>[]>(
    () => [
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
        size: 180,
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => <StatusCell status={row.original.status} />,
        enableSorting: true,
        size: 120,
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
        id: "activityType",
        accessorKey: "activityType",
        header: ({ column }) => (
          <DataGridColumnHeader title="Activity Type" column={column} />
        ),
        cell: ({ row }) => (
          <ActivityTypeCell type={row.original.activityType} />
        ),
        enableSorting: true,
        size: 170,
      },
      {
        id: "activityAmount",
        accessorKey: "activityAmount",
        header: ({ column }) => (
          <DataGridColumnHeader title="Activity Amount" column={column} />
        ),
        cell: ({ row }) => (
          <CurrencyCell currency={row.original.activityAmount} />
        ),
        enableSorting: true,
        size: 150,
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
        size: 150,
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
        size: 150,
      },
      {
        id: "notesReason",
        accessorKey: "notesReason",
        header: ({ column }) => (
          <DataGridColumnHeader title="Notes/Reason" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground max-w-[200px] text-wrap truncate">
            {row.original.notesReason}
          </span>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "requestedBy",
        accessorKey: "requestedBy",
        header: ({ column }) => (
          <DataGridColumnHeader title="Requested By" column={column} />
        ),
        cell: ({ row }) => <UserCell user={row.original.requestedBy} />,
        enableSorting: true,
        size: 250,
      },
      {
        id: "reviewerUser",
        accessorKey: "reviewerUser",
        header: ({ column }) => (
          <DataGridColumnHeader title="Reviewer User" column={column} />
        ),
        cell: ({ row }) => <UserCell user={row.original.reviewerUser} />,
        enableSorting: true,
        size: 250,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <ActionsCell
            row={row.original}
            seeDetail={seeDetail}
            approveRequest={approveRequest}
            rejectRequest={rejectRequest}
          />
        ),
        enableSorting: false,
        size: 100,
      },
    ],
    [copyToClipboard, seeDetail, approveRequest, rejectRequest]
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
        onClick={(e) => {
          e.stopPropagation();
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
  currency: BalanceRequestData["activityAmount"];
}

function CurrencyCell({ currency }: CurrencyCellProps) {
  return (
    <span className="text-sm text-gray-800 font-mono">
      {currency.formatted}
    </span>
  );
}

interface DateCellProps {
  dateInfo: BalanceRequestData["lastActivityDate"];
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

interface ActivityTypeCellProps {
  type: BalanceRequestData["activityType"];
}

function ActivityTypeCell({ type }: ActivityTypeCellProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "topup":
        return "success";
      case "withdrawal":
        return "warning";
      case "adjustment":
        return "info";
      default:
        return "info";
    }
  };

  return (
    <Badge
      variant={getTypeColor(type.type)}
      size="md"
      appearance="light"
      shape="circle"
    >
      <BadgeDot className={getTypeColor(type.type)} />
      {type.type.slice(0, 1).toUpperCase() + type.type.slice(1)}
    </Badge>
  );
}

interface StatusCellProps {
  status: BalanceRequestData["status"];
}

function StatusCell({ status }: StatusCellProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "destructive";
      case "processing":
        return "info";
      default:
        return "info";
    }
  };

  return (
    <Badge
      variant={getStatusColor(status.status)}
      size="md"
      appearance="light"
      shape="circle"
    >
      <BadgeDot className={getStatusColor(status.status)} />
      {status.label}
    </Badge>
  );
}

interface UserCellProps {
  user: BalanceRequestData["requestedBy"] | null;
}

function UserCell({ user }: UserCellProps) {
  if (!user) {
    return <span className="text-sm text-muted-foreground">-</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
        {user.abbreviation}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {user.username}
        </span>
        <span className="text-xs text-muted-foreground">{user.email}</span>
      </div>
    </div>
  );
}

interface ActionsCellProps {
  row: BalanceRequestData;
  seeDetail: (row: BalanceRequestData) => void;
  approveRequest: (row: BalanceRequestData) => void;
  rejectRequest: (row: BalanceRequestData) => void;
}

function ActionsCell({
  row,
  seeDetail,
  approveRequest,
  rejectRequest,
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
        <DropdownMenuItem onClick={() => seeDetail(row)}>
          <Search className="mr-2 h-4 w-4" />
          See Detail
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => approveRequest(row)}>
          <CircleCheck className="mr-2 h-4 w-4 text-success" />
          Approve Request
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => rejectRequest(row)}>
          <XCircle className="mr-2 h-4 w-4 text-danger" />
          Reject Request
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

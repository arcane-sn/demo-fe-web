"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MerchantCallbackLogData } from "../../core/types";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Button } from "@/components/ui/button";
import { Badge, BadgeDot } from "@/components/ui/badge";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, ExternalLink } from "lucide-react";

Dayjs.extend(utc);

// Helper function to render date columns correctly
const renderDateCell = (dateString: string) => {
  const localTime = Dayjs.utc(dateString).local();
  const formattedDate = localTime.format("ddd, MMM DD, YYYY");
  const formattedTime = localTime.format("HH:mm:ss");
  const offsetHours = localTime.utcOffset() / 60;
  const offsetSign = offsetHours >= 0 ? "+" : "-";
  const offsetValue = Math.abs(offsetHours);
  const formattedOffset = `${offsetSign}${offsetValue}`;

  return (
    <div>
      <p className="text-sm font-normal text-slate-800">{formattedDate}</p>
      <p className="text-xs font-normal text-slate-600">
        {formattedTime} {`(GMT ${formattedOffset})`}
      </p>
    </div>
  );
};

// Status badge component with BadgeDot
const StatusBadge = ({
  status,
}: {
  status: MerchantCallbackLogData["status"];
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "success":
        return {
          label: "Success",
          variant: "success" as const,
          appearance: "light" as const,
          dotColor: "bg-green-500",
        };
      case "failed":
        return {
          label: "Failed",
          variant: "destructive" as const,
          appearance: "light" as const,
          dotColor: "bg-red-500",
        };
      case "pending":
        return {
          label: "Pending",
          variant: "warning" as const,
          appearance: "light" as const,
          dotColor: "bg-yellow-500",
        };
      case "processing":
        return {
          label: "Processing",
          variant: "info" as const,
          appearance: "light" as const,
          dotColor: "bg-violet-500",
        };
      default:
        return {
          label: status,
          variant: "secondary" as const,
          appearance: "light" as const,
          dotColor: "bg-gray-500",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant={config.variant}
      appearance={config.appearance}
      shape="circle"
      className="text-xs font-medium"
    >
      <BadgeDot className={config.dotColor} />
      {config.label}
    </Badge>
  );
};

// URL cell with click functionality
const URLCell = ({ url }: { url: string }) => (
  <Button
    variant="ghost"
    size="sm"
    className="h-auto p-0 text-sm font-normal text-primary hover:text-primary/80 hover:underline"
    onClick={(e) => {
      e.stopPropagation();
      window.open(url, "_blank", "noopener,noreferrer");
    }}
  >
    <span className="flex items-center gap-1">
      {url}
      <ExternalLink className="h-3 w-3" />
    </span>
  </Button>
);

// Table columns configuration
export function useMerchantCallbackLogTableColumns(
  onResendCallback?: (row: MerchantCallbackLogData) => void,
  onSeeResponseDetail?: (row: MerchantCallbackLogData) => void
): ColumnDef<MerchantCallbackLogData>[] {
  return useMemo<ColumnDef<MerchantCallbackLogData>[]>(() => {
    const columns: ColumnDef<MerchantCallbackLogData>[] = [
      {
        id: "createdDate",
        accessorKey: "createdDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Created Date" column={column} />
        ),
        cell: ({ row }) => renderDateCell(row.original.createdDate),
        enableSorting: true,
        size: 200,
      },
      {
        id: "updatedDate",
        accessorKey: "updatedDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Updated Date" column={column} />
        ),
        cell: ({ row }) => renderDateCell(row.original.updatedDate),
        enableSorting: true,
        size: 200,
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
        size: 250,
      },
      {
        id: "clientId",
        accessorKey: "clientId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Client ID" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800 font-mono">
            {row.original.clientId}
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "referenceNumber",
        accessorKey: "referenceNumber",
        header: ({ column }) => (
          <DataGridColumnHeader title="Reference Number" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800 font-mono">
            {row.original.referenceNumber}
          </div>
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
          <div className="text-sm font-normal text-slate-800 font-mono">
            {row.original.partnerReferenceNumber}
          </div>
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
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
        enableSorting: true,
        size: 140,
      },
      {
        id: "url",
        accessorKey: "url",
        header: ({ column }) => (
          <DataGridColumnHeader title="URL" column={column} />
        ),
        cell: ({ row }) => <URLCell url={row.original.url} />,
        enableSorting: true,
        size: 320,
      },
      {
        id: "responseCode",
        accessorKey: "responseCode",
        header: ({ column }) => (
          <DataGridColumnHeader title="Response Code" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.responseCode ?? "N/A"}
          </div>
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: "responseMessage",
        accessorKey: "responseMessage",
        header: ({ column }) => (
          <DataGridColumnHeader title="Response Message" column={column} />
        ),
        cell: ({ row }) => (
          <div
            className="text-sm font-normal text-slate-800 max-w-xs truncate"
            title={row.original.responseMessage}
          >
            {row.original.responseMessage}
          </div>
        ),
        enableSorting: false,
        size: 200,
      },
      {
        id: "remainingRetry",
        accessorKey: "remainingRetry",
        header: ({ column }) => (
          <DataGridColumnHeader title="Remaining Retry" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.remainingRetry}
          </div>
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: "httpStatus",
        accessorKey: "httpStatus",
        header: ({ column }) => (
          <DataGridColumnHeader title="HTTP Status" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.httpStatus ?? "N/A"}
          </div>
        ),
        enableSorting: true,
        size: 120,
      },
      {
        id: "actions",
        header: () => null,
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded border border-gray-300 hover:bg-gray-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EllipsisVertical className="h-4 w-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onResendCallback) {
                      onResendCallback(row.original);
                    }
                  }}
                >
                  Resend Callback
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSeeResponseDetail) {
                      onSeeResponseDetail(row.original);
                    }
                  }}
                >
                  See Response Detail
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
        enableSorting: false,
        size: 60,
      },
    ];

    return columns;
  }, [onResendCallback, onSeeResponseDetail]);
}

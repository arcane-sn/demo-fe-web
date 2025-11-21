"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { ApplicationLogData } from "../../core/types";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Button } from "@/components/ui/button";
import { Copy, Search } from "lucide-react";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

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

// Copy button component
const CopyButton = ({ text, label }: { text: string; label: string }) => (
  <Button
    variant="ghost"
    size="sm"
    className="h-6 w-6 p-0"
    onClick={() => {
      navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard`);
    }}
    title={`Copy ${label}`}
  >
    <Copy className="h-3 w-3" />
  </Button>
);

// Level badge component
const LevelBadge = ({ level }: { level: ApplicationLogData["level"] }) => {
  const getVariant = (level: string) => {
    switch (level) {
      case "ERROR":
        return "destructive";
      case "WARN":
        return "warning";
      case "INFO":
        return "info";
      case "DEBUG":
        return "secondary";
      default:
        return "info";
    }
  };

  return (
    <Badge variant={getVariant(level)} className="text-xs font-medium">
      {level}
    </Badge>
  );
};

// Table columns configuration
export function useApplicationLogTableColumns(
  onView?: (row: ApplicationLogData) => void
): ColumnDef<ApplicationLogData>[] {
  return useMemo<ColumnDef<ApplicationLogData>[]>(() => {
    const columns: ColumnDef<ApplicationLogData>[] = [
      {
        id: "timestamp",
        accessorKey: "timestamp",
        header: ({ column }) => (
          <DataGridColumnHeader title="Timestamp" column={column} />
        ),
        cell: ({ row }) => renderDateCell(row.original.timestamp),
        enableSorting: true,
        size: 200,
      },
      {
        id: "logId",
        accessorKey: "logId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Log ID" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-between">
            <div className="text-sm font-normal text-slate-800 font-mono">
              {row.original.logId}
            </div>
            <CopyButton text={row.original.logId} label="Log ID" />
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "level",
        accessorKey: "level",
        header: ({ column }) => (
          <DataGridColumnHeader title="Level" column={column} />
        ),
        cell: ({ row }) => <LevelBadge level={row.original.level} />,
        enableSorting: true,
        size: 120,
      },
      {
        id: "serviceName",
        accessorKey: "serviceName",
        header: ({ column }) => (
          <DataGridColumnHeader title="Service Name" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.serviceName}
          </div>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: "eventType",
        accessorKey: "eventType",
        header: ({ column }) => (
          <DataGridColumnHeader title="Event Type" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.eventType}
          </div>
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: "env",
        accessorKey: "env",
        header: ({ column }) => (
          <DataGridColumnHeader title="Env" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800 capitalize">
            {row.original.env}
          </div>
        ),
        enableSorting: true,
        size: 120,
      },
      {
        id: "responseStatus",
        accessorKey: "responseStatus",
        header: ({ column }) => (
          <DataGridColumnHeader title="Response Status" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.responseStatus ?? "N/A"}
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
        id: "userId",
        accessorKey: "userId",
        header: ({ column }) => (
          <DataGridColumnHeader title="User ID" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800 font-mono">
            {row.original.userId ?? "N/A"}
          </div>
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: "clientId",
        accessorKey: "clientId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Client ID" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800 font-mono">
            {row.original.clientId ?? "N/A"}
          </div>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: "traceId",
        accessorKey: "traceId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Trace ID" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800 font-mono">
            {row.original.traceId}
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "ipAddress",
        accessorKey: "ipAddress",
        header: ({ column }) => (
          <DataGridColumnHeader title="IP Address" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800 font-mono">
            {row.original.ipAddress}
          </div>
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: "actions",
        header: () => null,
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded border border-gray-300 hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                if (onView) {
                  onView(row.original);
                } else {
                  console.log("View application log details:", row.original);
                }
              }}
              title="View details"
            >
              <Search className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        ),
        enableSorting: false,
        size: 60,
      },
    ];

    return columns;
  }, [onView]);
}

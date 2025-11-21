"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { AuditLogData } from "./core/types";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Button } from "@/components/ui/button";
import { Copy, Search } from "lucide-react";
import { InitialsAvatar } from "@/components/reusable/InitialsAvatar";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "sonner";

Dayjs.extend(utc);

// Helper function to render date columns correctly
const renderDateCell = (dateString: string) => {
  const localTime = Dayjs.utc(dateString).local();
  const formattedDate = localTime.format("ddd, MMM DD, YYYY");
  const formattedTime = localTime.format("HH:mm:ss");
  // Format offset as +7 or -5 instead of +07:00
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

// Action button component
const ActionButton = ({ action }: { action: string }) => {
  const getActionLabel = (action: string) => {
    switch (action) {
      case "LOGIN":
        return "Login";
      case "CREATE":
        return "Create";
      case "UPDATE":
        return "Update";
      case "DELETE":
        return "Delete";
      case "REVIEW":
        return "Review";
      default:
        return action;
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-7 px-3 text-xs font-medium"
    >
      {getActionLabel(action)}
    </Button>
  );
};

// User info component
const UserInfo = ({ user }: { user: AuditLogData["user"] }) => (
  <div className="flex items-center gap-2.5">
    <InitialsAvatar name={user.name} size="md" />
    <div className="flex flex-col gap-0.5">
      <div className="text-sm font-medium text-slate-900 leading-none">
        {user.name}
      </div>
      <div className="text-xs font-normal text-slate-600 leading-none">
        {user.email}
      </div>
    </div>
  </div>
);

// Table columns configuration
export function useAuditLogTableColumns(
  isMerchantLogs = false,
  onView?: (row: AuditLogData) => void
): ColumnDef<AuditLogData>[] {
  return useMemo<ColumnDef<AuditLogData>[]>(
    () => {
      const baseColumns: ColumnDef<AuditLogData>[] = [
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
          id: "userId",
          accessorKey: "userId",
          header: ({ column }) => (
            <DataGridColumnHeader title="User ID" column={column} />
          ),
          cell: ({ row }) => (
            <div className="flex items-center justify-between">
              <div className="text-sm font-normal text-slate-800 font-mono">
                {row.original.userId}
              </div>
              <CopyButton text={row.original.userId} label="User ID" />
            </div>
          ),
          enableSorting: true,
          size: 180,
        },
        {
          id: "user",
          accessorKey: "user",
          header: ({ column }) => (
            <DataGridColumnHeader title="User" column={column} />
          ),
          cell: ({ row }) => <UserInfo user={row.original.user} />,
          enableSorting: true,
          size: 230,
        },
      ];

      // Add Client ID and Merchant Name columns for merchant logs
      if (isMerchantLogs) {
        baseColumns.push(
          {
            id: "clientId",
            accessorKey: "clientId",
            header: ({ column }) => (
              <DataGridColumnHeader title="Client ID" column={column} />
            ),
            cell: ({ row }) => (
              <div className="flex items-center justify-between">
                <div className="text-sm font-normal text-slate-800 font-mono">
                  {row.original.clientId || "N/A"}
                </div>
                {row.original.clientId && (
                  <CopyButton text={row.original.clientId} label="Client ID" />
                )}
              </div>
            ),
            enableSorting: true,
            size: 220,
          },
          {
            id: "merchantName",
            accessorKey: "merchantName",
            header: ({ column }) => (
              <DataGridColumnHeader title="Merchant Name" column={column} />
            ),
            cell: ({ row }) => (
              <div className="text-sm font-normal text-slate-800">
                {row.original.merchantName || "N/A"}
              </div>
            ),
            enableSorting: true,
            size: 250,
          }
        );
      }

      // Add remaining columns
      baseColumns.push(
        {
          id: "action",
          accessorKey: "action",
          header: ({ column }) => (
            <DataGridColumnHeader title="Action" column={column} />
          ),
          cell: ({ row }) => {
            const actions = Array.isArray(row.original.action) 
              ? row.original.action 
              : [row.original.action];
            return (
              <div className="flex items-center gap-2 whitespace-nowrap">
                {actions.map((action, index) => (
                  <ActionButton key={index} action={action} />
                ))}
              </div>
            );
          },
          enableSorting: true,
          minSize: 200,
          size: 250,
        },
        {
          id: "sectionType",
          accessorKey: "sectionType",
          header: ({ column }) => (
            <DataGridColumnHeader title="Section Type" column={column} />
          ),
          cell: ({ row }) => (
            <div className="text-sm font-normal text-slate-800">
              {row.original.sectionType}
            </div>
          ),
          enableSorting: true,
          size: 180,
        },
        {
          id: "sectionId",
          accessorKey: "sectionId",
          header: ({ column }) => (
            <DataGridColumnHeader title="Section ID" column={column} />
          ),
          cell: ({ row }) => (
            <div className="text-sm font-normal text-slate-800">
              {row.original.sectionId}
            </div>
          ),
          enableSorting: true,
          size: 160,
        },
        {
          id: "beforeChange",
          accessorKey: "beforeChange",
          header: ({ column }) => (
            <DataGridColumnHeader title="Before Changes" column={column} />
          ),
          cell: ({ row }) => {
            const value = row.original.beforeChange;
            return (
              <div className="text-sm font-normal text-slate-800 max-w-xs truncate" title={value}>
                {value || "N/A"}
              </div>
            );
          },
          enableSorting: false,
          size: 200,
        },
        {
          id: "afterChange",
          accessorKey: "afterChange",
          header: ({ column }) => (
            <DataGridColumnHeader title="After Changes" column={column} />
          ),
          cell: ({ row }) => {
            const value = row.original.afterChange;
            return (
              <div className="text-sm font-normal text-slate-800 max-w-xs truncate" title={value}>
                {value || "N/A"}
              </div>
            );
          },
          enableSorting: false,
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
          size: 180,
        }
      );

      // Add action column with search icon button on the right
      baseColumns.push({
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
                  console.log("View audit log details:", row.original);
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
      });

      return baseColumns;
    },
    [isMerchantLogs, onView],
  );
}


"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { ActivityLog } from "../types";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { StatusBadge } from "@/components/reusable/StatusBadge";

// Status badge component
const ActivityStatusBadge = ({ status }: { status: ActivityLog["status"] }) => {
  const getVariant = (status: ActivityLog["status"]) => {
    switch (status) {
      case "success":
        return "success" as const;
      case "failed":
        return "destructive" as const;
      case "pending":
        return "warning" as const;
      default:
        return "secondary" as const;
    }
  };

  return (
    <StatusBadge variant={getVariant(status)} size="md" className="text-xs font-medium">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </StatusBadge>
  );
};

// Table columns configuration
export function useActivityTableColumns(): ColumnDef<ActivityLog>[] {
  return useMemo<ColumnDef<ActivityLog>[]>(
    () => [
      {
        id: "timestamp",
        accessorKey: "timestamp",
        header: ({ column }) => (
          <DataGridColumnHeader title="Timestamp" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.timestamp}
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "action",
        accessorKey: "action",
        header: ({ column }) => (
          <DataGridColumnHeader title="Action" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-medium text-slate-800">
            {row.original.action}
          </div>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: "description",
        accessorKey: "description",
        header: ({ column }) => (
          <DataGridColumnHeader title="Description" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.description}
          </div>
        ),
        enableSorting: true,
        size: 300,
      },
      {
        id: "user",
        accessorKey: "user",
        header: ({ column }) => (
          <DataGridColumnHeader title="User" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.user}
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
        size: 150,
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => <ActivityStatusBadge status={row.original.status} />,
        enableSorting: true,
        size: 120,
      },
    ],
    [],
  );
}


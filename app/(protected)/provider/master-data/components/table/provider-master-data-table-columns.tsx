"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { ProviderMasterData } from "../../core/_models";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { InitialsAvatar } from "@/components/reusable/InitialsAvatar";

// Status badge component
const StatusBadge = ({ status }: { status: ProviderMasterData["status"] }) => {
  const getStatusConfig = (status: ProviderMasterData["status"]) => {
    switch (status) {
      case "Active":
        return {
          variant: "success" as const,
          appearance: "light" as const,
        };
      case "Inactive":
        return {
          variant: "destructive" as const,
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
      size="md"
      className="rounded-full text-xs font-medium"
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

// User info component
const UserInfo = ({ user }: { user: ProviderMasterData["registeredBy"] }) => (
  <div className="flex items-center gap-2.5">
    <InitialsAvatar name={user.name} />
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
export function useProviderMasterDataColumns(): ColumnDef<ProviderMasterData>[] {
  return useMemo<ColumnDef<ProviderMasterData>[]>(
    () => [
      {
        id: "providerId",
        accessorKey: "providerId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Provider ID" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-between">
            <div className="text-sm font-normal text-slate-800">
              {row.original.providerId}
            </div>
            <CopyButton text={row.original.providerId} label="Provider ID" />
          </div>
        ),
        enableSorting: true,
        size: 210,
      },
      {
        id: "providerName",
        accessorKey: "providerName",
        header: ({ column }) => (
          <DataGridColumnHeader title="Provider Name" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.providerName}
          </div>
        ),
        enableSorting: true,
        size: 192,
      },
      {
        id: "providerType",
        accessorKey: "providerType",
        header: ({ column }) => (
          <DataGridColumnHeader title="Provider Type" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.providerType}
          </div>
        ),
        enableSorting: true,
        size: 144,
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
        enableSorting: true,
        size: 144,
      },
      {
        id: "registeredDate",
        accessorKey: "registeredDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Registered Date" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-1.5">
            <div className="text-sm font-normal text-slate-800">
              {row.original.registeredDate}
            </div>
            <div className="text-xs font-normal text-slate-600">
              {row.original.registeredTime}
            </div>
          </div>
        ),
        enableSorting: true,
        size: 176,
      },
      {
        id: "registeredBy",
        accessorKey: "registeredBy",
        header: ({ column }) => (
          <DataGridColumnHeader title="Registered by" column={column} />
        ),
        cell: ({ row }) => <UserInfo user={row.original.registeredBy} />,
        enableSorting: false,
        size: 256,
      },
      {
        id: "updatedDate",
        accessorKey: "updatedDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Updated Date" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-1.5">
            <div className="text-sm font-normal text-slate-800">
              {row.original.updatedDate}
            </div>
            <div className="text-xs font-normal text-slate-600">
              {row.original.updatedTime}
            </div>
          </div>
        ),
        enableSorting: true,
        size: 176,
      },
      {
        id: "updatedBy",
        accessorKey: "updatedBy",
        header: ({ column }) => (
          <DataGridColumnHeader title="Updated by" column={column} />
        ),
        cell: ({ row }) => <UserInfo user={row.original.updatedBy} />,
        enableSorting: false,
        size: 256,
      },
    ],
    [],
  );
}


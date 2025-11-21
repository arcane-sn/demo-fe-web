"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { UserData } from "./core/types";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
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

// Status badge component
const StatusBadge = ({ status }: { status: UserData["accountStatus"] }) => {
  const getStatusConfig = (status: UserData["accountStatus"]) => {
    switch (status) {
      case "active":
        return {
          variant: "success" as const,
          appearance: "light" as const,
        };
      case "inactive":
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
      shape="circle"
    >
      <BadgeDot className={status === "active" ? "success" : "destructive"} />
      {status}
    </Badge>
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

// Account info component
const AccountInfo = ({ user }: { user: UserData }) => (
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
export function useUserListTableColumns(): ColumnDef<UserData>[] {
  return useMemo<ColumnDef<UserData>[]>(
    () => [
      {
        id: "userID",
        accessorKey: "userID",
        header: ({ column }) => (
          <DataGridColumnHeader title="User ID" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-between">
            <div className="text-sm font-normal text-slate-800">
              {row.original.userID}
            </div>
            <CopyButton text={row.original.userID} label="User ID" />
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "account",
        header: ({ column }) => (
          <DataGridColumnHeader title="Account" column={column} />
        ),
        cell: ({ row }) => <AccountInfo user={row.original} />,
        enableSorting: true,
        size: 300,
      },
      {
        id: "userName",
        accessorKey: "userName",
        header: ({ column }) => (
          <DataGridColumnHeader title="Username" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.userName}
          </div>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        header: ({ column }) => (
          <DataGridColumnHeader title="Phone Number" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-between">
            <div className="text-sm font-normal text-slate-800">
              {row.original.phoneNumber}
            </div>
            <CopyButton text={row.original.phoneNumber} label="Phone Number" />
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "role",
        accessorKey: "role",
        header: ({ column }) => (
          <DataGridColumnHeader title="Role" column={column} />
        ),
        cell: ({ row }) => (
          <Badge
            variant="secondary"
            appearance="light"
            size="sm"
            className="rounded-md"
          >
            {row.original.role}
          </Badge>
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: "clientID",
        accessorKey: "clientID",
        header: ({ column }) => (
          <DataGridColumnHeader title="Client ID" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-between">
            <div className="text-sm font-normal text-slate-800">
              {row.original.clientID}
            </div>
            <CopyButton text={row.original.clientID} label="Client ID" />
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "accountStatus",
        accessorKey: "accountStatus",
        header: ({ column }) => (
          <DataGridColumnHeader title="Account Status" column={column} />
        ),
        cell: ({ row }) => <StatusBadge status={row.original.accountStatus} />,
        enableSorting: true,
        size: 140,
      },
      {
        id: "failedLoginAttempt",
        accessorKey: "failedLoginAttempt",
        header: ({ column }) => (
          <DataGridColumnHeader title="Failed Login Attempt" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.failedLoginAttempt}
          </div>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: "lastLoginDate",
        accessorKey: "loginDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Login Date" column={column} />
        ),
        cell: ({ row }) => renderDateCell(row.original.loginDate),
        enableSorting: true,
        size: 200,
      },
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
        accessorKey: "updateDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Updated Date" column={column} />
        ),
        cell: ({ row }) => renderDateCell(row.original.updateDate),
        enableSorting: true,
        size: 200,
      },
    ],
    [],
  );
}


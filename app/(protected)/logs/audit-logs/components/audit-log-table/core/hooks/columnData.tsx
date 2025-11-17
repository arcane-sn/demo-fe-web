import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface AuditLogData {
  id: string;
  timestamp: string;
  userId: string;
  user: string;
  action: string;
  sectionType: string;
  sectionId: string;
  beforeChange: string;
  afterChange: string;
  ipAddress: string;
}

export const getAuditLogColumns = (): ColumnDef<AuditLogData>[] => [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const date = new Date(row.getValue("timestamp"));
      return (
        <div>
          <div className="font-medium">{date.toLocaleDateString()}</div>
          <div className="text-sm text-muted-foreground">
            {date.toLocaleTimeString()}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => {
      return <div className="font-mono text-sm">{row.getValue("userId")}</div>;
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("user")}</div>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const action = row.getValue("action") as string;
      return (
        <Badge
          variant={
            action === "CREATE"
              ? "primary"
              : action === "UPDATE"
                ? "info"
                : action === "DELETE"
                  ? "destructive"
                  : "outline"
          }
        >
          {action}
        </Badge>
      );
    },
  },
  {
    accessorKey: "sectionType",
    header: "Section Type",
    cell: ({ row }) => {
      return <div>{row.getValue("sectionType")}</div>;
    },
  },
  {
    accessorKey: "sectionId",
    header: "Section ID",
    cell: ({ row }) => {
      return (
        <div className="font-mono text-sm">{row.getValue("sectionId")}</div>
      );
    },
  },
  {
    accessorKey: "beforeChange",
    header: "Before Change",
    cell: ({ row }) => {
      const value = row.getValue("beforeChange") as string;
      return (
        <div className="max-w-xs truncate" title={value}>
          {value || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "afterChange",
    header: "After Change",
    cell: ({ row }) => {
      const value = row.getValue("afterChange") as string;
      return (
        <div className="max-w-xs truncate" title={value}>
          {value || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => {
      return (
        <div className="font-mono text-sm">{row.getValue("ipAddress")}</div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const log = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(log.id)}
            >
              Copy log ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit log
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete log
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

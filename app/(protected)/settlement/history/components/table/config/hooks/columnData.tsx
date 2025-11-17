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

export interface SettlementHistoryData {
  id: string;
  settlementDate: string;
  reportDate: string;
  settlementStatus: "completed" | "pending" | "failed";
  reportingStatus: "completed" | "pending" | "failed";
  merchantName: string;
  clientId: string;
  channel: string;
  totalTransaction: number;
  totalPaidAmount: number;
  netSettlementAmount: number;
  mdr: number;
  providerRate: number;
  merchantRate: number;
  flypayRate: number;
  resellerRate: number;
  merchantReferralFee: number;
  salesReferralFee: number;
  settlementId: string;
  reportId: string;
  updatedDate: string;
}

export const getSettlementHistoryColumns =
  (): ColumnDef<SettlementHistoryData>[] => [
    {
      accessorKey: "settlementDate",
      header: "Settlement Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("settlementDate"));
        return <div className="font-medium">{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: "reportDate",
      header: "Report Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("reportDate"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: "settlementStatus",
      header: "Settlement Status",
      cell: ({ row }) => {
        const status = row.getValue("settlementStatus") as string;
        return (
          <Badge
            variant={
              status === "completed"
                ? "primary"
                : status === "pending"
                  ? "secondary"
                  : "destructive"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "reportingStatus",
      header: "Reporting Status",
      cell: ({ row }) => {
        const status = row.getValue("reportingStatus") as string;
        return (
          <Badge
            variant={
              status === "completed"
                ? "primary"
                : status === "pending"
                  ? "secondary"
                  : "destructive"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "merchantName",
      header: "Merchant Name",
      cell: ({ row }) => {
        return (
          <div className="font-medium">{row.getValue("merchantName")}</div>
        );
      },
    },
    {
      accessorKey: "clientId",
      header: "Client ID",
      cell: ({ row }) => {
        return (
          <div className="font-mono text-sm">{row.getValue("clientId")}</div>
        );
      },
    },
    {
      accessorKey: "channel",
      header: "Channel",
      cell: ({ row }) => {
        return <div>{row.getValue("channel")}</div>;
      },
    },
    {
      accessorKey: "totalTransaction",
      header: "Total Transaction",
      cell: ({ row }) => {
        const amount = row.getValue("totalTransaction") as number;
        return <div>{amount.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "totalPaidAmount",
      header: "Total Paid Amount",
      cell: ({ row }) => {
        const amount = row.getValue("totalPaidAmount") as number;
        return <div>IDR {amount.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "netSettlementAmount",
      header: "Net Settlement Amount",
      cell: ({ row }) => {
        const amount = row.getValue("netSettlementAmount") as number;
        return (
          <div className="font-semibold">IDR {amount.toLocaleString()}</div>
        );
      },
    },
    {
      accessorKey: "mdr",
      header: "MDR",
      cell: ({ row }) => {
        const amount = row.getValue("mdr") as number;
        return <div>IDR {amount.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "providerRate",
      header: "Provider Rate",
      cell: ({ row }) => {
        const rate = row.getValue("providerRate") as number;
        return <div>{rate}%</div>;
      },
    },
    {
      accessorKey: "merchantRate",
      header: "Merchant Rate",
      cell: ({ row }) => {
        const rate = row.getValue("merchantRate") as number;
        return <div>{rate}%</div>;
      },
    },
    {
      accessorKey: "flypayRate",
      header: "Flypay Rate",
      cell: ({ row }) => {
        const rate = row.getValue("flypayRate") as number;
        return <div className="text-blue-600">{rate}%</div>;
      },
    },
    {
      accessorKey: "resellerRate",
      header: "Reseller Rate",
      cell: ({ row }) => {
        const rate = row.getValue("resellerRate") as number;
        return <div>{rate}%</div>;
      },
    },
    {
      accessorKey: "merchantReferralFee",
      header: "Merchant Referral Fee",
      cell: ({ row }) => {
        const amount = row.getValue("merchantReferralFee") as number;
        return <div>IDR {amount.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "salesReferralFee",
      header: "Sales Referral Fee",
      cell: ({ row }) => {
        const amount = row.getValue("salesReferralFee") as number;
        return <div>IDR {amount.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "settlementId",
      header: "Settlement ID",
      cell: ({ row }) => {
        return (
          <div className="font-mono text-sm">
            {row.getValue("settlementId")}
          </div>
        );
      },
    },
    {
      accessorKey: "reportId",
      header: "Report ID",
      cell: ({ row }) => {
        return (
          <div className="font-mono text-sm">{row.getValue("reportId")}</div>
        );
      },
    },
    {
      accessorKey: "updatedDate",
      header: "Updated Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("updatedDate"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const settlement = row.original;

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
                onClick={() => navigator.clipboard.writeText(settlement.id)}
              >
                Copy settlement ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit settlement
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete settlement
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { SettlementHistoryData } from "../../../../core/models";
import { formatCurrency } from "../../../../core/helpers";

const statusConfig: Record<
  "success" | "pending" | "failed",
  { variant: "success" | "warning" | "destructive"; label: string }
> = {
  success: { variant: "success", label: "Success" },
  pending: { variant: "warning", label: "Pending" },
  failed: { variant: "destructive", label: "Failed" },
};

export const getSettlementHistoryColumns =
  (): ColumnDef<SettlementHistoryData>[] => [
    {
      accessorKey: "settlementDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Settlement Date" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-0.5">
            <span className="font-normal text-gray-900">
              {row.original.settlementDate}
            </span>
            <span className="text-xs text-muted-foreground">
              {row.original.settlementTime}
            </span>
          </div>
        );
      },
      enableSorting: true,
      size: 170,
    },
    {
      accessorKey: "reportDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Report Date" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-0.5">
            <span className="font-normal text-gray-900">
              {row.original.reportDate}
            </span>
            <span className="text-xs text-muted-foreground">
              {row.original.reportTime}
            </span>
          </div>
        );
      },
      enableSorting: true,
      size: 170,
    },
    {
      accessorKey: "settlementStatus",
      header: ({ column }) => (
        <DataGridColumnHeader title="Settlement Status" column={column} />
      ),
      cell: ({ row }) => {
        const status = row.original.settlementStatus;
        const config = statusConfig[status];
        return (
          <Badge
            variant={config.variant}
            appearance="light"
            size="md"
            className="rounded-full gap-1"
          >
            <BadgeDot />
            {config.label}
          </Badge>
        );
      },
      size: 180,
    },
    {
      accessorKey: "reportingStatus",
      header: ({ column }) => (
        <DataGridColumnHeader title="Reporting Status" column={column} />
      ),
      cell: ({ row }) => {
        const status = row.original.reportingStatus;
        const config = statusConfig[status];
        return (
          <Badge
            variant={config.variant}
            appearance="light"
            size="md"
            className="rounded-full gap-1"
          >
            <BadgeDot />
            {config.label}
          </Badge>
        );
      },
      size: 180,
    },
    {
      accessorKey: "merchantName",
      header: ({ column }) => (
        <DataGridColumnHeader title="Merchant Name" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <div className="font-normal">{row.getValue("merchantName")}</div>
        );
      },
      enableSorting: true,
      size: 220,
    },
    {
      accessorKey: "clientId",
      header: ({ column }) => (
        <DataGridColumnHeader title="Client ID" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-gray-900">
              {row.original.clientId}
            </span>
            <CopyInlineButton value={row.original.clientId} label="Client ID" />
          </div>
        );
      },
      enableSorting: true,
      size: 180,
    },
    {
      accessorKey: "channel",
      header: ({ column }) => (
        <DataGridColumnHeader title="Channel" column={column} />
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("channel")}</div>;
      },
      size: 140,
    },
    {
      accessorKey: "totalTransaction",
      header: ({ column }) => (
        <DataGridColumnHeader title="Total Transaction" column={column} />
      ),
      cell: ({ row }) => {
        const amount = row.getValue("totalTransaction") as number;
        return <div>{amount.toLocaleString()}</div>;
      },
      enableSorting: true,
      size: 160,
    },
    {
      accessorKey: "totalPaidAmount",
      header: ({ column }) => (
        <DataGridColumnHeader title="Total Paid Amount" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <div className="font-normal text-gray-900">
            {formatCurrency(row.original.totalPaidAmount)}
          </div>
        );
      },
      enableSorting: true,
      size: 190,
    },
    {
      accessorKey: "netSettlementAmount",
      header: ({ column }) => (
        <DataGridColumnHeader title="Net Settlement Amount" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <div className="font-normal text-gray-900">
            {formatCurrency(row.original.netSettlementAmount)}
          </div>
        );
      },
      enableSorting: true,
      size: 200,
    },
    {
      accessorKey: "mdr",
      header: ({ column }) => (
        <DataGridColumnHeader title="MDR" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <AmountBreakdown
            amount={row.original.mdr}
            percentage={row.original.mdrPercentage}
          />
        );
      },
      size: 230,
    },
    {
      accessorKey: "providerRate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Provider Rate" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <AmountBreakdown
            amount={row.original.providerFee}
            percentage={row.original.providerPercentage}
          />
        );
      },
      size: 230,
    },
    {
      accessorKey: "merchantRate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Merchant Rate" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <AmountBreakdown
            amount={row.original.merchantFee}
            percentage={row.original.merchantPercentage}
          />
        );
      },
      size: 230,
    },
    {
      accessorKey: "flypayRate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Flypay Rate (Excluded)" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <AmountBreakdown
            amount={row.original.flypayFee}
            percentage={row.original.flypayPercentage}
          />
        );
      },
      size: 230,
    },
    {
      accessorKey: "resellerRate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Reseller Rate" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <AmountBreakdown
            amount={row.original.resellerFee}
            percentage={row.original.resellerPercentage}
          />
        );
      },
      size: 230,
    },
    {
      accessorKey: "merchantReferralFee",
      header: ({ column }) => (
        <DataGridColumnHeader title="Merchant Referral Fee (Excluded)" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <AmountBreakdown
            amount={row.original.merchantReferralFee}
            percentage={row.original.merchantReferralPercentage}
          />
        );
      },
      size: 250,
    },
    {
      accessorKey: "salesReferralFee",
      header: ({ column }) => (
        <DataGridColumnHeader title="Sales Referral Fee (Excluded)" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <AmountBreakdown
            amount={row.original.salesReferralFee}
            percentage={row.original.salesReferralPercentage}
          />
        );
      },
      size: 230,
    },
    {
      accessorKey: "settlementId",
      header: ({ column }) => (
        <DataGridColumnHeader title="Settlement ID" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-gray-900">
              {row.original.settlementId}
            </span>
            <CopyInlineButton
              value={row.original.settlementId}
              label="Settlement ID"
            />
          </div>
        );
      },
      size: 200,
    },
    {
      accessorKey: "reportId",
      header: ({ column }) => (
        <DataGridColumnHeader title="Report ID" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-gray-900">
              {row.original.reportId}
            </span>
            <CopyInlineButton value={row.original.reportId} label="Report ID" />
          </div>
        );
      },
      size: 200,
    },
    {
      accessorKey: "updatedDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Updated Date" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-0.5">
            <span className="font-normal text-gray-900">
              {row.original.updatedDate}
            </span>
            <span className="text-xs text-muted-foreground">
              {row.original.updatedTime}
            </span>
          </div>
        );
      },
      size: 170,
    },
  ];

function AmountBreakdown({
  amount,
  percentage,
}: {
  amount: number;
  percentage: number;
}) {
  const percentageLabel = percentage
    .toFixed(2)
    .replace(/\.?0+$/, "");

  return (
    <div className="flex flex-col">
      <span className="font-normal text-gray-900">
        {formatCurrency(amount)}
      </span>
      <span className="text-xs text-muted-foreground">
        ({percentageLabel}% + IDR 0)
      </span>
    </div>
  );
}

function CopyInlineButton({ value, label }: { value: string; label: string }) {
  const { copyToClipboard } = useCopyToClipboard();

  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      onClick={() => copyToClipboard(value)}
      className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors"
    >
      <Copy className="h-3.5 w-3.5" />
    </button>
  );
}

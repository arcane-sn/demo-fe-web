import { ColumnDef } from "@tanstack/react-table";
import { PayInTransaction } from "../../../core/_models";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import CopyButton from "../../../../components/shared/CopyButton";
import { formatCurrency, renderAmountDetailCell } from "../../../../components/shared/utils";

/**
 * Default columns for non-VA and non-QRIS transactions
 * Includes Activity, Payment Method, Provider info, Amount, Rates, and Fees
 */
export function getDefaultColumns(): ColumnDef<PayInTransaction>[] {
  return [
    {
      id: "activity",
      accessorKey: "activity",
      header: ({ column }) => (
        <DataGridColumnHeader title="Activity" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.activity}
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "activityId",
      accessorKey: "activityId",
      header: ({ column }) => (
        <DataGridColumnHeader title="Activity ID" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.activityId}
          </div>
          <CopyButton text={row.original.activityId} label="Activity ID" />
        </div>
      ),
      enableSorting: true,
      size: 288,
    },
    {
      id: "paymentMethod",
      accessorKey: "paymentMethod",
      header: ({ column }) => (
        <DataGridColumnHeader title="Payment Method" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.paymentMethod}
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "paymentChannel",
      accessorKey: "paymentChannel",
      header: ({ column }) => (
        <DataGridColumnHeader title="Payment Channel" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.paymentChannel}
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "providerRefNumber",
      accessorKey: "providerRefNumber",
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Provider Ref Number"
          column={column}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.providerRefNumber}
          </div>
          <CopyButton
            text={row.original.providerRefNumber}
            label="Provider Ref Number"
          />
        </div>
      ),
      enableSorting: true,
      size: 288,
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
      size: 176,
    },
    {
      id: "amount",
      accessorKey: "amount",
      header: ({ column }) => (
        <DataGridColumnHeader title="Amount" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {formatCurrency(row.original.amount)}
        </div>
      ),
      enableSorting: true,
      size: 192,
    },
    {
      id: "mdr",
      accessorKey: "mdr",
      header: ({ column }) => (
        <DataGridColumnHeader title="MDR" column={column} />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.mdr),
      enableSorting: true,
      size: 192,
    },
    {
      id: "providerRate",
      accessorKey: "providerRate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Provider Rate" column={column} />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.providerRate),
      enableSorting: true,
      size: 192,
    },
    {
      id: "merchantRate",
      accessorKey: "merchantRate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Merchant Rate" column={column} />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.merchantRate),
      enableSorting: true,
      size: 192,
    },
    {
      id: "flypayRate",
      accessorKey: "flypayRate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Flypay Rate (Excluded)" column={column} />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.flypayRate),
      enableSorting: true,
      size: 192,
    },
    {
      id: "resellerRate",
      accessorKey: "resellerRate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Reseller Rate" column={column} />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.resellerRate),
      enableSorting: true,
      size: 192,
    },
    {
      id: "merchantReferralFee",
      accessorKey: "merchantReferralFee",
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Merchant Referral Fee (excluded)"
          column={column}
        />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.merchantReferralFee),
      enableSorting: true,
      size: 240,
    },
    {
      id: "salesReferralFee",
      accessorKey: "salesReferralFee",
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Sales Referral Fee (excluded)"
          column={column}
        />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.salesReferralFee),
      enableSorting: true,
      size: 240,
    },
    {
      id: "customerInfo",
      accessorKey: "customerInfo",
      header: ({ column }) => (
        <DataGridColumnHeader title="Customer Info" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-normal text-slate-800">
            {row.original.customerEmail}
          </div>
          <div className="text-xs text-slate-600">
            {row.original.customerPhone}
          </div>
        </div>
      ),
      enableSorting: false,
      size: 192,
    },
  ];
}


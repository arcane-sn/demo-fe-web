"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { BankData, FeeStructure } from "../../_lib/types";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { StatusBadge } from "@/components/reusable/StatusBadge";

// Helper function to format fee structure
const formatFeeStructure = (fee: FeeStructure): string => {
  const percentage = `${fee.percentage}%`;
  const fixed = `IDR ${parseInt(fee.fixed).toLocaleString()}`;
  return `${percentage} + ${fixed}`;
};

// Helper function to format transfer amounts
const formatTransferAmount = (amount: string): string => {
  return `IDR ${parseInt(amount).toLocaleString()}`;
};

// Status badge component
const BankStatusBadge = ({ status }: { status: BankData["status"] }) => {
  const getStatusVariant = (status: BankData["status"]): "success" | "destructive" | "secondary" => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <StatusBadge variant={getStatusVariant(status)} size="sm">
      {status === "active" ? "Active" : "Inactive"}
    </StatusBadge>
  );
};

// Table columns configuration
export function useDisbursementPricingColumns(): ColumnDef<BankData>[] {
  return useMemo<ColumnDef<BankData>[]>(
    () => [
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => <BankStatusBadge status={row.original.status} />,
        enableSorting: true,
        size: 120,
      },
      {
        id: "bankCode",
        accessorKey: "bankCode",
        header: ({ column }) => (
          <DataGridColumnHeader title="Bank Code" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-medium text-slate-800">
            {row.original.bankCode}
          </div>
        ),
        enableSorting: true,
        size: 120,
      },
      {
        id: "bankName",
        accessorKey: "bankName",
        header: ({ column }) => (
          <DataGridColumnHeader title="Bank Name" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-medium text-slate-800">
            {row.original.bankName}
          </div>
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: "feeTransfer",
        accessorKey: "feeTransfer",
        header: ({ column }) => (
          <DataGridColumnHeader title="Fee Transfer" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatFeeStructure(row.original.feeTransfer)}
          </div>
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: "feeTransferToVA",
        accessorKey: "feeTransferToVA",
        header: ({ column }) => (
          <DataGridColumnHeader title="Fee Transfer to VA" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatFeeStructure(row.original.feeTransferToVA)}
          </div>
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: "feeInquiry",
        accessorKey: "feeInquiry",
        header: ({ column }) => (
          <DataGridColumnHeader title="Fee Inquiry" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatFeeStructure(row.original.feeInquiry)}
          </div>
        ),
        enableSorting: true,
        size: 120,
      },
      {
        id: "feeInquiryToVA",
        accessorKey: "feeInquiryToVA",
        header: ({ column }) => (
          <DataGridColumnHeader title="Fee Inquiry to VA" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatFeeStructure(row.original.feeInquiryToVA)}
          </div>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "feeRefund",
        accessorKey: "feeRefund",
        header: ({ column }) => (
          <DataGridColumnHeader title="Fee Refund" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatFeeStructure(row.original.feeRefund)}
          </div>
        ),
        enableSorting: true,
        size: 120,
      },
      {
        id: "minimumTransfer",
        accessorKey: "minimumTransfer",
        header: ({ column }) => (
          <DataGridColumnHeader title="Minimum Transfer" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatTransferAmount(row.original.minimumTransfer)}
          </div>
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: "maximumTransfer",
        accessorKey: "maximumTransfer",
        header: ({ column }) => (
          <DataGridColumnHeader title="Maximum Transfer" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatTransferAmount(row.original.maximumTransfer)}
          </div>
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: "providerRate",
        accessorKey: "providerRate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Provider Rate" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatFeeStructure(row.original.providerRate)}
          </div>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: "merchantRate",
        accessorKey: "merchantRate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Merchant Rate" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatFeeStructure(row.original.merchantRate)}
          </div>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: "flypayRate",
        accessorKey: "flypayRate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Flypay Rate (Excluded)" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatFeeStructure(row.original.flypayRate)}
          </div>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: "salesReferralId",
        accessorKey: "salesReferralId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Sales Referral ID" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {row.original.salesReferralId}
          </div>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "salesReferralFee",
        accessorKey: "salesReferralFee",
        header: ({ column }) => (
          <DataGridColumnHeader title="Sales Referral Fee (excluded)" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatFeeStructure(row.original.salesReferralFee)}
          </div>
        ),
        enableSorting: true,
        size: 230,
      },
      {
        id: "merchantReferralId",
        accessorKey: "merchantReferralId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Merchant Referral ID" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {row.original.merchantReferralId}
          </div>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: "merchantReferralFee",
        accessorKey: "merchantReferralFee",
        header: ({ column }) => (
          <DataGridColumnHeader title="Merchant Referral Fee (excluded)" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-slate-800">
            {formatFeeStructure(row.original.merchantReferralFee)}
          </div>
        ),
        enableSorting: true,
        size: 250,
      },
    ],
    [],
  );
}


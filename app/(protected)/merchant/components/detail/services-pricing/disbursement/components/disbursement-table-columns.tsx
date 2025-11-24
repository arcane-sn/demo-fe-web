"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { BankData } from "../core/hooks/useDisbursementFilters";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { StatusBadge } from "@/components/reusable/StatusBadge";

// Status badge component
const DisbursementStatusBadge = ({ status }: { status: BankData["status"] }) => {
  const getVariant = (status: BankData["status"]) => {
    switch (status) {
      case "Active":
        return "success" as const;
      case "Inactive":
        return "destructive" as const;
      default:
        return "secondary" as const;
    }
  };

  return (
    <StatusBadge variant={getVariant(status)} size="sm">
      {status}
    </StatusBadge>
  );
};

// Table columns configuration
export function useDisbursementTableColumns(): ColumnDef<BankData>[] {
  return useMemo<ColumnDef<BankData>[]>(
    () => [
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => <DisbursementStatusBadge status={row.original.status} />,
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
          <div className="text-sm font-normal text-slate-800">
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
          <div className="text-sm font-normal text-slate-800">
            {row.original.bankName}
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "feeTransfer",
        accessorKey: "feeTransfer",
        header: ({ column }) => (
          <DataGridColumnHeader title="Fee Transfer" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.feeTransfer}
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
          <div className="text-sm font-normal text-slate-800">
            {row.original.feeTransferToVA}
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
          <div className="text-sm font-normal text-slate-800">
            {row.original.feeInquiry}
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
          <div className="text-sm font-normal text-slate-800">
            {row.original.feeInquiryToVA}
          </div>
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: "feeRefund",
        accessorKey: "feeRefund",
        header: ({ column }) => (
          <DataGridColumnHeader title="Fee Refund" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.feeRefund}
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
          <div className="text-sm font-normal text-slate-800">
            {row.original.minimumTransfer}
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
          <div className="text-sm font-normal text-slate-800">
            {row.original.maximumTransfer}
          </div>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: "createdDate",
        accessorKey: "createdDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Created Date" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.createdDate}
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "createdBy",
        accessorKey: "createdBy",
        header: ({ column }) => (
          <DataGridColumnHeader title="Created by" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.createdBy}
          </div>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "updatedDate",
        accessorKey: "updatedDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Updated Date" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.updatedDate}
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "updatedBy",
        accessorKey: "updatedBy",
        header: ({ column }) => (
          <DataGridColumnHeader title="Updated by" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.updatedBy}
          </div>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "deletedDate",
        accessorKey: "deletedDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Deleted Date" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.deletedDate}
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: "deletedBy",
        accessorKey: "deletedBy",
        header: ({ column }) => (
          <DataGridColumnHeader title="Deleted by" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm font-normal text-slate-800">
            {row.original.deletedBy}
          </div>
        ),
        enableSorting: true,
        size: 150,
      },
    ],
    []
  );
}


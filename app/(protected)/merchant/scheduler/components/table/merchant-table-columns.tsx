'use client';

import { ColumnDef } from "@tanstack/react-table";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { InitialsAvatar } from "@/components/reusable/InitialsAvatar";
import { MerchantData, StatusIndicatorProps } from "../../types/merchant-data";
import { KeenIcon } from "@/components/keenicons";
import { Button } from "@/components/ui/button";

// Status indicator component
const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label }) => {
  const isActive = status === 'active';

  return (
    <Badge
      variant="outline"
      className={`gap-2 rounded-full ${
        isActive
          ? 'border-green-500 text-green-700 bg-green-50'
          : 'border-gray-400 text-gray-600 bg-gray-50'
      }`}
    >
      <BadgeDot
        className={isActive ? 'bg-green-500' : 'bg-gray-400'}
        aria-hidden="true"
      />
      {label}
    </Badge>
  );
};

// User info component
const UserInfo: React.FC<{ user: MerchantData["updatedBy"] }> = ({ user }) => {
  return (
    <div className="flex items-center gap-2">
      <InitialsAvatar name={user.name} size="sm" className="bg-blue-50 border-blue-100" />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user.name}</span>
        <span className="text-xs text-muted-foreground">{user.email}</span>
      </div>
    </div>
  );
};

export function useMerchantTableColumns(onEdit?: (merchant: MerchantData) => void): ColumnDef<MerchantData>[] {
  return [
    {
      accessorKey: 'merchantName',
      header: ({ column }) => (
        <DataGridColumnHeader title="Merchant Name" column={column} />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.original.merchantName}</div>
      ),
      enableSorting: true,
      enableHiding: false,
      size: 200,
      minSize: 150,
      maxSize: 300,
    },
    {
      accessorKey: 'clientId',
      header: ({ column }) => (
        <DataGridColumnHeader title="Client ID" column={column} />
      ),
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.original.clientId}</div>
      ),
      enableSorting: true,
      size: 180,
      minSize: 150,
      maxSize: 250,
    },
    {
      accessorKey: 'settlement',
      header: ({ column }) => (
        <DataGridColumnHeader title="Settlement" column={column} />
      ),
      cell: ({ row }) => (
        <StatusIndicator 
          status={row.original.settlement.status} 
          label={row.original.settlement.label} 
        />
      ),
      enableSorting: true,
      size: 180,
      minSize: 100,
      maxSize: 180,
    },
    {
      accessorKey: 'transactionReport',
      header: ({ column }) => (
        <DataGridColumnHeader title="Transaction Report" column={column} />
      ),
      cell: ({ row }) => (
        <StatusIndicator 
          status={row.original.transactionReport.status} 
          label={row.original.transactionReport.label} 
        />
      ),
      enableSorting: true,
      size: 180,
      minSize: 120,
      maxSize: 180,
    },
    {
      accessorKey: 'transactionSummary',
      header: ({ column }) => (
        <DataGridColumnHeader title="Transaction Summary" column={column} />
      ),
      cell: ({ row }) => (
        <StatusIndicator 
          status={row.original.transactionSummary.status} 
          label={row.original.transactionSummary.label} 
        />
      ),
      enableSorting: true,
      size: 180,
      minSize: 120,
      maxSize: 180,
    },
    {
      accessorKey: 'balanceStatement',
      header: ({ column }) => (
        <DataGridColumnHeader title="Balance Statement" column={column} />
      ),
      cell: ({ row }) => (
        <StatusIndicator 
          status={row.original.balanceStatement.status} 
          label={row.original.balanceStatement.label} 
        />
      ),
      enableSorting: true,
      size: 180,
      minSize: 120,
      maxSize: 180,
    },
    {
      accessorKey: 'disbursement',
      header: ({ column }) => (
        <DataGridColumnHeader title="Disbursement" column={column} />
      ),
      cell: ({ row }) => (
        <StatusIndicator 
          status={row.original.disbursement.status} 
          label={row.original.disbursement.label} 
        />
      ),
      enableSorting: true,
      size: 180,
      minSize: 100,
      maxSize: 180,
    },
    {
      accessorKey: 'updatedDate',
      header: ({ column }) => (
        <DataGridColumnHeader title="Updated Date" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm">
          <div>{row.original.updatedDate.date}</div>
          <div className="text-muted-foreground">
            {row.original.updatedDate.time} ({row.original.updatedDate.timezone})
          </div>
        </div>
      ),
      enableSorting: true,
      size: 170,
      minSize: 170,
      maxSize: 250,
    },
    {
      accessorKey: 'updatedBy',
      header: ({ column }) => (
        <DataGridColumnHeader title="Updated by" column={column} />
      ),
      cell: ({ row }) => (
        <UserInfo user={row.original.updatedBy} />
      ),
      enableSorting: true,
      size: 250,
      minSize: 200,
      maxSize: 300,
    },
    {
      id: "actions",
      header: "",
      size: 80,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 rounded-xl border border-gray-300 text-gray-600 flex items-center justify-center"
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.(row.original);
          }}
        >
          <KeenIcon icon="notepad-edit" style="outline" className="text-lg" />
        </Button>
      ),
      enableSorting: false,
    },

  ];
}
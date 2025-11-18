'use client';

import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { ApprovalLogData } from './core/models';
import { DateCell, CreationIdCell, UserCell } from '../shared/cells';

export function useApprovalLogTableColumns(): ColumnDef<ApprovalLogData>[] {
  return useMemo<ColumnDef<ApprovalLogData>[]>(
    () => [
      {
        id: 'lastActivityDate',
        accessorKey: 'lastActivityDate',
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Activity Date" column={column} />
        ),
        cell: ({ row }) => (
          <DateCell 
            date={row.original.lastActivityDate}
            time={row.original.lastActivityTime}
          />
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => (
          <StatusCell status={row.original.status} />
        ),
        enableSorting: true,
        size: 170,
      },
      {
        id: 'creationType',
        accessorKey: 'creationType',
        header: ({ column }) => (
          <DataGridColumnHeader title="Creation Type" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground">
            {row.original.creationType}
          </span>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: 'creationId',
        accessorKey: 'creationId',
        header: ({ column }) => (
          <DataGridColumnHeader title="Creation ID" column={column} />
        ),
        cell: ({ row }) => (
          <CreationIdCell 
            creationId={row.original.creationId}
          />
        ),
        enableSorting: true,
        size: 250,
      },
      {
        id: 'totalTransaction',
        accessorKey: 'totalTransaction',
        header: ({ column }) => (
          <DataGridColumnHeader title="Total Transaction" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-medium text-center block">
            {row.original.totalTransaction}
          </span>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: 'totalTransferAmount',
        accessorKey: 'totalTransferAmount',
        header: ({ column }) => (
          <DataGridColumnHeader title="Total Transfer Amount" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground text-right block">
            {row.original.totalTransferAmount}
          </span>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'reason',
        accessorKey: 'reason',
        header: ({ column }) => (
          <DataGridColumnHeader title="Reason" column={column} />
        ),
        cell: ({ row }) => (
          <ReasonCell reason={row.original.reason} />
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'scheduledDate',
        accessorKey: 'scheduledDate',
        header: ({ column }) => (
          <DataGridColumnHeader title="Scheduled Date" column={column} />
        ),
        cell: ({ row }) => (
          <DateCell 
            date={row.original.scheduledDate}
            time={row.original.scheduledTime}
          />
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: 'createdBy',
        accessorKey: 'createdBy',
        header: ({ column }) => (
          <DataGridColumnHeader title="Created by" column={column} />
        ),
        cell: ({ row }) => (
          <UserCell user={row.original.createdBy} />
        ),
        enableSorting: true,
        size: 250,
      },
      {
        id: 'approvedDate',
        accessorKey: 'approvedDate',
        header: ({ column }) => (
          <DataGridColumnHeader title="Approved Date" column={column} />
        ),
        cell: ({ row }) => (
          <DateCell 
            date={row.original.approvedDate}
            time={row.original.approvedTime}
          />
        ),
        enableSorting: true,
        size: 170,
      },
      {
        id: 'reviewedBy',
        accessorKey: 'reviewedBy',
        header: ({ column }) => (
          <DataGridColumnHeader title="Reviewed by" column={column} />
        ),
        cell: ({ row }) => (
          <UserCell user={row.original.reviewedBy} />
        ),
        enableSorting: true,
        size: 300,
      },
    ],
    []
  );
}

// Status Cell - Approval Log specific
interface StatusCellProps {
  status: ApprovalLogData['status'];
}

function StatusCell({ status }: StatusCellProps) {
  const getStatusConfig = (status: ApprovalLogData['status']) => {
    switch (status) {
      case 'completed':
        return { variant: 'success' as const};
      case 'processing':
        return { variant: 'warning' as const, appearance: 'outline' as const };
      case 'approved':
        return { variant: 'info' as const, appearance: 'outline' as const };
      case 'scheduled':
        return { variant: 'info' as const, appearance: 'outline' as const };
      case 'partially-complete':
        return { variant: 'success' as const, appearance: 'outline' as const };
      case 'rejected':
        return { variant: 'destructive' as const, appearance: 'outline' as const };
      default:
        return { variant: 'secondary' as const, appearance: 'outline' as const };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} appearance={config.appearance} size="md" className="text-xs rounded-full">
      <BadgeDot />
      {status}
    </Badge>
  );
}

// Reason Cell - Approval Log specific
interface ReasonCellProps {
  reason?: string;
}

function ReasonCell({ reason }: ReasonCellProps) {
  return (
    <span className="text-sm text-foreground">
      {reason || '-'}
    </span>
  );
}

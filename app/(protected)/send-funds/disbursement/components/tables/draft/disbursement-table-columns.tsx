'use client';

import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DisbursementDraft } from './core/models';
import { DateCell, CreationIdCell, UserCell } from '../shared/cells';

export function useDisbursementTableColumns(): ColumnDef<DisbursementDraft>[] {
  return useMemo<ColumnDef<DisbursementDraft>[]>(
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
        size: 200,
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: ({ column }) => (
          <DataGridColumnHeader title="Inquiry Status" column={column} />
        ),
        cell: ({ row }) => (
          <StatusBadgeCell status={row.original.status} />
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: 'type',
        accessorKey: 'type',
        header: ({ column }) => (
          <DataGridColumnHeader title="Creation Type" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground">
            {row.original.type}
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
        size: 280,
      },
    ],
    []
  );
}

// Status Badge Cell - Draft specific
interface StatusBadgeCellProps {
  status: DisbursementDraft['status'];
}

function StatusBadgeCell({ status }: StatusBadgeCellProps) {
  const getStatusConfig = (status: DisbursementDraft['status']) => {
    switch (status) {
      case "draft":
        return { variant: "secondary" as const, appearance: "outline" as const };
      case "inquiry-process":
        return { variant: "warning" as const, appearance: "outline" as const };
      case "valid":
        return { variant: "success" as const, appearance: "outline" as const };
      case "issue":
        return { variant: "destructive" as const, appearance: "outline" as const };
      case "uploaded":
        return { variant: "info" as const, appearance: "outline" as const };
      default:
        return { variant: "secondary" as const, appearance: "outline" as const };
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


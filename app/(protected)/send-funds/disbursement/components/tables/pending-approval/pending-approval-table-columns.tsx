'use client';

import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { PendingApprovalData } from './core/models';
import { DateCell, CreationIdCell, UserCell } from '../shared/cells';

export function usePendingApprovalTableColumns(): ColumnDef<PendingApprovalData>[] {
  return useMemo<ColumnDef<PendingApprovalData>[]>(
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


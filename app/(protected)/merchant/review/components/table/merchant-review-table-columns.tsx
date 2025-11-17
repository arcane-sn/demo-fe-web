'use client';

import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { MerchantReviewData } from '../../core';
import { StatusBadge } from '../status-badge';

export function useMerchantReviewTableColumns(): ColumnDef<MerchantReviewData>[] {
  return useMemo<ColumnDef<MerchantReviewData>[]>(
    () => [
      {
        id: 'createdDate',
        accessorKey: 'createdDate',
        header: ({ column }) => (
          <DataGridColumnHeader title="Created Date" column={column} />
        ),
        cell: ({ row }) => (
          <DateCell dateInfo={row.original.createdDate} />
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'reviewStatus',
        accessorKey: 'reviewStatus',
        header: ({ column }) => (
          <DataGridColumnHeader title="Review Status" column={column} />
        ),
        cell: ({ row }) => {
          const status = row.original.reviewStatus;
          return <StatusBadge status={status} />;
        },
        enableSorting: true,
        size: 200,
      },
      {
        id: 'companyName',
        accessorKey: 'companyName',
        header: ({ column }) => (
          <DataGridColumnHeader title="Company Name" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.companyName}
          </span>
        ),
        enableSorting: true,
        size: 300,
      },
      {
        id: 'brandName',
        accessorKey: 'brandName',
        header: ({ column }) => (
          <DataGridColumnHeader title="Brand Name" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground">
            {row.original.brandName || '-'}
          </span>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: 'clientId',
        accessorKey: 'clientId',
        header: ({ column }) => (
          <DataGridColumnHeader title="Client ID" column={column} />
        ),
        cell: ({ row }) => (
          <ClientIdCell 
            clientId={row.original.clientId}
          />
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'merchantLevel',
        accessorKey: 'merchantLevel',
        header: ({ column }) => (
          <DataGridColumnHeader title="Merchant Level" column={column} />
        ),
        cell: ({ row }) => {
          const level = row.original.merchantLevel;
          return (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {level.label}
            </Badge>
          );
        },
        enableSorting: true,
        size: 150,
      },
      {
        id: 'paymentChannels',
        accessorKey: 'paymentChannels',
        header: ({ column }) => (
          <DataGridColumnHeader title="Payment Channels" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground">
            {row.original.paymentChannels || '-'}
          </span>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: 'createdBy',
        accessorKey: 'createdBy',
        header: ({ column }) => (
          <DataGridColumnHeader title="Created by" column={column} />
        ),
        cell: ({ row }) => (
          <CreatedByCell createdBy={row.original.createdBy} />
        ),
        enableSorting: true,
        size: 250,
      },
    ],
    []
  );
}

// Reusable cell components
interface DateCellProps {
  dateInfo: MerchantReviewData['createdDate'];
}

function DateCell({ dateInfo }: DateCellProps) {
  return (
    <div className="text-sm text-foreground">
      <div className="font-medium">{dateInfo.date}</div>
      <div className="text-muted-foreground">{dateInfo.time} ({dateInfo.timezone})</div>
    </div>
  );
}

interface ClientIdCellProps {
  clientId: string;
}

function ClientIdCell({ clientId }: ClientIdCellProps) {
  const { copyToClipboard } = useCopyToClipboard();
  return clientId ? (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-foreground">
        {clientId}
      </span>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0"
        onClick={() => {
          copyToClipboard(clientId);
          toast.success('Client ID copied to clipboard');
        }}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  ) : (
    <span className="text-muted-foreground">-</span>
  );
}

interface CreatedByCellProps {
  createdBy: MerchantReviewData['createdBy'];
}

function CreatedByCell({ createdBy }: CreatedByCellProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={createdBy.avatar} alt={createdBy.name} />
        <AvatarFallback className="text-xs">
          {createdBy.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {createdBy.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {createdBy.email}
        </span>
      </div>
    </div>
  );
}

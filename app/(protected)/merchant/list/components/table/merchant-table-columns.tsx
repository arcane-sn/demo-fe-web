'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { MerchantData } from '../../../types/merchant';

export function useMerchantTableColumns(): ColumnDef<MerchantData>[] {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only call useCopyToClipboard after mount to prevent state update before mount
  const copyToClipboardHook = useCopyToClipboard();
  const copyToClipboard = isMounted ? copyToClipboardHook.copyToClipboard : (text: string) => {
    // Fallback for SSR/pre-mount
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        toast.success('Client ID copied to clipboard');
      }).catch(console.error);
    }
  };

  // Ensure hook only runs after component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return useMemo<ColumnDef<MerchantData>[]>(
    () => [
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
            {row.original.brandName}
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
            onCopy={copyToClipboard}
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
        cell: ({ row }) => (
          <MerchantLevelCell merchantLevel={row.original.merchantLevel} />
        ),
        enableSorting: true,
        size: 250,
      },
      {
        id: 'subMerchants',
        accessorKey: 'subMerchants',
        header: ({ column }) => (
          <DataGridColumnHeader title="Sub-Merchants" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-medium">
            {row.original.subMerchants}
          </span>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: 'activePaymentChannels',
        accessorKey: 'activePaymentChannels',
        header: ({ column }) => (
          <DataGridColumnHeader title="Active Payment Channels" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-medium">
            {row.original.activePaymentChannels}
          </span>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: 'productionStatus',
        accessorKey: 'productionStatus',
        header: ({ column }) => (
          <DataGridColumnHeader title="Production Status" column={column} />
        ),
        cell: ({ row }) => (
          <StatusBadgeCell status={row.original.productionStatus} />
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: 'sandboxStatus',
        accessorKey: 'sandboxStatus',
        header: ({ column }) => (
          <DataGridColumnHeader title="Sandbox Status" column={column} />
        ),
        cell: ({ row }) => (
          <StatusBadgeCell status={row.original.sandboxStatus} />
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: 'registeredDate',
        accessorKey: 'registeredDate',
        header: ({ column }) => (
          <DataGridColumnHeader title="Registered Date" column={column} />
        ),
        cell: ({ row }) => (
          <DateCell dateInfo={row.original.registeredDate} />
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'updatedDate',
        accessorKey: 'updatedDate',
        header: ({ column }) => (
          <DataGridColumnHeader title="Updated Date" column={column} />
        ),
        cell: ({ row }) => (
          <DateCell dateInfo={row.original.updatedDate} />
        ),
        enableSorting: true,
        size: 200,
      },
    ],
    [copyToClipboard, isMounted]
  );
}

// Reusable cell components
interface ClientIdCellProps {
  clientId: string;
  onCopy: (text: string) => void;
}

function ClientIdCell({ clientId, onCopy }: ClientIdCellProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-foreground">
        {clientId}
      </span>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0"
        onClick={() => {
          onCopy(clientId);
          toast.success('Client ID copied to clipboard');
        }}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}

interface MerchantLevelCellProps {
  merchantLevel: MerchantData['merchantLevel'];
}

function MerchantLevelCell({ merchantLevel }: MerchantLevelCellProps) {
  return (
    <Badge
      variant="secondary"
      size="sm"
      className="bg-purple-100 text-purple-800 hover:bg-purple-200"
    >
      {merchantLevel.label}
    </Badge>
  );
}

interface StatusBadgeCellProps {
  status: MerchantData['productionStatus'] | MerchantData['sandboxStatus'];
}

function StatusBadgeCell({ status }: StatusBadgeCellProps) {
  return (
    <Badge
      variant={status.status === 'active' ? 'success' : 'destructive'}
      size="sm"
      appearance="light"
      shape="circle"
    >
      <BadgeDot className={status.status === 'active' ? 'success' : 'destructive'} />
      {status.label}
    </Badge>
  );
}

interface DateCellProps {
  dateInfo: MerchantData['registeredDate'] | MerchantData['updatedDate'];
}

function DateCell({ dateInfo }: DateCellProps) {
  return (
    <div className="text-sm">
      <div className="text-foreground font-medium">
        {dateInfo.date}
      </div>
      <div className="text-muted-foreground">
        {dateInfo.time} ({dateInfo.timezone})
      </div>
    </div>
  );
}

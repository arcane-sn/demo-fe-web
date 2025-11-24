'use client';

import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { StatusBadge as ReusableStatusBadge } from '@/components/reusable/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InitialsAvatar } from "@/components/reusable/InitialsAvatar";
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { KeenIcon } from '@/components/keenicons';
import { MerchantReviewData } from '../../core';
import { StatusBadge } from '../status-badge';

// Cell components for Merchant Adjustment
interface UpdatedDateCellProps {
  dateInfo: MerchantReviewData['updatedDate'] | MerchantReviewData['createdDate'];
}

function UpdatedDateCell({ dateInfo }: UpdatedDateCellProps) {
  if (!dateInfo) return <span className="text-muted-foreground">-</span>;
  
  return (
    <div className="text-sm text-foreground">
      <div className="font-medium">{dateInfo.date}</div>
      <div className="text-muted-foreground">{dateInfo.time} ({dateInfo.timezone})</div>
    </div>
  );
}

interface ActionsCellProps {
  actions: ('Create' | 'Update' | 'Delete')[];
}

function ActionsCell({ actions }: ActionsCellProps) {
  if (!actions || actions.length === 0) {
    return <span className="text-muted-foreground">-</span>;
  }
  
  
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {actions.map((action, index) => (
        <Badge
          key={index}
          variant="outline"
          className={`text-xs`}
        >
          {action}
        </Badge>
      ))}
    </div>
  );
}

interface UpdatedByCellProps {
  updatedBy: MerchantReviewData['updatedBy'] | MerchantReviewData['createdBy'];
}

function UpdatedByCell({ updatedBy }: UpdatedByCellProps) {
  if (!updatedBy) return <span className="text-muted-foreground">-</span>;
  
  return (
    <div className="flex items-center gap-3">
      <InitialsAvatar
        name={updatedBy.name}
        size="sm"
        className="border-blue-100 bg-blue-50"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {updatedBy.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {updatedBy.email}
        </span>
      </div>
    </div>
  );
}

export function useMerchantReviewTableColumns(activeTab: string = 'new-merchant'): ColumnDef<MerchantReviewData>[] {
  const isMerchantAdjustment = activeTab === 'merchant-adjustment';
  
  return useMemo(
    (): ColumnDef<MerchantReviewData>[] => {
      // Columns for Merchant Adjustment
      if (isMerchantAdjustment) {
        return [
          {
            id: 'updatedDate',
            accessorKey: 'updatedDate',
            header: ({ column }) => (
              <DataGridColumnHeader title="Updated Date" column={column} />
            ),
            cell: ({ row }) => (
              <UpdatedDateCell dateInfo={row.original.updatedDate || row.original.createdDate} />
            ),
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
            size: 250,
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
            id: 'actions',
            accessorKey: 'actions',
            header: ({ column }) => (
              <DataGridColumnHeader title="Action" column={column} />
            ),
            cell: ({ row }) => (
              <ActionsCell actions={row.original.actions || []} />
            ),
            enableSorting: false,
            size: 250,
          },
          {
            id: 'totalUpdatedSections',
            accessorKey: 'totalUpdatedSections',
            header: ({ column }) => (
              <DataGridColumnHeader title="Total Updated Sections" column={column} />
            ),
            cell: ({ row }) => (
              <span className="text-foreground">
                {row.original.totalUpdatedSections || 0} Sections
              </span>
            ),
            enableSorting: true,
            size: 190,
          },
          {
            id: 'updatedBy',
            accessorKey: 'updatedBy',
            header: ({ column }) => (
              <DataGridColumnHeader title="Updated by" column={column} />
            ),
            cell: ({ row }) => (
              <UpdatedByCell 
                updatedBy={row.original.updatedBy || row.original.createdBy} 
              />
            ),
            enableSorting: true,
            size: 250,
          },
        ];
      }
      
      // Columns for New Merchant (default)
      return [
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
              <ReusableStatusBadge variant="info" size="sm">
                {level.label}
              </ReusableStatusBadge>
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
      ];
    },
    [isMerchantAdjustment]
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
      <InitialsAvatar
        name={createdBy.name}
        size="sm"
        className="border-blue-100 bg-blue-50"
      />
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

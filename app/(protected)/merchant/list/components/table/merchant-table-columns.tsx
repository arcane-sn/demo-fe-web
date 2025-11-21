'use client';

import React, { Fragment, useMemo, useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { MerchantData } from '../../../types/merchant';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { KeenIcon } from '@/components/keenicons';
import { MERCHANT_LIST_ROW_ACTIONS, MerchantListRowActionKey } from '../../core/constants';

type MerchantActionHandlers = {
  onView?: (merchant: MerchantData) => void;
  onEdit?: (merchant: MerchantData) => void;
  onDeactivateProduction?: (merchant: MerchantData) => void;
  onDeactivateSandbox?: (merchant: MerchantData) => void;
  onDelete?: (merchant: MerchantData) => void;
};

export function useMerchantTableColumns(actionHandlers: MerchantActionHandlers = {}): ColumnDef<MerchantData>[] {
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
      {
        id: 'actions',
        header: '',
        size: 70,
        enableSorting: false,
        cell: ({ row }) => (
          <RowActionsMenu merchant={row.original} handlers={actionHandlers} />
        ),
      },
    ],
    [copyToClipboard, isMounted, actionHandlers]
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
      size="md"
      className="bg-purple-100 text-purple-800 border border-purple-600"
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
      size="md"
      appearance="outline"
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

interface RowActionsMenuProps {
  merchant: MerchantData;
  handlers: MerchantActionHandlers;
}

function RowActionsMenu({ merchant, handlers }: RowActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-10 h-10 rounded-xl border border-gray-300 text-gray-600 flex items-center justify-center"
          aria-label="Open actions menu"
          onClick={(event) => event.stopPropagation()}
        >
          <KeenIcon icon="dots-vertical" style="outline" className="text-lg" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className=" rounded-lg border border-gray-100 bg-white p-2 shadow-xl "
        onClick={(event) => event.stopPropagation()}
      >
        {MERCHANT_LIST_ROW_ACTIONS.map((item, index) => {
          const action = getActionHandler(item.actionKey, handlers);
          const nextItem = MERCHANT_LIST_ROW_ACTIONS[index + 1];
          const showSectionDivider =
            nextItem && nextItem.section !== item.section;

          const content = (
            <div className="flex w-full items-center justify-start gap-3 p-1">
              <KeenIcon
                icon={item.icon.name}
                style="outline"
                className={`text-lg ${item.icon.className}`}
              />
              <span className={`text-sm font-medium ${item.colorClass}`}>
                {item.label}
              </span>
            </div>
          );

          return (
            <Fragment key={item.id}>
              <DropdownMenuItem
                onClick={(event) => {
                  event.stopPropagation();
                  action?.(merchant);
                }}
              >
                {content}
              </DropdownMenuItem>
              {showSectionDivider && (
                <div className="mx-2  border-t border-gray-200" />
              )}
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getActionHandler(actionKey: MerchantListRowActionKey, handlers: MerchantActionHandlers) {
  switch (actionKey) {
    case 'view':
      return handlers.onView;
    case 'edit':
      return handlers.onEdit;
    case 'deactivateProduction':
      return handlers.onDeactivateProduction;
    case 'deactivateSandbox':
      return handlers.onDeactivateSandbox;
    case 'delete':
      return handlers.onDelete;
    default:
      return undefined;
  }
}

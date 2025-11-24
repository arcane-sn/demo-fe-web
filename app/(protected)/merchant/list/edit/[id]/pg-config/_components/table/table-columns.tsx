import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { KeenIcon } from '@/components/keenicons';
import { ChannelData } from '../../_lib/types';
import { ChannelLogo } from './channel-logo';
import { createTableColumns, TableColumnConfig } from '../../../_components/table';

interface TableColumnsOptions {
  showActions?: boolean;
  showEditAction?: boolean; // Control whether edit action is shown
  onEditChannel?: (channelId: string) => void;
  showDeleteAction?: boolean;
  onDeleteChannel?: (channelId: string) => void;
}

export function getTableColumns(options: TableColumnsOptions = {}): ColumnDef<ChannelData>[] {
  const { 
    showActions = true,
    showEditAction = true, // Default true for pg-config
    onEditChannel,
    showDeleteAction = true,
    onDeleteChannel
  } = options;

  const columns: TableColumnConfig<ChannelData>[] = [
    {
      accessorKey: 'name',
      header: 'Channel',
      cell: ({ row }) => <ChannelLogo channel={row.original} />,
      size: 200,
      minSize: 150,
      maxSize: 300,
    },
    {
      accessorKey: 'provider',
      header: 'Provider',
      size: 190,
      minSize: 80,
      maxSize: 190,
    },
    {
      accessorKey: 'mdr',
      header: 'MDR',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.mdr.percentagePrice} + {row.original.mdr.fixedPrice}
        </span>
      ),
      size: 190,
      minSize: 100,
      maxSize: 190,
    },
    {
      accessorKey: 'providerRate',
      header: 'Provider Rate',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.providerRate.percentagePrice} + {row.original.providerRate.fixedPrice}
        </span>
      ),
      size: 190,
      minSize: 110,
      maxSize: 190,
    },
    {
      accessorKey: 'merchantRate',
      header: 'Merchant Rate',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.merchantRate.percentagePrice} + {row.original.merchantRate.fixedPrice}
        </span>
      ),
      size: 190,
      minSize: 110,
      maxSize: 190,
    },
    {
      accessorKey: 'flypayRate',
      header: 'Flypay Rate (Excluded)',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.flypayRate.percentagePrice} + {row.original.flypayRate.fixedPrice}
        </span>
      ),
      size: 190,
      minSize: 130,
      maxSize: 190,
    },
    {
      accessorKey: 'resellerRate',
      header: 'Reseller Rate',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.resellerRate.percentagePrice} + {row.original.resellerRate.fixedPrice}
        </span>
      ),
      size: 190,
      minSize: 110,
      maxSize: 190,
    },
    {
      accessorKey: 'salesReferralId',
      header: 'Sales Referral ID',
      cell: ({ row }) => <span className="text-sm font-mono">{row.original.salesReferralId}</span>,
      size: 190,
      minSize: 130,
      maxSize: 190,
    },
    {
      accessorKey: 'salesReferralFee',
      header: 'Sales Referral Fee (excluded)',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.salesReferralFee.percentagePrice} + {row.original.salesReferralFee.fixedPrice}
        </span>
      ),
      size: 230,
      minSize: 160,
      maxSize: 250,
    },
    {
      accessorKey: 'merchantReferralId',
      header: 'Merchant Referral ID',
      cell: ({ row }) => <span className="text-sm font-mono">{row.original.merchantReferralId}</span>,
      size: 170,
      minSize: 130,
      maxSize: 180,
    },
    {
      accessorKey: 'merchantReferralFee',
      header: 'Merchant Referral Fee (excluded)',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.merchantReferralFee.percentagePrice} + {row.original.merchantReferralFee.fixedPrice}
        </span>
      ),
      size: 250,
      minSize: 160,
      maxSize: 250,
    },
  ];

  // Create base columns
  const baseColumns = createTableColumns(columns);

  // Add action columns separately if showActions is true
  if (showActions) {
    // Edit column - only show if showEditAction is true
    if (onEditChannel && showEditAction) {
      baseColumns.push({
        id: 'edit-action',
        header: () => <div></div>, // Empty header
        cell: ({ row }) => (
          <div className="flex justify-center border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditChannel(row.original.id)}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <KeenIcon icon="notepad-edit" style="outline" className="" />
            </Button>
          </div>
        ),
        size: 60,
        minSize: 50,
        maxSize: 70,
        enableSorting: false,
        enableColumnFilter: false,
      });
    }

    // Delete column (separate from edit)
    if (onDeleteChannel && showDeleteAction) {
      baseColumns.push({
        id: 'delete-action',
        header: () => <div></div>, // Empty header
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteChannel(row.original.id)}
              className="p-2 text-destructive hover:text-destructive border border-red-300 rounded-md hover:bg-red-50"
            >
              <KeenIcon icon="trash" style="outline" className="" />
            </Button>
          </div>
        ),
        size: 60,
        minSize: 50,
        maxSize: 70,
        enableSorting: false,
        enableColumnFilter: false,
      });
    }
  }

  return baseColumns;
}
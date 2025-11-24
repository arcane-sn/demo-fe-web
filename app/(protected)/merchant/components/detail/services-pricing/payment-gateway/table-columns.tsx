'use client';

import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ChannelData } from '@/app/(protected)/merchant/list/edit/[id]/pg-config/_lib/types';
import { createTableColumns, TableColumnConfig } from '@/app/(protected)/merchant/list/edit/[id]/_components/table/table-columns-factory';
import { ChannelLogo } from '@/app/(protected)/merchant/list/edit/[id]/pg-config/_components/table/channel-logo';

export function usePaymentGatewayTableColumns(): ColumnDef<ChannelData>[] {
  return useMemo<ColumnDef<ChannelData>[]>(() => {
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
        size: 100,
        minSize: 80,
        maxSize: 150,
      },
      {
        accessorKey: 'mdr',
        header: 'MDR',
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.mdr.percentagePrice} + {row.original.mdr.fixedPrice}
          </span>
        ),
        size: 120,
        minSize: 100,
        maxSize: 150,
      },
      {
        accessorKey: 'providerRate',
        header: 'Provider Rate',
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.providerRate.percentagePrice} + {row.original.providerRate.fixedPrice}
          </span>
        ),
        size: 130,
        minSize: 110,
        maxSize: 160,
      },
      {
        accessorKey: 'merchantRate',
        header: 'Merchant Rate',
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.merchantRate.percentagePrice} + {row.original.merchantRate.fixedPrice}
          </span>
        ),
        size: 130,
        minSize: 110,
        maxSize: 160,
      },
      {
        accessorKey: 'flypayRate',
        header: 'Flypay Rate (Excluded)',
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.flypayRate.percentagePrice} + {row.original.flypayRate.fixedPrice}
          </span>
        ),
        size: 150,
        minSize: 130,
        maxSize: 180,
      },
      {
        accessorKey: 'resellerRate',
        header: 'Reseller Rate',
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.resellerRate.percentagePrice} + {row.original.resellerRate.fixedPrice}
          </span>
        ),
        size: 130,
        minSize: 110,
        maxSize: 160,
      },
      {
        accessorKey: 'salesReferralId',
        header: 'Sales Referral ID',
        cell: ({ row }) => <span className="text-sm font-mono">{row.original.salesReferralId}</span>,
        size: 150,
        minSize: 130,
        maxSize: 180,
      },
      {
        accessorKey: 'salesReferralFee',
        header: 'Sales Referral Fee (excluded)',
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.salesReferralFee.percentagePrice} + {row.original.salesReferralFee.fixedPrice}
          </span>
        ),
        size: 180,
        minSize: 160,
        maxSize: 200,
      },
      {
        accessorKey: 'merchantReferralId',
        header: 'Merchant Referral ID',
        cell: ({ row }) => <span className="text-sm font-mono">{row.original.merchantReferralId}</span>,
        size: 150,
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
        size: 180,
        minSize: 160,
        maxSize: 200,
      },
    ];

    return createTableColumns(columns);
  }, []);
}


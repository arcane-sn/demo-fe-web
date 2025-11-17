'use client';

import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChannelData } from '../../../types/channel';

export function useChannelTableColumns(): ColumnDef<ChannelData>[] {
  return useMemo<ColumnDef<ChannelData>[]>(
    () => [
      {
        id: 'parentId',
        accessorKey: 'parentId',
        header: ({ column }) => (
          <DataGridColumnHeader title="Parent ID" column={column} />
        ),
        cell: ({ row }) => (
          <ParentIdCell 
            parentId={row.original.parentId}
          />
        ),
        enableSorting: true,
        size: 250,
      },
      {
        id: 'merchantName',
        accessorKey: 'merchantName',
        header: ({ column }) => (
          <DataGridColumnHeader title="Merchant Name" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.merchantName}
          </span>
        ),
        enableSorting: true,
        size: 200,
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
        size: 250,
      },
      {
        id: 'paymentMethod',
        accessorKey: 'paymentMethod',
        header: ({ column }) => (
          <DataGridColumnHeader title="Payment Method" column={column} />
        ),
        cell: ({ row }) => (
          <PaymentMethodCell paymentMethod={row.original.paymentMethod} />
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: 'channel',
        accessorKey: 'channel',
        header: ({ column }) => (
          <DataGridColumnHeader title="Channel" column={column} />
        ),
        cell: ({ row }) => (
          <ChannelCell channel={row.original.channel} />
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'provider',
        accessorKey: 'provider',
        header: ({ column }) => (
          <DataGridColumnHeader title="Provider" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-medium">
            {row.original.provider}
          </span>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: 'nmid',
        accessorKey: 'nmid',
        header: ({ column }) => (
          <DataGridColumnHeader title="NMID" column={column} />
        ),
        cell: ({ row }) => (
          <NmidCell 
            nmid={row.original.nmid}
          />
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: 'mdr',
        accessorKey: 'mdr',
        header: ({ column }) => (
          <DataGridColumnHeader title="MDR" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.mdr}
          </span>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: 'providerRate',
        accessorKey: 'providerRate',
        header: ({ column }) => (
          <DataGridColumnHeader title="Provider Rate" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.providerRate}
          </span>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: 'merchantRate',
        accessorKey: 'merchantRate',
        header: ({ column }) => (
          <DataGridColumnHeader title="Merchant Rate" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.merchantRate}
          </span>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'flypayRate',
        accessorKey: 'flypayRate',
        header: ({ column }) => (
          <DataGridColumnHeader title="Flypay Rate (Excluded)" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.flypayRate}
          </span>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'resellerRate',
        accessorKey: 'resellerRate',
        header: ({ column }) => (
          <DataGridColumnHeader title="Reseller Rate" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.resellerRate}
          </span>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'salesReferralId',
        accessorKey: 'salesReferralId',
        header: ({ column }) => (
          <DataGridColumnHeader title="Sales Referral ID" column={column} />
        ),
        cell: ({ row }) => (
          <SalesReferralIdCell 
            salesReferralId={row.original.salesReferralId}
          />
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'salesReferralFee',
        accessorKey: 'salesReferralFee',
        header: ({ column }) => (
          <DataGridColumnHeader title="Sales Referral Fee (Excluded)" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.salesReferralFee}
          </span>
        ),
        enableSorting: true,
        size: 230,
      },
      {
        id: 'merchantReferralId',
        accessorKey: 'merchantReferralId',
        header: ({ column }) => (
          <DataGridColumnHeader title="Merchant Referral ID" column={column} />
        ),
        cell: ({ row }) => (
          <MerchantReferralIdCell 
            merchantReferralId={row.original.merchantReferralId}
          />
        ),
        enableSorting: true,
        size: 230,
      },
      {
        id: 'merchantReferralFee',
        accessorKey: 'merchantReferralFee',
        header: ({ column }) => (
          <DataGridColumnHeader title="Merchant Referral Fee (Excluded)" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.merchantReferralFee}
          </span>
        ),
        enableSorting: true,
        size: 250,
      },
      {
        id: 'settlementDay',
        accessorKey: 'settlementDay',
        header: ({ column }) => (
          <DataGridColumnHeader title="Settlement Day" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.original.settlementDay}
          </span>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        id: 'sameDaySettlement',
        accessorKey: 'sameDaySettlement',
        header: ({ column }) => (
          <DataGridColumnHeader title="Same Day Settlement" column={column} />
        ),
        cell: ({ row }) => (
          <SameDaySettlementCell sameDaySettlement={row.original.sameDaySettlement} />
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'registeredDate',
        accessorKey: 'registeredDate',
        header: ({ column }) => (
          <DataGridColumnHeader title="Registered Date" column={column} />
        ),
        cell: ({ row }) => (
          <RegisteredDateCell registeredDate={row.original.registeredDate} />
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'registeredBy',
        accessorKey: 'registeredBy',
        header: ({ column }) => (
          <DataGridColumnHeader title="Registered by" column={column} />
        ),
        cell: ({ row }) => (
          <RegisteredByCell registeredBy={row.original.registeredBy} />
        ),
        enableSorting: true,
        size: 250,
      },
      {
        id: 'updatedAt',
        accessorKey: 'updatedAt',
        header: ({ column }) => (
          <DataGridColumnHeader title="Updated Date" column={column} />
        ),
        cell: ({ row }) => (
          <UpdatedDateCell updatedAt={row.original.updatedAt} />
        ),
        enableSorting: true,
        size: 200,
      },
      {
        id: 'updatedBy',
        accessorKey: 'updatedBy',
        header: ({ column }) => (
          <DataGridColumnHeader title="Updated by" column={column} />
        ),
        cell: ({ row }) => (
          <UpdatedByCell updatedBy={row.original.updatedBy} />
        ),
        enableSorting: true,
        size: 250,
      },
    ],
    []
  );
}

// Reusable cell components
interface ParentIdCellProps {
  parentId: string;
}

function ParentIdCell({ parentId }: ParentIdCellProps) {
  const { copyToClipboard } = useCopyToClipboard();
  const truncatedId = parentId.length > 15 ? `${parentId.substring(0, 15)}...` : parentId;
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-foreground">
        {truncatedId}
      </span>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0"
        onClick={() => {
          copyToClipboard(parentId);
          toast.success('Parent ID copied to clipboard');
        }}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}

interface ClientIdCellProps {
  clientId: string;
}

function ClientIdCell({ clientId }: ClientIdCellProps) {
  const { copyToClipboard } = useCopyToClipboard();
  const truncatedId = clientId.length > 15 ? `${clientId.substring(0, 15)}...` : clientId;
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-foreground">
        {truncatedId}
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
  );
}

interface PaymentMethodCellProps {
  paymentMethod: ChannelData['paymentMethod'];
}

function PaymentMethodCell({ paymentMethod }: PaymentMethodCellProps) {
  return (
    <span className="text-foreground font-medium">
      {paymentMethod.label}
    </span>
  );
}

interface ChannelCellProps {
  channel: ChannelData['channel'];
}

function ChannelCell({ channel }: ChannelCellProps) {
  return (
    <span className="text-foreground font-medium">
      {channel.name}
    </span>
  );
}

interface NmidCellProps {
  nmid: string;
}

function NmidCell({ nmid }: NmidCellProps) {
  const { copyToClipboard } = useCopyToClipboard();
  const truncatedNmid = nmid.length > 8 ? `${nmid.substring(0, 8)}` : nmid;
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-foreground">
        {truncatedNmid}
      </span>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0"
        onClick={() => {
          copyToClipboard(nmid);
          toast.success('NMID copied to clipboard');
        }}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}

interface SalesReferralIdCellProps {
  salesReferralId: string;
}

function SalesReferralIdCell({ salesReferralId }: SalesReferralIdCellProps) {
  const { copyToClipboard } = useCopyToClipboard();
  const truncatedId = salesReferralId.length > 15 ? `${salesReferralId.substring(0, 15)}...` : salesReferralId;
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-foreground">
        {truncatedId}
      </span>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0"
        onClick={() => {
          copyToClipboard(salesReferralId);
          toast.success('Sales Referral ID copied to clipboard');
        }}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}

interface MerchantReferralIdCellProps {
  merchantReferralId: string;
}

function MerchantReferralIdCell({ merchantReferralId }: MerchantReferralIdCellProps) {
  const { copyToClipboard } = useCopyToClipboard();
  const truncatedId = merchantReferralId.length > 15 ? `${merchantReferralId.substring(0, 15)}...` : merchantReferralId;
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-foreground">
        {truncatedId}
      </span>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0"
        onClick={() => {
          copyToClipboard(merchantReferralId);
          toast.success('Merchant Referral ID copied to clipboard');
        }}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}

interface SameDaySettlementCellProps {
  sameDaySettlement: boolean;
}

function SameDaySettlementCell({ sameDaySettlement }: SameDaySettlementCellProps) {
  return (
    <Badge
      variant={sameDaySettlement ? 'success' : 'secondary'}
      appearance="outline"
      shape="circle"
      size="sm"
    >
      <BadgeDot />
      {sameDaySettlement ? 'Active' : 'Inactive'}
    </Badge>
  );
}

interface RegisteredDateCellProps {
  registeredDate: ChannelData['registeredDate'];
}

function RegisteredDateCell({ registeredDate }: RegisteredDateCellProps) {
  return (
    <div className="text-sm">
      <div className="text-foreground font-medium">
        {registeredDate.date}
      </div>
      <div className="text-muted-foreground">
        {registeredDate.time} ({registeredDate.timezone})
      </div>
    </div>
  );
}

interface RegisteredByCellProps {
  registeredBy: ChannelData['registeredBy'];
}

function RegisteredByCell({ registeredBy }: RegisteredByCellProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={registeredBy.avatar} alt={registeredBy.name} />
        <AvatarFallback>{registeredBy.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium text-sm">{registeredBy.name}</span>
        <span className="text-xs text-muted-foreground">
          {registeredBy.email}
        </span>
      </div>
    </div>
  );
}

interface UpdatedDateCellProps {
  updatedAt: ChannelData['updatedAt'];
}

function UpdatedDateCell({ updatedAt }: UpdatedDateCellProps) {
  return (
    <div className="text-sm">
      <div className="text-foreground font-medium">
        {updatedAt.date}
      </div>
      <div className="text-muted-foreground">
        {updatedAt.time} ({updatedAt.timezone})
      </div>
    </div>
  );
}

interface UpdatedByCellProps {
  updatedBy: ChannelData['updatedBy'];
}

function UpdatedByCell({ updatedBy }: UpdatedByCellProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={updatedBy.avatar} alt={updatedBy.name} />
        <AvatarFallback>{updatedBy.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium text-sm">{updatedBy.name}</span>
        <span className="text-xs text-muted-foreground">
          {updatedBy.email}
        </span>
      </div>
    </div>
  );
}

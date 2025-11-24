'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { ReusableTable } from '@/components/table';
import { ColumnDef } from '@tanstack/react-table';
import { Channel, ChannelType, getChannelsByType } from '../../../components/modals/chanels';
import { ChannelSelectionModal } from '@/app/(protected)/merchant/list/edit/[id]/pg-config/_components/modal/channels/channel-selection-modal';
import type { ChannelData } from '@/app/(protected)/merchant/list/edit/[id]/pg-config/_lib/types';

// Helper function to convert Channel to ChannelData format
let referralIdCounter = 1;
const generateReferralIds = (channelId: string) => {
  const counter = referralIdCounter++;
  const salesReferralId = `SR110101${counter.toString().padStart(3, '0')}`;
  const merchantReferralId = `MR122221${counter.toString().padStart(3, '0')}`;
  return { salesReferralId, merchantReferralId };
};

const convertChannelToChannelData = (channel: Channel): ChannelData => {
  const mdrPercentage = channel.setupFeeRate.split('+')[0].trim();
  const fixedPrice = channel.setupFeeRate.includes('+') 
    ? channel.setupFeeRate.split('+')[1].trim() 
    : 'IDR 0';

  const { salesReferralId, merchantReferralId } = generateReferralIds(channel.id);

  const mdrValue = parseFloat(mdrPercentage.replace('%', '')) || 0;
  const providerRateValue = (mdrValue * 0.5).toFixed(2) + '%';
  const merchantRateValue = (mdrValue * 0.2).toFixed(2) + '%';
  const flypayRateValue = (mdrValue * 0.1).toFixed(2) + '%';
  const resellerRateValue = (mdrValue * 0.3).toFixed(2) + '%';

  return {
    id: channel.id,
    name: channel.name,
    logo: channel.logo || null,
    logoColor: channel.logoColor,
    provider: channel.provider,
    mdr: {
      percentagePrice: mdrPercentage,
      fixedPrice: fixedPrice
    },
    providerRate: {
      percentagePrice: providerRateValue,
      fixedPrice: 'IDR 0',
      showToMerchant: true
    },
    merchantRate: {
      percentagePrice: merchantRateValue,
      fixedPrice: 'IDR 0',
      showToMerchant: true
    },
    flypayRate: {
      percentagePrice: flypayRateValue,
      fixedPrice: 'IDR 0',
      showToMerchant: true
    },
    resellerRate: {
      percentagePrice: resellerRateValue,
      fixedPrice: 'IDR 0',
      showToMerchant: true
    },
    salesReferralId,
    salesReferralFee: {
      percentagePrice: '0%',
      fixedPrice: 'IDR 500'
    },
    merchantReferralId,
    merchantReferralFee: {
      percentagePrice: '1.5%',
      fixedPrice: 'IDR 0'
    }
  };
};

// Channel Logo Component
const ChannelLogo = ({ channel }: { channel: ChannelData }) => (
  <div className="flex items-center gap-3">
    {channel.logo ? (
      <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden bg-white border">
        {channel.logo.startsWith('/media/') ? (
          <img 
            src={channel.logo} 
            alt={channel.name}
            className="w-6 h-6 object-contain"
          />
        ) : (
          <div className={`w-full h-full ${channel.logoColor} rounded flex items-center justify-center text-white text-xs font-bold`}>
            {channel.logo}
          </div>
        )}
      </div>
    ) : null}
    <span className="font-medium text-sm">{channel.name}</span>
  </div>
);

interface PaymentMethodTableSectionProps {
  title: string;
  icon: React.ReactNode;
  channelType: ChannelType;
  addedChannelIds: string[];
  onChannelsSelected: (selectedChannelIds: string[]) => void;
  onRemoveChannel: (channelId: string) => void;
  addButtonText?: string;
}

export function PaymentMethodTableSection({
  title,
  icon,
  channelType,
  addedChannelIds,
  onChannelsSelected,
  onRemoveChannel,
  addButtonText = 'Add Channel'
}: PaymentMethodTableSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Convert available channels to ChannelData
  const availableChannels = useMemo(() => {
    return getChannelsByType(channelType).map(convertChannelToChannelData);
  }, [channelType]);

  // Get added channels as ChannelData
  const addedChannels = useMemo(() => {
    return availableChannels.filter(channel => addedChannelIds.includes(channel.id));
  }, [availableChannels, addedChannelIds]);

  const handleAddChannel = () => {
    setIsModalOpen(true);
  };

  const handleChannelsSelected = (selectedChannels: ChannelData[]) => {
    const selectedIds = selectedChannels.map(ch => ch.id);
    onChannelsSelected(selectedIds);
    setIsModalOpen(false);
  };

  const handleRemoveChannel = useCallback((channelId: string) => {
    onRemoveChannel(channelId);
  }, [onRemoveChannel]);

  // Create table columns
  const createTableColumns = useCallback((): ColumnDef<ChannelData>[] => {
    return [
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
        maxSize: 200,
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
        id: 'remove-action',
        header: () => <div></div>,
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveChannel(row.original.id)}
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
      },
    ];
  }, [handleRemoveChannel]);

  const tableColumns = useMemo(() => {
    if (!isMounted) {
      return [];
    }
    return createTableColumns();
  }, [createTableColumns, isMounted]);

  return (
    <div className="space-y-4">
      <ReusableTable
        config={{
          data: addedChannels || [],
          columns: tableColumns,
          enableSorting: true,
          enablePagination: true,
          enableRowSelection: false,
        }}
        headerConfig={{
          customHeader: (
            <div className="flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <HexagonBadge
                  stroke="stroke-gray-300 dark:stroke-gray-600"
                  fill="fill-transparent"
                  size="size-[50px]"
                  badge={icon}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600">Fee Rate Exclude VAT</p>
                </div>
              </div>
              <Button 
                type="button"
                variant="outline" 
                size="sm" 
                onClick={handleAddChannel}
                className="flex items-center gap-2"
              >
                <KeenIcon icon="plus" style="outline" className="w-4 h-4" />
                {addButtonText}
              </Button>
            </div>
          ),
        }}
        footerConfig={{
          showPagination: true,
          showRowCount: true,
          showSelectedCount: false,
        }}
      />

      {/* Channel Selection Modal */}
      {availableChannels.length > 0 && (
        <ChannelSelectionModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          channels={availableChannels}
          selectedChannels={addedChannels}
          onSave={handleChannelsSelected}
          title={`Select ${title} Channels`}
        />
      )}
    </div>
  );
}


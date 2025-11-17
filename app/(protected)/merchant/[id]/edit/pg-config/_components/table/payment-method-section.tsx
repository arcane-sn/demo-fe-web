import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { ReusableTable } from '@/components/table';
import { PaymentMethodSectionProps, ChannelData } from '../../_lib/types';
import { getTableColumns } from './table-columns';
import { ChannelSelectionModal } from '../modal/channels/channel-selection-modal';
import { EditChannelModal } from '../modal/edit/edit-channel-modal';
import { DeleteChannelModal } from '../modal/delete/delete-channel-modal';
import { ChannelEditState } from '../modal/edit/types';
import { usePGConfig } from '../../_hooks';

const transformChannelDataToEditState = (channelData: ChannelData): ChannelEditState => {
  return {
    channelName: channelData.name,
    channelLogo: channelData.logo || '',
    channelDetail: {
      category: 'Payment Gateway',
      channel: channelData.name,
      channelMode: 'Production',
      channelBillDescriptor: channelData.name,
      minimumAmount: '1000',
      maximumAmount: '10000000',
      channelCurrency: 'IDR',
      settlementDays: '1',
    },
    mdr: {
      mdr: {
        percentagePrice: channelData.mdr.percentagePrice,
        fixedPrice: channelData.mdr.fixedPrice,
      },
      providerRate: {
        percentagePrice: channelData.providerRate.percentagePrice,
        fixedPrice: channelData.providerRate.fixedPrice,
        showToMerchant: channelData.providerRate.showToMerchant,
      },
      merchantRate: {
        percentagePrice: channelData.merchantRate.percentagePrice,
        fixedPrice: channelData.merchantRate.fixedPrice,
        showToMerchant: channelData.merchantRate.showToMerchant,
      },
      flypayRate: {
        percentagePrice: channelData.flypayRate.percentagePrice,
        fixedPrice: channelData.flypayRate.fixedPrice,
        showToMerchant: channelData.flypayRate.showToMerchant,
      },
      resellerRate: {
        percentagePrice: channelData.resellerRate.percentagePrice,
        fixedPrice: channelData.resellerRate.fixedPrice,
        showToMerchant: channelData.resellerRate.showToMerchant,
      },
    },
    paymentOption: {
      openAmount: true,
      fixedAmount: false,
      recurring: false,
    },
    provider: {
      provider01: channelData.provider,
    },
    salesReferral: {
      salesId: channelData.salesReferralId,
      salesFee: {
        percentagePrice: channelData.salesReferralFee.percentagePrice,
        fixedPrice: channelData.salesReferralFee.fixedPrice,
      },
    },
    merchantReferral: {
      merchantId: channelData.merchantReferralId,
      merchantFee: {
        percentagePrice: channelData.merchantReferralFee.percentagePrice,
        fixedPrice: channelData.merchantReferralFee.fixedPrice,
      },
    },
  };
};

export function PaymentMethodSection({
  title,
  icon,
  channels,
  onAddChannel,
  addButtonText = 'Add Channel',
  availableChannels = [],
  onChannelsSelected,
  onEditChannel,
  onDeleteChannel
}: PaymentMethodSectionProps) {
  // Use hook for state management
  const {
    isModalOpen,
    isEditModalOpen,
    selectedChannelForEdit,
    handleEditSave,
    handleEditReset,
    openModal,
    closeModal,
    openEditModal,
    closeEditModal,
    setSelectedChannelForEdit
  } = usePGConfig();

  // Local state for delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState<ChannelData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before creating columns
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddChannel = () => {
    if (availableChannels?.length > 0 && onChannelsSelected) {
      openModal();
    } else {
      onAddChannel();
    }
  };

  const handleChannelsSelected = (selectedChannels: ChannelData[]) => {
    if (onChannelsSelected) {
      onChannelsSelected(selectedChannels);
    }
    closeModal();
  };

  const handleEditChannel = useCallback((channelId: string) => {
    const channelToEdit = channels.find(channel => channel.id === channelId);
    if (channelToEdit) {
      setSelectedChannelForEdit(channelToEdit);
      openEditModal();
    }
  }, [channels, setSelectedChannelForEdit, openEditModal]);

  const handleDeleteChannel = useCallback((channelId: string) => {
    const channel = channels.find(channel => channel.id === channelId);
    if (channel) {
      setChannelToDelete(channel);
      setIsDeleteModalOpen(true);
    }
  }, [channels]);

  const handleConfirmDelete = () => {
    if (channelToDelete && onDeleteChannel) {
      onDeleteChannel(channelToDelete);
    }
    setChannelToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setChannelToDelete(null);
    setIsDeleteModalOpen(false);
  };

  // Create columns without side effects
  const createTableColumns = useCallback(() => {
    return getTableColumns({
      onEditChannel: handleEditChannel,
      onDeleteChannel: handleDeleteChannel,
      showActions: true,
      showDeleteAction: true,
    });
  }, [handleEditChannel, handleDeleteChannel]);

  // Memoize columns to prevent side-effects in render
  // Only create columns after component is mounted
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
          data: channels || [],
          columns: tableColumns,
          enableSorting: true,
          enablePagination: false,
          enableRowSelection: false,
        }}
        headerConfig={{
          customHeader: (
            <div className="flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <HexagonBadge
                  stroke="stroke-gray-300 dark:stroke-gray-600"
                  fill="fill-gray-100 dark:fill-gray-800"
                  size="size-[40px]"
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
                <Plus size={16} />
                {addButtonText}
              </Button>
            </div>
          ),
        }}
      />

      {/* Channel Selection Modal */}
      {availableChannels?.length > 0 && onChannelsSelected && (
        <ChannelSelectionModal
          open={isModalOpen}
          onOpenChange={(open) => open ? openModal() : closeModal()}
          channels={availableChannels}
          selectedChannels={channels}
          onSave={handleChannelsSelected}
          title={`Select ${title} Channels`}
        />
      )}

      {/* Edit Channel Modal */}
      {selectedChannelForEdit && (
        <EditChannelModal
          open={isEditModalOpen}
          onOpenChange={(open) => open ? openEditModal() : closeEditModal()}
          channelData={transformChannelDataToEditState(selectedChannelForEdit)}
          onSave={handleEditSave}
          onReset={handleEditReset}
        />
      )}

      {/* Delete Channel Modal */}
      <DeleteChannelModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        channelName={channelToDelete?.name || ''}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

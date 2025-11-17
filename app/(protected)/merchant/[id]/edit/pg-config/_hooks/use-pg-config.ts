import { useState, useCallback } from 'react';
import { ChannelData } from '../_lib/types';
import { MOCK_CHANNELS } from '../_lib/constants';

export function usePGConfig() {
  const [channels, setChannels] = useState<Record<string, ChannelData[]>>(MOCK_CHANNELS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedChannelForEdit, setSelectedChannelForEdit] = useState<ChannelData | null>(null);

  const handleAddChannel = useCallback((type: string) => {
    // Add channel logic will be handled by component
    // This hook provides the interface for add channel functionality
  }, []);

  const handleEditChannel = useCallback((type: string, channelId: string) => {
    const channelToEdit = channels[type]?.find(channel => channel.id === channelId);
    if (channelToEdit) {
      setSelectedChannelForEdit(channelToEdit);
      setIsEditModalOpen(true);
    }
  }, [channels]);

  const handleDeleteChannel = useCallback((type: string, channelId: string) => {
    setChannels(prev => ({
      ...prev,
      [type]: prev[type].filter(channel => channel.id !== channelId)
    }));
  }, []);

  const handleChannelsSelected = useCallback((type: string, selectedChannels: ChannelData[]) => {
    setChannels(prev => ({
      ...prev,
      [type]: selectedChannels
    }));
  }, []);

  const handleEditSave = useCallback((editedChannelData: any) => {
    if (!selectedChannelForEdit) return;

    // Find the channel type and update the channel data
    const channelType = Object.keys(channels).find(type => 
      channels[type].some(channel => channel.id === selectedChannelForEdit.id)
    );

    if (channelType) {
      setChannels(prev => ({
        ...prev,
        [channelType]: prev[channelType].map(channel => 
          channel.id === selectedChannelForEdit.id 
            ? {
                ...channel,
                name: editedChannelData.channelName,
                logo: editedChannelData.channelLogo,
                provider: editedChannelData.provider.provider01,
                mdr: {
                  percentagePrice: editedChannelData.mdr.mdr.percentagePrice,
                  fixedPrice: editedChannelData.mdr.mdr.fixedPrice,
                },
                providerRate: {
                  percentagePrice: editedChannelData.mdr.providerRate.percentagePrice,
                  fixedPrice: editedChannelData.mdr.providerRate.fixedPrice,
                  showToMerchant: editedChannelData.mdr.providerRate.showToMerchant,
                },
                merchantRate: {
                  percentagePrice: editedChannelData.mdr.merchantRate.percentagePrice,
                  fixedPrice: editedChannelData.mdr.merchantRate.fixedPrice,
                  showToMerchant: editedChannelData.mdr.merchantRate.showToMerchant,
                },
                flypayRate: {
                  percentagePrice: editedChannelData.mdr.flypayRate.percentagePrice,
                  fixedPrice: editedChannelData.mdr.flypayRate.fixedPrice,
                  showToMerchant: editedChannelData.mdr.flypayRate.showToMerchant,
                },
                resellerRate: {
                  percentagePrice: editedChannelData.mdr.resellerRate.percentagePrice,
                  fixedPrice: editedChannelData.mdr.resellerRate.fixedPrice,
                  showToMerchant: editedChannelData.mdr.resellerRate.showToMerchant,
                },
                salesReferralId: editedChannelData.salesReferral.salesId,
                salesReferralFee: {
                  percentagePrice: editedChannelData.salesReferral.salesFee.percentagePrice,
                  fixedPrice: editedChannelData.salesReferral.salesFee.fixedPrice,
                },
                merchantReferralId: editedChannelData.merchantReferral.merchantId,
                merchantReferralFee: {
                  percentagePrice: editedChannelData.merchantReferral.merchantFee.percentagePrice,
                  fixedPrice: editedChannelData.merchantReferral.merchantFee.fixedPrice,
                },
              }
            : channel
        )
      }));
    }

    setIsEditModalOpen(false);
    setSelectedChannelForEdit(null);
  }, [selectedChannelForEdit, channels]);

  const handleEditReset = useCallback(() => {
    setSelectedChannelForEdit(null);
    setIsEditModalOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const openEditModal = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  return {
    // State
    channels,
    isModalOpen,
    isEditModalOpen,
    selectedChannelForEdit,
    
    // Actions
    handleAddChannel,
    handleEditChannel,
    handleDeleteChannel,
    handleChannelsSelected,
    handleEditSave,
    handleEditReset,
    openModal,
    closeModal,
    openEditModal,
    closeEditModal,
    
    // Setters (for component use)
    setChannels,
    setIsModalOpen,
    setIsEditModalOpen,
    setSelectedChannelForEdit,
  };
}

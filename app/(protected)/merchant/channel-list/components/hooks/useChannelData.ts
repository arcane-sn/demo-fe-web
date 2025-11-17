import { useState, useMemo } from 'react';
import { ChannelData } from '../../../types/channel';
import { mockChannelData } from '../../data/mock-channel-data';
import { ChannelFilterState } from '../filter/types';

export function useChannelData(filterValues?: ChannelFilterState | null) {
  const [allChannels, setAllChannels] = useState<ChannelData[]>(mockChannelData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter channels based on filter values
  const channels = useMemo(() => {
    if (!filterValues) {
      return allChannels;
    }

    const filteredChannels = allChannels.filter(channel => {
      // Date filter
      if (filterValues.dateFilter.dateRange) {
        const channelDate = new Date(channel.registeredDate.date);
        const { from, to } = filterValues.dateFilter.dateRange;
        
        if (isNaN(channelDate.getTime())) {
          return false; // Skip invalid dates
        }
        
        if (from && channelDate < from) return false;
        if (to && channelDate > to) return false;
      }

      // Merchant name filter
      if (filterValues.merchantName && filterValues.merchantName.length > 0) {
        if (!filterValues.merchantName.includes(channel.merchantName)) {
          return false;
        }
      }

      // Payment method filter
      if (filterValues.paymentMethod && filterValues.paymentMethod.length > 0) {
        if (!filterValues.paymentMethod.includes(channel.paymentMethod.type)) {
          return false;
        }
      }

      // Channel filter
      if (filterValues.channel && filterValues.channel.length > 0) {
        if (!filterValues.channel.includes(channel.channel.name)) {
          return false;
        }
      }

      // Provider filter
      if (filterValues.provider && filterValues.provider.length > 0) {
        if (!filterValues.provider.includes(channel.provider)) {
          return false;
        }
      }

      return true;
    });

    return filteredChannels;
  }, [allChannels, filterValues]);

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAllChannels(mockChannelData);
      setLoading(false);
    }, 1000);
  };

  const updateChannel = (channelId: string, updatedChannel: ChannelData) => {
    setAllChannels(prev => 
      prev.map(channel => 
        channel.id === channelId ? updatedChannel : channel
      )
    );
  };

  return {
    channels,
    loading,
    error,
    refreshData,
    updateChannel,
  };
}

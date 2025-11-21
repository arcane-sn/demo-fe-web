import { useState, useMemo } from 'react';
import { ChannelData } from '../../../types/channel';
import { mockChannelData } from '../../data/mock-channel-data';
export function useChannelData() {
  const [allChannels, setAllChannels] = useState<ChannelData[]>(mockChannelData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const channels = useMemo(() => allChannels, [allChannels]);

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

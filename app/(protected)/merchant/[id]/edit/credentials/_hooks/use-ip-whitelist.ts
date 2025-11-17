'use client';

import { useState } from 'react';
import { CREDENTIALS_CONSTANTS } from '../_lib/constants';
import type { IpWhitelistItem } from '../_lib/types';

export function useIpWhitelist() {
  const [ipWhitelist, setIpWhitelist] = useState<IpWhitelistItem[]>([...CREDENTIALS_CONSTANTS.DEFAULT_IP_WHITELIST]);

  const handleDeleteIpField = (id: number) => {
    setIpWhitelist(prev => prev.filter(item => item.id !== id));
  };

  const handleAddIpField = () => {
    const newId = Math.max(...ipWhitelist.map(item => item.id)) + 1;
    setIpWhitelist(prev => [...prev, { id: newId, value: '' }]);
  };

  const handleIpChange = (id: number, value: string) => {
    setIpWhitelist(prev => 
      prev.map(item => item.id === id ? { ...item, value } : item)
    );
  };

  return {
    ipWhitelist,
    handleDeleteIpField,
    handleAddIpField,
    handleIpChange,
  };
}

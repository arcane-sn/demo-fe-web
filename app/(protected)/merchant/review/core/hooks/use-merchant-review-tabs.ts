'use client';

import { useMemo } from 'react';
import { ReviewTab } from '../types';

export function useMerchantReviewTabs(activeTab: string) {
  const tabs: ReviewTab[] = useMemo(() => [
    {
      id: 'new-merchant',
      label: 'New Merchant',
      count: 52, // This would come from API
      active: activeTab === 'new-merchant',
    },
    {
      id: 'merchant-adjustment',
      label: 'Merchant Adjustment',
      count: 8, // This would come from API
      active: activeTab === 'merchant-adjustment',
    },
  ], [activeTab]);

  return { tabs };
}


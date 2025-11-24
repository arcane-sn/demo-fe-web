'use client';

import { useMemo } from 'react';
import { ReviewTab } from '../types';

export function useMerchantReviewTabs(activeTab: string) {
  const tabs: ReviewTab[] = useMemo(() => [
    {
      id: 'new-merchant',
      label: 'New Merchant',
      active: activeTab === 'new-merchant',
    },
    {
      id: 'merchant-adjustment',
      label: 'Merchant Adjustment',
      active: activeTab === 'merchant-adjustment',
    },
  ], [activeTab]);

  return { tabs };
}


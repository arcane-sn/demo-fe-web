/**
 * Store Provider Component
 * Initializes Zustand store with server data
 * Replaces Context API Provider
 */

'use client';

import { useEffect } from 'react';
import { MerchantData } from '../../../../types/merchant';
import { useMerchantDetailsStore } from '../../../../components/detail/core/stores/merchant-details-store';

interface StoreProviderProps {
  children: React.ReactNode;
  merchantId: string;
  initialMerchant?: MerchantData | null;
}

export function StoreProvider({ 
  children, 
  merchantId,
  initialMerchant = null 
}: StoreProviderProps) {
  const initialize = useMerchantDetailsStore((state) => state.initialize);
  const fetchMerchant = useMerchantDetailsStore((state) => state.fetchMerchant);

  // Initialize store with server data
  useEffect(() => {
    if (initialMerchant) {
      initialize(initialMerchant);
    }
  }, [initialMerchant, initialize]);

  // Fetch merchant if not provided (client-side fallback)
  useEffect(() => {
    if (merchantId && !initialMerchant) {
      fetchMerchant(merchantId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantId]); // Only depend on merchantId

  return <>{children}</>;
}


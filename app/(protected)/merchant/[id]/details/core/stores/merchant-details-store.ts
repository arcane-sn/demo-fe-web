/**
 * Unified Merchant Details Store (Zustand)
 * Replaces Context API with Zustand for better performance and consistency
 * Extends base merchant store with details-specific state
 */

'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';
import { MerchantData } from '../../../../types/merchant';
import { MerchantService } from '../../../../core/services/merchant.service';
import { 
  BaseMerchantState, 
  createBaseMerchantActions,
  baseInitialState 
} from '../../../../core/stores/base-merchant-store';

// State interface - extends base merchant state
interface MerchantDetailsState extends BaseMerchantState {
  // UI state (details-specific)
  activeTab: string;
  serviceType: string;
  
  // Actions - sync (details-specific)
  setActiveTab: (tab: string) => void;
  setServiceType: (type: string) => void;
  
  // Actions - async (details-specific)
  deleteMerchant: (merchantId: string) => Promise<void>;
}

// Initial state
const initialState = {
  ...baseInitialState,
  activeTab: 'general-info',
  serviceType: 'service-type',
};

// Create store - extends base merchant store
export const useMerchantDetailsStore = create<MerchantDetailsState>()(
  devtools(
    (set, get) => {
      // Get base merchant actions
      const baseActions = createBaseMerchantActions<MerchantDetailsState>(set, get);

      return {
        // Base merchant initial state
        ...baseInitialState,
        
        // Details-specific initial state
        activeTab: initialState.activeTab,
        serviceType: initialState.serviceType,

        // Base merchant actions
        ...baseActions,

        // Details-specific sync actions
        setActiveTab: (activeTab) => 
          set({ activeTab }, false, 'setActiveTab'),
        
        setServiceType: (serviceType) => 
          set({ serviceType }, false, 'setServiceType'),

        // Details-specific async actions
        deleteMerchant: async (merchantId: string) => {
          try {
            set({ loading: true, error: null }, false, 'deleteMerchant:start');
            
            // Use unified MerchantService
            await MerchantService.deleteMerchant(merchantId);
            
            set(
              { 
                ...initialState 
              }, 
              false, 
              'deleteMerchant:success'
            );
            
            toast.success('Merchant deleted successfully');
          } catch (error) {
            const errorMessage = error instanceof Error 
              ? error.message 
              : 'Failed to delete merchant';
            
            set(
              { 
                error: errorMessage, 
                loading: false 
              }, 
              false, 
              'deleteMerchant:error'
            );
            
            toast.error(errorMessage);
          }
        },

        // Override reset to include details-specific state
        reset: () => 
          set(initialState, false, 'reset'),
      };
    },
    {
      name: 'merchant-details-store',
    }
  )
);

// Selectors untuk performance optimization
export const useMerchant = () => useMerchantDetailsStore((state) => state.merchant);
export const useLoading = () => useMerchantDetailsStore((state) => state.loading);
export const useError = () => useMerchantDetailsStore((state) => state.error);
export const useActiveTab = () => useMerchantDetailsStore((state) => state.activeTab);
export const useServiceType = () => useMerchantDetailsStore((state) => state.serviceType);

// Action selectors - using useShallow to prevent unnecessary re-renders
export const useMerchantDetailsActions = () => {
  return useMerchantDetailsStore(
    useShallow((state) => ({
      setMerchant: state.setMerchant,
      setLoading: state.setLoading,
      setError: state.setError,
      setActiveTab: state.setActiveTab,
      setServiceType: state.setServiceType,
      fetchMerchant: state.fetchMerchant,
      updateMerchant: state.updateMerchant,
      deleteMerchant: state.deleteMerchant,
      reset: state.reset,
      initialize: state.initialize,
    }))
  );
};

// Hook untuk backward compatibility (similar to old context API)
export function useMerchantDetails() {
  const merchant = useMerchant();
  const loading = useLoading();
  const error = useError();
  const activeTab = useActiveTab();
  const serviceType = useServiceType();
  const actions = useMerchantDetailsActions();

  return {
    state: {
      merchant,
      loading,
      error,
      activeTab,
      serviceType,
    },
    ...actions,
  };
}

// Hook untuk merchant data (backward compatibility)
export function useMerchantData() {
  const merchant = useMerchant();
  const loading = useLoading();
  const error = useError();
  const { fetchMerchant, updateMerchant } = useMerchantDetailsActions();

  return {
    merchant,
    loading,
    error,
    fetchMerchant,
    updateMerchant,
  };
}


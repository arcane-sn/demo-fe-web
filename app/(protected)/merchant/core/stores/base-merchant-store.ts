/**
 * Base Merchant Store Helpers
 * Shared state and actions for merchant-related stores
 * Used by Details and Edit stores to avoid duplication
 */

import { toast } from 'sonner';
import { MerchantData } from '../../types/merchant';
import { MerchantService } from '../services/merchant.service';

/**
 * Base merchant state - shared across all merchant stores
 */
export interface BaseMerchantState {
  // Core merchant data
  merchant: MerchantData | null;
  loading: boolean;
  error: string | null;
  
  // Sync actions
  setMerchant: (merchant: MerchantData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Async actions
  fetchMerchant: (merchantId: string) => Promise<void>;
  updateMerchant: (merchantId: string, data: Partial<MerchantData>) => Promise<void>;
  
  // Reset
  reset: () => void;
  
  // Initialize with server data (for SSR)
  initialize: (merchant: MerchantData | null) => void;
}

/**
 * Base initial state
 */
export const baseInitialState = {
  merchant: null,
  loading: false,
  error: null,
};

/**
 * Create base merchant actions
 * Helper function that returns shared actions for merchant stores
 */
export function createBaseMerchantActions<T extends BaseMerchantState>(
  set: {
    (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: false, action?: string | { type: string }): void;
    (state: T | ((state: T) => T), replace: true, action?: string | { type: string }): void;
  },
  get: () => T
) {
  return {
    // Sync actions
    setMerchant: (merchant: MerchantData | null) => 
      set({ merchant, error: null } as Partial<T>, false, 'setMerchant'),
    
    setLoading: (loading: boolean) => 
      set({ loading } as Partial<T>, false, 'setLoading'),
    
    setError: (error: string | null) => 
      set({ error, loading: false } as Partial<T>, false, 'setError'),

    initialize: (merchant: MerchantData | null) => {
      if (merchant) {
        set(
          { 
            merchant, 
            loading: false, 
            error: null 
          } as Partial<T>, 
          false, 
          'initialize'
        );
      } else {
        set(
          { 
            merchant: null, 
            loading: false, 
            error: null 
          } as Partial<T>, 
          false, 
          'initialize'
        );
      }
    },

    fetchMerchant: async (merchantId: string) => {
      try {
        set({ loading: true, error: null } as Partial<T>, false, 'fetchMerchant:start');
        
        const merchant = await MerchantService.fetchMerchant(merchantId);
        
        set(
          { 
            merchant, 
            loading: false, 
            error: null 
          } as Partial<T>, 
          false, 
          'fetchMerchant:success'
        );
      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to fetch merchant data';
        
        set(
          { 
            error: errorMessage, 
            loading: false 
          } as Partial<T>, 
          false, 
          'fetchMerchant:error'
        );
        
        toast.error(errorMessage);
      }
    },

    updateMerchant: async (merchantId: string, data: Partial<MerchantData>) => {
      try {
        set({ loading: true, error: null } as Partial<T>, false, 'updateMerchant:start');
        
        const updatedMerchant = await MerchantService.updateMerchant(merchantId, data);
        
        set(
          { 
            merchant: updatedMerchant, 
            loading: false, 
            error: null 
          } as Partial<T>, 
          false, 
          'updateMerchant:success'
        );
        
        toast.success('Merchant updated successfully');
      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to update merchant';
        
        set(
          { 
            error: errorMessage, 
            loading: false 
          } as Partial<T>, 
          false, 
          'updateMerchant:error'
        );
        
        toast.error(errorMessage);
        throw error;
      }
    },
  };
}


'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { MerchantData } from '../../../../types/merchant';
import { 
  BaseMerchantState, 
  createBaseMerchantActions,
  baseInitialState 
} from '../../../../core/stores/base-merchant-store';

/**
 * Edit State - extends base merchant state with edit-specific state
 */
export interface EditState extends BaseMerchantState {
  // Form state per section (edit-specific)
  formData: Partial<MerchantData>;
  hasUnsavedChanges: boolean;
  merchantId: string | null; // Store merchant ID for draft key
  
  // Actions (edit-specific)
  setFormData: (data: Partial<MerchantData>) => void;
  updateFormData: (data: Partial<MerchantData>) => void;
  resetFormData: () => void;
  setHasUnsavedChanges: (hasChanges: boolean) => void;
  setMerchantId: (id: string | null) => void;
  
  // Draft management
  saveDraft: (merchantId: string) => void;
  clearDraft: () => void;
  restoreDraft: (merchantId: string) => boolean;
}

const initialState = {
  ...baseInitialState,
  formData: {},
  hasUnsavedChanges: false,
  merchantId: null,
};

export const useEditStore = create<EditState>()(
  devtools(
    (set, get) => {
      // Get base merchant actions
      const baseActions = createBaseMerchantActions<EditState>(set, get);

      return {
        // Base merchant initial state
        ...baseInitialState,
        
        // Edit-specific initial state
        formData: initialState.formData,
        hasUnsavedChanges: initialState.hasUnsavedChanges,
        merchantId: initialState.merchantId,

        // Base merchant actions (will be overridden for edit-specific behavior)
        ...baseActions,

        // Edit-specific sync actions with auto-save
        setFormData: (formData) => {
          set({ formData, hasUnsavedChanges: true }, false, 'setFormData');
          // Auto-save draft after setting form data
          const state = get();
          if (state.merchantId) {
            state.saveDraft(state.merchantId);
          }
        },
        
        updateFormData: (data) => {
          set((state) => ({
            formData: { ...state.formData, ...data },
            hasUnsavedChanges: true,
          }), false, 'updateFormData');
          // Auto-save draft after updating form data (debounced)
          const state = get();
          if (state.merchantId) {
            // Clear existing timeout
            if ((state as any).__draftTimeout) {
              clearTimeout((state as any).__draftTimeout);
            }
            // Set new timeout for debounced save
            (state as any).__draftTimeout = setTimeout(() => {
              const currentState = get();
              if (currentState.merchantId && currentState.hasUnsavedChanges) {
                currentState.saveDraft(currentState.merchantId);
              }
            }, 1000);
          }
        },
        
        resetFormData: () => 
          set({ formData: {}, hasUnsavedChanges: false }, false, 'resetFormData'),
        
        setHasUnsavedChanges: (hasUnsavedChanges) => 
          set({ hasUnsavedChanges }, false, 'setHasUnsavedChanges'),
        
        setMerchantId: (merchantId) => 
          set({ merchantId }, false, 'setMerchantId'),
        
        // Draft management
        saveDraft: (merchantId: string) => {
          const state = get();
          try {
            const draftKey = `merchant-edit-draft-${merchantId}`;
            const draftData = {
              formData: state.formData,
              hasUnsavedChanges: state.hasUnsavedChanges,
              savedAt: new Date().toISOString(),
            };
            localStorage.setItem(draftKey, JSON.stringify(draftData));
          } catch (error) {
            // Silent fail - draft saving is not critical
          }
        },
        
        clearDraft: () => {
          // Clear persisted draft from localStorage
          const state = get();
          if (state.merchantId) {
            const draftKey = `merchant-edit-draft-${state.merchantId}`;
            try {
              localStorage.removeItem(draftKey);
            } catch (error) {
              // Silent fail - draft clearing is not critical
            }
          }
          set({ formData: {}, hasUnsavedChanges: false }, false, 'clearDraft');
        },
        
        restoreDraft: (merchantId: string) => {
          try {
            const draftKey = `merchant-edit-draft-${merchantId}`;
            const draftData = localStorage.getItem(draftKey);
            
            if (draftData) {
              const parsed = JSON.parse(draftData);
              set(
                {
                  formData: parsed.formData || {},
                  hasUnsavedChanges: parsed.hasUnsavedChanges || false,
                  merchantId,
                },
                false,
                'restoreDraft'
              );
              return true;
            }
          } catch (error) {
            // Silent fail - draft restoration is not critical
          }
          return false;
        },

        // Override fetchMerchant to include formData initialization
        fetchMerchant: async (merchantId: string) => {
          try {
            set({ loading: true, error: null, merchantId }, false, 'fetchMerchant:start');
            
            // Check for draft first
            const state = get();
            const draftKey = `merchant-edit-draft-${merchantId}`;
            let hasDraft = false;
            
            try {
              const draftData = localStorage.getItem(draftKey);
              if (draftData) {
                hasDraft = true;
              }
            } catch (error) {
              // Silent fail - draft check is not critical
            }
            
            // Use base store's fetchMerchant logic
            await baseActions.fetchMerchant(merchantId);
            
            // After fetch, initialize formData
            // If draft exists, restore it; otherwise use merchant data
            const currentState = get();
            if (currentState.merchant) {
              if (hasDraft) {
                // Restore draft
                state.restoreDraft(merchantId);
              } else {
                // Use fresh merchant data
                set(
                  {
                    formData: { ...currentState.merchant },
                    hasUnsavedChanges: false,
                  },
                  false,
                  'fetchMerchant:formDataInit'
                );
              }
            }
          } catch (error) {
            // Error handling is done in base store
          }
        },

        // Override updateMerchant to sync formData
        updateMerchant: async (merchantId: string, data: Partial<MerchantData>) => {
          try {
            set({ loading: true, error: null }, false, 'updateMerchant:start');
            
            // Use base store's updateMerchant
            await baseActions.updateMerchant(merchantId, data);
            
            // After update, sync formData and clear draft
            const state = get();
            if (state.merchant) {
              set(
                {
                  formData: { ...state.merchant },
                  hasUnsavedChanges: false,
                },
                false,
                'updateMerchant:formDataSync'
              );
              
              // Clear draft after successful save
              state.clearDraft();
            }
          } catch (error) {
            // Error handling is done in base store
            throw error;
          }
        },

        // Override reset to include edit-specific state
        reset: () => {
          const state = get();
          // Clear draft before reset
          if (state.merchantId) {
            state.clearDraft();
          }
          set(initialState, false, 'reset');
        },
      };
    },
    {
      name: 'edit-store',
    }
  )
);

// Selectors untuk performance optimization
export const useMerchant = () => useEditStore((state) => state.merchant);
export const useLoading = () => useEditStore((state) => state.loading);
export const useError = () => useEditStore((state) => state.error);
export const useFormData = () => useEditStore((state) => state.formData);
export const useHasUnsavedChanges = () => useEditStore((state) => state.hasUnsavedChanges);

// Action selectors - using useShallow to prevent infinite loops
// useShallow performs shallow equality check to prevent unnecessary re-renders
export const useEditActions = () => {
  return useEditStore(
    useShallow((state) => ({
      setMerchant: state.setMerchant,
      setLoading: state.setLoading,
      setError: state.setError,
      setFormData: state.setFormData,
      updateFormData: state.updateFormData,
      resetFormData: state.resetFormData,
      setHasUnsavedChanges: state.setHasUnsavedChanges,
      fetchMerchant: state.fetchMerchant,
      updateMerchant: state.updateMerchant,
      reset: state.reset,
    }))
  );
};


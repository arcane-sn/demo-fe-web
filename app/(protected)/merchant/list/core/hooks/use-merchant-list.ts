'use client';

import { useState, useCallback } from 'react';
import { MerchantData } from '../../../types/merchant';
import { MerchantService } from '../../../core/services/merchant.service';
import { useMerchantNavigation } from '../../../utils/navigation';

export interface MerchantListState {
  selectedMerchants: MerchantData[];
  loading: boolean;
  error: string | undefined;
}

export interface MerchantListActions {
  setSelectedMerchants: (merchants: MerchantData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | undefined) => void;
  handleView: (merchant: MerchantData) => void;
  handleEdit: (merchant: MerchantData) => void;
  handleDelete: (merchant: MerchantData) => Promise<void>;
  handleCreate: () => void;
  handleRowClick: (merchant: MerchantData) => void;
  handleSelectionChange: (selected: MerchantData[]) => void;
  clearError: () => void;
}

export function useMerchantList() {
  const [selectedMerchants, setSelectedMerchants] = useState<MerchantData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigation = useMerchantNavigation();

  const handleView = useCallback((merchant: MerchantData) => {
    navigation.toDetails(merchant.id);
  }, [navigation]);

  const handleEdit = useCallback((merchant: MerchantData) => {
    navigation.toEdit(merchant.id);
  }, [navigation]);

  const handleDelete = useCallback(async (merchant: MerchantData) => {
    if (!confirm(`Are you sure you want to delete ${merchant.companyName}? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      await MerchantService.deleteMerchant(merchant.id);
      
      // Remove from selected merchants if it was selected
      setSelectedMerchants(prev => 
        prev.filter(m => m.id !== merchant.id)
      );
    } catch (err) {
      setError('Failed to delete merchant. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = useCallback(() => {
    navigation.toCreate();
  }, [navigation]);

  const handleRowClick = useCallback((merchant: MerchantData) => {    
    if (!merchant) {
      setError('Invalid merchant data');
      return;
    }
    
    if (!merchant.id) {
      setError('Invalid merchant ID');
      return;
    }
    navigation.toDetails(merchant.id);
  }, [navigation]);

  const handleSelectionChange = useCallback((selected: MerchantData[]) => {
    setSelectedMerchants(selected);
  }, []);

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  return {
    // State
    selectedMerchants,
    loading,
    error,
    
    // Actions
    setSelectedMerchants,
    setLoading,
    setError,
    handleView,
    handleEdit,
    handleDelete,
    handleCreate,
    handleRowClick,
    handleSelectionChange,
    clearError,
  };
}


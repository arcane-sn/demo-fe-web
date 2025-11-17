'use client';

import React, { useState, useEffect } from 'react';
import { MerchantTable } from './table/merchant-table';
import { MerchantService } from '../../core/services/merchant.service';
import { MerchantData } from '../../types/merchant';
import { Button } from '@/components/ui/button';
import { useMerchantList } from '../core/hooks/use-merchant-list';

interface MerchantListContentProps {
  initialMerchants?: MerchantData[];
}

export function MerchantListContent({ initialMerchants = [] }: MerchantListContentProps) {
  const [merchants, setMerchants] = useState<MerchantData[]>(initialMerchants);
  const [initialLoading, setInitialLoading] = useState(!initialMerchants.length);
  
  const {
    selectedMerchants,
    loading,
    error,
    handleView,
    handleEdit,
    handleDelete,
    handleCreate,
    handleRowClick,
    handleSelectionChange,
    clearError,
  } = useMerchantList();

  // Only fetch if no initial data provided
  useEffect(() => {
    if (!initialMerchants.length) {
    const fetchMerchants = async () => {
      try {
        setInitialLoading(true);
        const data = await MerchantService.getMerchantsForList();
        setMerchants(data);
      } catch (error) {
        // Error handling is done by the service layer
      } finally {
        setInitialLoading(false);
      }
    };

    fetchMerchants();
    }
  }, [initialMerchants.length]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Merchants</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all registered merchants
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedMerchants.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {selectedMerchants.length} selected
            </span>
          )}
          <Button onClick={handleCreate} disabled={loading}>
            Add Merchant
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-red-800">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="text-red-600 hover:text-red-800"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <MerchantTable
        data={merchants}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelectionChange}
        loading={loading || initialLoading}
        error={error}
      />
    </div>
  );
}

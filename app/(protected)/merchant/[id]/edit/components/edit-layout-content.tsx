/**
 * Edit Layout Content (Client Component)
 * Handles client-side logic for edit layout
 */

'use client';

import React, { Fragment } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MerchantData } from '../../../types/merchant';
import { EditProvider, EditHeader, EditMenu, useEditContext } from '../_components';

interface EditLayoutContentProps {
  children: React.ReactNode;
  initialMerchant?: MerchantData | null;
  merchantId: string;
}

export function EditLayoutContent({ 
  children, 
  initialMerchant,
  merchantId 
}: EditLayoutContentProps) {
  const router = useRouter();
  const { merchant, loading, updateMerchant } = useEditContext();

  // Use merchant from store, fallback to initialMerchant
  const currentMerchant = merchant || initialMerchant;

  const handleSave = async (data: MerchantData) => {
    try {
      await updateMerchant(merchantId, data);
      router.push(`/merchant/${merchantId}/details`);
    } catch (error) {
      // Error handling is done by the store
    }
  };

  const handleCancel = () => {
    router.push(`/merchant/${merchantId}/details`);
  };

  // Show loading only if we don't have any merchant data
  if (loading && !currentMerchant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading merchant data...</p>
        </div>
      </div>
    );
  }

  if (!currentMerchant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Merchant Not Found</h1>
          <p className="text-muted-foreground mt-2">The merchant you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/merchant/list')}
            className="mt-4 text-primary hover:underline"
          >
            Back to Merchant List
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <EditHeader 
        merchant={currentMerchant}
        onCancel={handleCancel}
        loading={loading}
      />
      <EditMenu merchantId={merchantId} />
      <div className="py-15">
        {children}
      </div>
    </Fragment>
  );
}


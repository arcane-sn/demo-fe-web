'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MerchantData } from '../../../../types/merchant';

interface EditHeaderProps {
  merchant: MerchantData;
  onCancel: () => void;
  loading?: boolean;
}

export function EditHeader({ 
  merchant, 
  onCancel, 
  loading = false
}: EditHeaderProps) {
  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 top-0 z-50 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onCancel}
              disabled={loading}
              className="flex items-center gap-2 border"
            >
              <ArrowLeft className="h-2 w-2" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Edit Merchant</h1>
              <p className="text-sm text-muted-foreground">
                {merchant.companyName || merchant.brandName || 'Make changes to this merchant\'s data and information'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubMerchantCard } from '../shared/sub-merchant-card';

interface SubMerchantsSectionProps {
  form: any;
  availableSubMerchants: any[];
  onShowAvailableSubMerchants: () => void;
  onRemoveSubMerchant: (id: string) => void;
}

export function SubMerchantsSection({ 
  form, 
  availableSubMerchants, 
  onShowAvailableSubMerchants,
  onRemoveSubMerchant
}: SubMerchantsSectionProps) {
  return (
    <div id="sub-merchants" className="scroll-mt-24">
          <SubMerchantCard
            form={form}
            availableSubMerchants={availableSubMerchants}
            onShowAvailableSubMerchants={onShowAvailableSubMerchants}
            onRemoveSubMerchant={onRemoveSubMerchant}
          />
    </div>
  );
}

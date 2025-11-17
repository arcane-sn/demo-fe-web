'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ParentMerchantCard } from '../shared/parent-merchant-card';

interface ParentMerchantSectionProps {
  form: any;
  availableParents: any[];
  onShowAvailableParents: () => void;
}

export function ParentMerchantSection({ 
  form, 
  availableParents, 
  onShowAvailableParents 
}: ParentMerchantSectionProps) {
  return (
    <div id="parent-merchant" className="scroll-mt-24">
          <ParentMerchantCard
            form={form}
            availableParents={availableParents}
            onShowAvailableParents={onShowAvailableParents}
          />
    </div>
  );
}

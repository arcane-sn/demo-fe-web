'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormFieldWrapper } from '../../../_components/form';

interface BusinessCharacteristicsSectionProps {
  control: any;
}

export function BusinessCharacteristicsSection({ control }: BusinessCharacteristicsSectionProps) {
  const businessModelOptions = [
    { value: 'b2b', label: 'B2B' },
    { value: 'b2c', label: 'B2C' },
    { value: 'b2b2c', label: 'B2B2C' },
    { value: 'marketplace', label: 'Marketplace' },
    { value: 'other', label: 'Other' },
  ];

  const corporateTaxTypeOptions = [
    { value: 'ppn', label: 'PPN' },
    { value: 'pph', label: 'PPH' },
    { value: 'both', label: 'Both PPN & PPH' },
    { value: 'none', label: 'None' },
  ];

  return (
    <div id="business-characteristics" className="scroll-mt-24">
      <Card>
        <CardHeader>
          <CardTitle>Business Characteristics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormFieldWrapper
            control={control}
            name="characteristics.businessModel"
            label="Business Model"
            type="select"
            placeholder="Select business model"
            options={businessModelOptions}
          />

          <FormFieldWrapper
            control={control}
            name="characteristics.corporateTaxType"
            label="Corporate Tax Type"
            type="select"
            placeholder="Select tax type"
            options={corporateTaxTypeOptions}
          />

          <FormFieldWrapper
            control={control}
            name="characteristics.currentMonthlySales"
            label="Current Monthly Sales"
            placeholder="e.g. 10000000"
          />

          <FormFieldWrapper
            control={control}
            name="characteristics.estimatedMonthlySales"
            label="Estimated Monthly Sales"
            placeholder="e.g. 15000000"
          />

          <FormFieldWrapper
            control={control}
            name="characteristics.averageEstimatedRevenue"
            label="Average Estimated Revenue"
            placeholder="e.g. 20000000"
          />

          <FormFieldWrapper
            control={control}
            name="characteristics.transferService"
            label="Transfer Service"
            type="switch"
          />

          <FormFieldWrapper
            control={control}
            name="characteristics.transferUseCase"
            label="Transfer Use Case"
            placeholder="Describe transfer use case"
          />

          <FormFieldWrapper
            control={control}
            name="characteristics.transferVolume"
            label="Transfer Volume"
            placeholder="e.g. 1000000"
          />
        </CardContent>
      </Card>
    </div>
  );
}

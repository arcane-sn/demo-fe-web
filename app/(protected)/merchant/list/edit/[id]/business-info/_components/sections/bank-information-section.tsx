'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormFieldWrapper } from '../../../_components/form';

interface BankInformationSectionProps {
  control: any;
}

export function BankInformationSection({ control }: BankInformationSectionProps) {
  const bankOptions = [
    { value: 'bca', label: 'BCA' },
    { value: 'mandiri', label: 'Mandiri' },
    { value: 'bni', label: 'BNI' },
    { value: 'bri', label: 'BRI' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div id="bank-information" className="scroll-mt-24">
      <Card>
        <CardHeader>
          <CardTitle>Bank Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormFieldWrapper
            control={control}
            name="bank.bankNameCode"
            label="Bank Name Code"
            type="select"
            placeholder="Select bank"
            options={bankOptions}
          />

          <FormFieldWrapper
            control={control}
            name="bank.accountNumber"
            label="Account Number"
            placeholder="Account number"
          />

          <FormFieldWrapper
            control={control}
            name="bank.accountName"
            label="Account Name"
            placeholder="Account holder name"
          />
        </CardContent>
      </Card>
    </div>
  );
}

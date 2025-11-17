'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormFieldWrapper } from '../../../_components/form';

interface BusinessAddressSectionProps {
  control: any;
}

export function BusinessAddressSection({ control }: BusinessAddressSectionProps) {
  const countryOptions = [
    { value: 'Indonesia', label: 'Indonesia', flag: 'Indonesia' },
    { value: 'Singapore', label: 'Singapore', flag: 'Singapore' },
    { value: 'Malaysia', label: 'Malaysia', flag: 'Malaysia' },
    { value: 'Thailand', label: 'Thailand', flag: 'Thailand' },
  ];

  const provinceOptions = [
    { value: 'jakarta', label: 'DKI Jakarta' },
    { value: 'west-java', label: 'West Java' },
    { value: 'central-java', label: 'Central Java' },
    { value: 'east-java', label: 'East Java' },
    { value: 'bali', label: 'Bali' },
    { value: 'other', label: 'Other' },
  ];

  const cityOptions = [
    { value: 'jakarta', label: 'Jakarta' },
    { value: 'bandung', label: 'Bandung' },
    { value: 'surabaya', label: 'Surabaya' },
    { value: 'yogyakarta', label: 'Yogyakarta' },
    { value: 'bali', label: 'Bali' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div id="business-address" className="scroll-mt-24">
      <Card>
        <CardHeader>
          <CardTitle>Business Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormFieldWrapper
            control={control}
            name="address.address"
            label="Address"
            placeholder="Street address"
          />

          <FormFieldWrapper
            control={control}
            name="address.country"
            label="Country"
            type="select"
            options={countryOptions}
            defaultValue="Indonesia"
          />

          <FormFieldWrapper
            control={control}
            name="address.province"
            label="Province"
            type="select"
            placeholder="Select province"
            options={provinceOptions}
          />

          <FormFieldWrapper
            control={control}
            name="address.city"
            label="City"
            type="select"
            placeholder="Select city"
            options={cityOptions}
          />

          <FormFieldWrapper
            control={control}
            name="address.district"
            label="District"
            placeholder="District name"
          />

          <FormFieldWrapper
            control={control}
            name="address.subDistrict"
            label="Sub District"
            placeholder="Sub district name"
          />

          <FormFieldWrapper
            control={control}
            name="address.postalCode"
            label="Postal Code"
            placeholder="12345"
          />

          <FormFieldWrapper
            control={control}
            name="address.legalAddressSame"
            label="Legal Address Same"
            type="switch"
          />
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormFieldWrapper } from '../../../_components/form';

interface BusinessProfileSectionProps {
  control: any;
}

export function BusinessProfileSection({ control }: BusinessProfileSectionProps) {
  const businessTypeOptions = [
    { value: 'corporation', label: 'Corporation' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'sole-proprietorship', label: 'Sole Proprietorship' },
    { value: 'llc', label: 'LLC' },
    { value: 'other', label: 'Other' },
  ];

  const businessIndustryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'retail', label: 'Retail' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div id="business-profile" className="scroll-mt-24">
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormFieldWrapper
            control={control}
            name="profile.companyName"
            label="Company Name"
            placeholder="Company name"
          />

          <FormFieldWrapper
            control={control}
            name="profile.brandName"
            label="Brand Name"
            placeholder="Brand name"
          />

          <FormFieldWrapper
            control={control}
            name="profile.phoneNumber"
            label="Business Phone Number"
            type="phone"
            placeholder="e.g. 81234567890"
          />

          <FormFieldWrapper
            control={control}
            name="profile.email"
            label="Business Email"
            type="email"
            placeholder="email@domain.com"
          />

          <FormFieldWrapper
            control={control}
            name="profile.businessType"
            label="Business Type"
            type="select"
            placeholder="Select business type"
            options={businessTypeOptions}
          />

          <FormFieldWrapper
            control={control}
            name="profile.businessIndustry"
            label="Business Industry"
            type="select"
            placeholder="Select industry"
            options={businessIndustryOptions}
          />

          <FormFieldWrapper
            control={control}
            name="profile.website"
            label="Website"
            placeholder="https://example.com"
          />
        </CardContent>
      </Card>
    </div>
  );
}

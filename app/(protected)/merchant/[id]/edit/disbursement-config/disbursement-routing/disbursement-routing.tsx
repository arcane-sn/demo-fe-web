'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DisbursementRoutingProps {
  accountInquiryProvider?: string;
  disbursementProvider?: string;
  onAccountInquiryChange?: (value: string) => void;
  onDisbursementChange?: (value: string) => void;
}

const DisbursementRoutingForm: React.FC<DisbursementRoutingProps> = ({
  accountInquiryProvider = 'ProviderAccountInquiry01',
  disbursementProvider = 'ProviderDisbursement01',
  onAccountInquiryChange,
  onDisbursementChange,
}) => {
  // Mock provider options - replace with actual data from your API
  const accountInquiryProviders = [
    { value: 'ProviderAccountInquiry01', label: 'ProviderAccountInquiry01' },
    { value: 'ProviderAccountInquiry02', label: 'ProviderAccountInquiry02' },
    { value: 'ProviderAccountInquiry03', label: 'ProviderAccountInquiry03' },
  ];

  const disbursementProviders = [
    { value: 'ProviderDisbursement01', label: 'ProviderDisbursement01' },
    { value: 'ProviderDisbursement02', label: 'ProviderDisbursement02' },
    { value: 'ProviderDisbursement03', label: 'ProviderDisbursement03' },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">Disbursement Routing</h1>
        <p className="text-sm text-muted-foreground">Disbursement routing provider setup for this merchant</p>
      </div>

      {/* Account Inquiry Provider Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold ">
            Account Inquiry Provider
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Label 
              htmlFor="account-inquiry-provider" 
              className="text-sm font-normal text-gray-700 min-w-[120px]"
            >
              Provider Name
            </Label>
            <Select
              value={accountInquiryProvider}
              onValueChange={onAccountInquiryChange}
            >
              <SelectTrigger 
                id="account-inquiry-provider"
                className="flex-1 max-w-md"
                size="md"
              >
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {accountInquiryProviders.map((provider) => (
                  <SelectItem key={provider.value} value={provider.value}>
                    {provider.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Disbursement Provider Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold ">
            Disbursement Provider
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Label 
              htmlFor="disbursement-provider" 
              className="text-sm font-normal text-gray-700 min-w-[120px]"
            >
              Provider Name
            </Label>
            <Select
              value={disbursementProvider}
              onValueChange={onDisbursementChange}
            >
              <SelectTrigger 
                id="disbursement-provider"
                className="flex-1 max-w-md"
                size="md"
              >
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {disbursementProviders.map((provider) => (
                  <SelectItem key={provider.value} value={provider.value}>
                    {provider.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Export the component
export { DisbursementRoutingForm };

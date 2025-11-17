'use client';

import React from 'react';
import { Rocket, FileText } from 'lucide-react';
import { ServiceCard } from '../shared/service-card';
import { ServiceOptions } from '../shared/service-options';
import { Checkbox } from '@/components/ui/checkbox';

interface DisbursementServiceSectionProps {
  disbursementService: boolean;
  directApiIntegration: boolean;
  nonIntegration: boolean;
  accountInquiry: boolean;
  onDisbursementServiceChange: (checked: boolean) => void;
  onDirectApiIntegrationChange: (checked: boolean) => void;
  onNonIntegrationChange: (checked: boolean) => void;
  onAccountInquiryChange: (checked: boolean) => void;
}

export function DisbursementServiceSection({
  disbursementService,
  directApiIntegration,
  nonIntegration,
  accountInquiry,
  onDisbursementServiceChange,
  onDirectApiIntegrationChange,
  onNonIntegrationChange,
  onAccountInquiryChange,
}: DisbursementServiceSectionProps) {
  const disbursementOptions = [
    {
      id: 'direct-api',
      label: 'Direct API Integration',
      description: 'Integration platform to Disbursement Service',
      checked: directApiIntegration,
      onCheckedChange: onDirectApiIntegrationChange,
    },
    {
      id: 'non-integration',
      label: 'Non-Integration',
      description: 'Using [our brand name] provided dashboard',
      checked: nonIntegration,
      onCheckedChange: onNonIntegrationChange,
    },
  ];

  return (
    <>
      <ServiceCard
        title="Disbursement Service"
        description="Enable to use Disbursement Service"
        icon={Rocket}
        checked={disbursementService}
        onCheckedChange={onDisbursementServiceChange}
      />

      {disbursementService && (
        <div className="space-y-4 p-3">
          <div className="flex gap-20">
            <ServiceOptions
              title="Payment Disbursement Services"
              description="Chose service (at least 1 service is enabled)"
              options={disbursementOptions}
            />
          </div>
          <div className="flex items-center pt-3 gap-23">
            <div>
              <h3 className="font-semibold text-gray-900">Account Inquiry Service</h3>
              <p className="text-sm text-gray-600 w-70">Turn this toggle ON to make account inquiry mandatory</p>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="account-inquiry"
                checked={accountInquiry}
                onCheckedChange={(checked) => onAccountInquiryChange(checked === true)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <div>
                <label htmlFor="account-inquiry" className="text-sm font-medium text-gray-900">
                  Account Inquiry
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

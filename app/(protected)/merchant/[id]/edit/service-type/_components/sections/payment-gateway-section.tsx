'use client';

import React from 'react';
import { CreditCard } from 'lucide-react';
import { ServiceCard } from '../shared/service-card';
import { ServiceOptions } from '../shared/service-options';

interface PaymentGatewaySectionProps {
  paymentGateway: boolean;
  fullApiIntegration: boolean;
  onPaymentGatewayChange: (checked: boolean) => void;
  onFullApiIntegrationChange: (checked: boolean) => void;
}

export function PaymentGatewaySection({
  paymentGateway,
  fullApiIntegration,
  onPaymentGatewayChange,
  onFullApiIntegrationChange,
}: PaymentGatewaySectionProps) {
  const paymentGatewayOptions = [
    {
      id: 'full-api',
      label: 'Full API Integration',
      description: 'Integration platform to Payment Gateway Service and using provided dashboard',
      checked: fullApiIntegration,
      onCheckedChange: onFullApiIntegrationChange,
    },
  ];

  return (
    <>
      <ServiceCard
        title="Payment Gateway"
        description="Enable to use Payment Gateway Service"
        icon={CreditCard}
        checked={paymentGateway}
        onCheckedChange={onPaymentGatewayChange}
      />

      {paymentGateway && (
        <ServiceOptions
          title="Payment Gateway Services"
          description="Chose service (at least 1 service is enabled)"
          options={paymentGatewayOptions}
        />
      )}
    </>
  );
}

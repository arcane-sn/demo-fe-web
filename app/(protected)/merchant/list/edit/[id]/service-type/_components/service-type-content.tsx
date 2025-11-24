'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import { PaymentGatewaySection, DisbursementServiceSection } from './sections';

export function ServiceTypeContent() {
  const [paymentGateway, setPaymentGateway] = useState(true);
  const [fullApiIntegration, setFullApiIntegration] = useState(true);
  const [disbursementService, setDisbursementService] = useState(true);
  const [directApiIntegration, setDirectApiIntegration] = useState(true);
  const [nonIntegration, setNonIntegration] = useState(false);
  const [accountInquiry, setAccountInquiry] = useState(true);

  // Handle Payment Gateway toggle
  const handlePaymentGatewayChange = (checked: boolean) => {
    setPaymentGateway(checked);
    if (!checked) {
      setFullApiIntegration(false);
    }
  };

  // Handle Disbursement Service toggle
  const handleDisbursementServiceChange = (checked: boolean) => {
    setDisbursementService(checked);
    if (!checked) {
      setDirectApiIntegration(false);
      setNonIntegration(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card id="supporting-documents">
        <CardHeader>
          <CardTitle>Service Type</CardTitle>
          <CardDescription>Choose service you want to use (at least 1 service is enabled)</CardDescription>
        </CardHeader>
        <CardContent className="p-10 space-y-6">
          <PaymentGatewaySection
            paymentGateway={paymentGateway}
            fullApiIntegration={fullApiIntegration}
            onPaymentGatewayChange={handlePaymentGatewayChange}
            onFullApiIntegrationChange={setFullApiIntegration}
          />

          <DisbursementServiceSection
            disbursementService={disbursementService}
            directApiIntegration={directApiIntegration}
            nonIntegration={nonIntegration}
            accountInquiry={accountInquiry}
            onDisbursementServiceChange={handleDisbursementServiceChange}
            onDirectApiIntegrationChange={setDirectApiIntegration}
            onNonIntegrationChange={setNonIntegration}
            onAccountInquiryChange={setAccountInquiry}
          />
        </CardContent>
      </Card>
    </div>
  );
}

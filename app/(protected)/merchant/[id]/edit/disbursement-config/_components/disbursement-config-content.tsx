'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DisbursementPricingForm } from '../disbursement-pricing/disbursement-pricing';
import { DisbursementRoutingForm } from '../disbursement-routing/disbursement-routing';

export function DisbursementConfigContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('pricing');

  useEffect(() => {
    const tab = searchParams.get('tab') || 'pricing';
    setActiveTab(tab);
  }, [searchParams]);

  return (
    <div className="space-y-6">
      {activeTab === 'pricing' && <DisbursementPricingForm />}
      {activeTab === 'routing' && <DisbursementRoutingForm />}
    </div>
  );
}

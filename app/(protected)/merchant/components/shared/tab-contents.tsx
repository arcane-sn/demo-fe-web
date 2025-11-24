'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CreditCard, Building2, Shield, Activity, MoreHorizontal } from 'lucide-react';
import { SharedFolderLink } from '../detail/support-docs/shared-folder-link';
import { SupportDocsList } from '../detail/support-docs/support-docs-list';
import { PaymentGatewayContent } from '../detail/services-pricing/payment-gateway/payment-gateway-content';
import { DisbursementContent } from '../detail/services-pricing/disbursement/disbursement-content';
import { ServiceTypeContent } from '../detail/services-pricing/service-type/service-type-content';
import { HierarchyTab } from '../detail/hierarchy/hierarchy-tab';
import { CredentialsTab } from '../detail/credentials/credentials-tab';
import { ActivityTab } from '../detail/activity/components/activity-tab';
import { OthersTab } from '../detail/others//others-tab';

export function SupportDocsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <SharedFolderLink />
        </div>
        <div className="lg:col-span-2">
          <SupportDocsList />
        </div>
      </div>
    </div>
  );
}

interface ServicesPricingTabProps {
  serviceType?: string;
}

export function ServicesPricingTab({ serviceType = 'service-type' }: ServicesPricingTabProps) {
  const renderContent = () => {
    switch (serviceType) {
      case 'service-type':
        return <ServiceTypeContent />;
      case 'payment-gateway':
        return <PaymentGatewayContent />;
      case 'disbursement':
        return <DisbursementContent />;
      default:
        return <ServiceTypeContent />;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}

export function HierarchyTabComponent() {
  return <HierarchyTab />;
}

export function CredentialsTabComponent() {
  return <CredentialsTab />;
}

export function ActivityTabComponent() {
  return <ActivityTab />;
}

export function OthersTabComponent() {
  return <OthersTab />;
}

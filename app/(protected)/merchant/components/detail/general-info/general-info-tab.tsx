'use client';

import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MerchantData } from '../../../types/merchant';
import { useMerchantDetails } from '../core/hooks/use-merchant-details';
import { LoadingSpinner } from '../../shared/loading-spinner';
import { MerchantMetricsCards } from './merchant-metrics-cards';
import { BusinessProfileCard } from './business-profile-card';
import { BusinessAddressCard } from './business-address-card';
import { BusinessCharacteristicsCard } from './business-characteristics-card';
import { MerchantStatusInfoCard } from './merchant-status-info-card';
import { BankInfoCard } from './bank-info-card';
import { PicInfoCard } from './pic-info-card';

interface GeneralInfoTabProps {
  merchant?: MerchantData;
  onDelete?: () => void;
  loading?: boolean;
}

export function GeneralInfoTab({ merchant, onDelete, loading }: GeneralInfoTabProps = {}) {
  // Use hooks if props not provided
  const hookData = useMerchantDetails();
  const finalMerchant = merchant || hookData.merchant;
  const finalLoading = loading ?? hookData.loading;
  const finalOnDelete = onDelete || (() => finalMerchant?.id && hookData.deleteMerchant(finalMerchant.id));

  if (finalLoading) {
    return <LoadingSpinner message="Loading merchant data..." />;
  }

  if (!finalMerchant) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-sm text-muted-foreground">No merchant data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MerchantMetricsCards merchantId={finalMerchant.id} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BusinessProfileCard merchant={finalMerchant} />
          <BusinessAddressCard merchant={finalMerchant} />
          <BusinessCharacteristicsCard merchant={finalMerchant} />
        </div>

        <div className="space-y-6">
          <MerchantStatusInfoCard merchant={finalMerchant} />
          <BankInfoCard merchant={finalMerchant} />
          <PicInfoCard merchant={finalMerchant} />

        </div>
      </div>
    </div>
  );
}

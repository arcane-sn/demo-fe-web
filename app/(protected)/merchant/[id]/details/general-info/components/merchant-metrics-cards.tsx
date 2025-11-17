'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useMetrics } from '../../core/hooks/use-metrics';
import { LoadingSpinner } from '../../components/shared/loading-spinner';

interface MerchantMetricsCardsProps {
  merchantId: string;
}

export function MerchantMetricsCards({ merchantId }: MerchantMetricsCardsProps) {
  const { metrics, loading, error } = useMetrics(merchantId);

  if (loading) {
    return <LoadingSpinner message="Loading metrics..." />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Error loading metrics: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {metrics.totalTransactionAmount}
          </div>
          <div className="text-sm text-muted-foreground">
            Total Trans. Amount
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {metrics.totalTransactionVolume}
          </div>
          <div className="text-sm text-muted-foreground">
            Total Trans. Volume
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {metrics.totalMDR}
          </div>
          <div className="text-sm text-muted-foreground">
            Total MDR
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MerchantData } from '../../../types/merchant';

interface BusinessCharacteristicsCardProps {
  merchant: MerchantData;
}

export function BusinessCharacteristicsCard({ merchant }: BusinessCharacteristicsCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Business Characteristics
        </CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {/* Characteristic Info Section */}
        <div className="px-6 py-4 bg-muted/30">
          <h4 className="text-sm font-semibold text-foreground">Characteristic Info</h4>
        </div>
        
        {/* Business Model */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Business Model
          </label>
          <div className="text-sm">
            {merchant.businessModel}
          </div>
        </div>

        {/* Corporate Tax Type */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Corporate Tax Type
          </label>
          <div className="text-sm">
            {merchant.corporateTaxType}
          </div>
        </div>

        {/* Sales & Revenue Section */}
        <div className="px-6 py-4 bg-muted/30">
          <h4 className="text-sm font-semibold text-foreground">Sales & Revenue</h4>
        </div>
        
        {/* Current Monthly Sales */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Current Monthly Sales
          </label>
          <div className="text-sm">
            {formatCurrency(merchant.currentMonthlySales)}
          </div>
        </div>

        {/* Estimated Monthly Sales */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Estimated Monthly Sales
          </label>
          <div className="text-sm">
            {formatCurrency(merchant.estimatedMonthlySales)}
          </div>
        </div>

        {/* Avg. Estimated Revenue */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Avg. Estimated Revenue
          </label>
          <div className="text-sm">
            {formatCurrency(merchant.averageEstimatedRevenue)}
          </div>
        </div>

        {/* Transfer Characteristics Section */}
        <div className="px-6 py-4 bg-muted/30">
          <h4 className="text-sm font-semibold text-foreground">Transfer Characteristics</h4>
        </div>
        
        {/* Transfer Use Case */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Transfer Use Case
          </label>
          <div className="text-sm">
            {merchant.transferUseCase}
          </div>
        </div>

        {/* Transfer Volume */}
        <div className="flex items-center px-6 py-4">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Transfer Volume
          </label>
          <div className="text-sm">
            {merchant.transferVolume}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { CheckCircle, XCircle, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MerchantData } from '../../../../types/merchant';

interface MerchantStatusInfoCardProps {
  merchant: MerchantData;
}

export function MerchantStatusInfoCard({ merchant }: MerchantStatusInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="size-5" />
          Merchant Status & Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Production</span>
            <Badge 
              variant={merchant.productionStatus?.status === 'active' ? 'success' : 'secondary'}
              className="flex items-center gap-1"
            >
              {merchant.productionStatus?.status === 'active' ? (
                <CheckCircle className="size-3" />
              ) : (
                <XCircle className="size-3" />
              )}
              {merchant.productionStatus?.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Sandbox</span>
            <Badge 
              variant={merchant.sandboxStatus?.status === 'active' ? 'success' : 'destructive'}
              className="flex items-center gap-1"
            >
              {merchant.sandboxStatus?.status === 'active' ? (
                <CheckCircle className="size-3" />
              ) : (
                <XCircle className="size-3" />
              )}
              {merchant.sandboxStatus?.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
        
        <Separator />
        
        {/* Date Information */}
        <div className="space-y-3">
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Created Date</span>
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="size-3" />
                {merchant.registeredDate?.date || 'N/A'}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-3" />
                {merchant.registeredDate?.time || 'N/A'} ({merchant.registeredDate?.timezone || 'N/A'})
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Updated Date</span>
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="size-3" />
                {merchant.updatedDate?.date || 'N/A'}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-3" />
                {merchant.updatedDate?.time || 'N/A'} ({merchant.updatedDate?.timezone || 'N/A'})
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

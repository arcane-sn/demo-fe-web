'use client';

import { format, parse, isValid } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/reusable/StatusBadge';
import { MerchantData } from '../../../types/merchant';

interface MerchantStatusInfoCardProps {
  merchant: MerchantData;
}

function formatDate(dateString: string): string {
  try {
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    if (isValid(date)) {
      return format(date, 'EEE, MMM dd, yyyy');
    }
    return dateString;
  } catch {
    return dateString;
  }
}

export function MerchantStatusInfoCard({ merchant }: MerchantStatusInfoCardProps) {
  const formattedCreatedDate = merchant.registeredDate?.date 
    ? formatDate(merchant.registeredDate.date) 
    : 'N/A';
  const formattedUpdatedDate = merchant.updatedDate?.date 
    ? formatDate(merchant.updatedDate.date) 
    : 'N/A';

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Merchant Status & Info
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Status Section */}
        <div className="space-y-0">
          {/* Production */}
          <div className="flex items-center px-6 py-4">
            <label className="w-48 text-sm font-medium text-muted-foreground">
              Production
            </label>
            <div className="flex items-center">
              <StatusBadge 
              variant={merchant.productionStatus?.status === 'active' ? 'success' : 'secondary'}
                size="sm"
            >
              {merchant.productionStatus?.status === 'active' ? 'Active' : 'Inactive'}
              </StatusBadge>
            </div>
          </div>
          
          {/* Sandbox */}
          <div className="flex items-center px-6 py-2">
            <label className="w-48 text-sm font-medium text-muted-foreground">
              Sandbox
            </label>
            <div className="flex items-center">
              <StatusBadge 
              variant={merchant.sandboxStatus?.status === 'active' ? 'success' : 'destructive'}
                size="sm"
            >
              {merchant.sandboxStatus?.status === 'active' ? 'Active' : 'Inactive'}
              </StatusBadge>
            </div>
          </div>
        </div>
        
        {/* Date Information */}
        <div className="space-y-0">
          {/* Created Date */}
          <div className="flex items-start px-6 py-2">
            <label className="w-48 text-sm font-medium text-muted-foreground pt-2">
              Created Date
            </label>
            <div className="flex-1 text-sm space-y-1">
              <div>
                {formattedCreatedDate}
              </div>
              <div className="text-muted-foreground text-[10px]">
                {merchant.registeredDate?.time || 'N/A'} {merchant.registeredDate?.timezone ? `(${merchant.registeredDate.timezone})` : ''}
              </div>
            </div>
          </div>
          
          {/* Updated Date */}
          <div className="flex items-start px-6 py-2">
            <label className="w-48 text-sm font-medium text-muted-foreground pt-1">
              Updated Date
            </label>
            <div className="flex-1 text-sm space-y-1">
              <div>
                {formattedUpdatedDate}
              </div>
              <div className="text-muted-foreground text-[10px]">
                {merchant.updatedDate?.time || 'N/A'} {merchant.updatedDate?.timezone ? `(${merchant.updatedDate.timezone})` : ''}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

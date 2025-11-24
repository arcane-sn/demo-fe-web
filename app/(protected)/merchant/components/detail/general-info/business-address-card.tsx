'use client';

import { Copy, Check } from 'lucide-react';
import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MerchantData } from '../../../types/merchant';
import { useClipboard } from '../core/hooks/use-clipboard';

interface BusinessAddressCardProps {
  merchant: MerchantData;
}

export function BusinessAddressCard({ merchant }: BusinessAddressCardProps) {
  const { copied, copy, isCopied } = useClipboard();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          Business Address
        </CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {/* Business Address */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Business Address
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm">{merchant.address}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(merchant.address, 'address')}
              className="h-8 px-2"
            >
              {isCopied('address') ? (
                <Check className="size-3 text-green-600" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          </div>
        </div>

        {/* Country */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Country
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm">🇮🇩</span>
            <span className="text-sm">{merchant.country}</span>
          </div>
        </div>

        {/* Province */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Province
          </label>
          <div className="text-sm">
            {merchant.province}
          </div>
        </div>

        {/* City */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            City
          </label>
          <div className="text-sm">
            {merchant.city}
          </div>
        </div>

        {/* District */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            District
          </label>
          <div className="text-sm">
            {merchant.district}
          </div>
        </div>

        {/* Sub-District */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Sub-District
          </label>
          <div className="text-sm">
            {merchant.subDistrict}
          </div>
        </div>

        {/* Postal Code */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Postal Code
          </label>
          <div className="text-sm">
            {merchant.postalCode}
          </div>
        </div>

        {/* Legal Address */}
        <div className="flex items-center px-6 py-4">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Legal Address
          </label>
          <div className="text-sm">
            {merchant.legalAddressSame ? 'Same as business address' : 'Different from business address'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

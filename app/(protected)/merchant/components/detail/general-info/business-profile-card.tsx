'use client';

import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MerchantData } from '../../../types/merchant';
import { useClipboard } from '../core/hooks/use-clipboard';
import { formatPhoneNumber, formatWebsite } from '../core/utils/formatters';

interface BusinessProfileCardProps {
  merchant: MerchantData;
}

export function BusinessProfileCard({ merchant }: BusinessProfileCardProps) {
  const { copied, copy, isCopied } = useClipboard();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Business Profile
        </CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {/* Client ID */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Client ID
          </label>
          <div className="flex items-center gap-2">
            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
              {merchant.clientId}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(merchant.clientId, 'clientId')}
              className="h-8 px-2"
            >
              {isCopied('clientId') ? (
                <Check className="size-3 text-green-600" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          </div>
        </div>

        {/* Company Name */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Company Name
          </label>
          <div className="text-sm">
            {merchant.companyName}
          </div>
        </div>

        {/* Brand Name */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Brand Name
          </label>
          <div className="text-sm">
            {merchant.brandName}
          </div>
        </div>

        {/* Business Phone Number */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Business Phone Number
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm">{formatPhoneNumber(merchant.phoneNumber)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(merchant.phoneNumber || '', 'phone')}
              className="h-8 px-2"
            >
              {isCopied('phone') ? (
                <Check className="size-3 text-green-600" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          </div>
        </div>

        {/* Business Email */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Business Email
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm">{merchant.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(merchant.email, 'email')}
              className="h-8 px-2"
            >
              {isCopied('email') ? (
                <Check className="size-3 text-green-600" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          </div>
        </div>

        {/* Business Type */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Business Type
          </label>
          <div className="text-sm">
            {merchant.businessType}
          </div>
        </div>

        {/* Business Industry */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Business Industry
          </label>
          <div className="text-sm">
            {merchant.businessIndustry}
          </div>
        </div>

        {/* Business Website */}
        <div className="flex items-center px-6 py-4">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Business Website
          </label>
          <div className="flex items-center gap-2">
            <a 
              href={merchant.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {formatWebsite(merchant.website)}
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(merchant.website || '', 'website')}
              className="h-8 px-2"
            >
              {isCopied('website') ? (
                <Check className="size-3 text-green-600" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

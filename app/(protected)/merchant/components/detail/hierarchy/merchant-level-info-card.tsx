'use client';

import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MerchantLevelInfo } from './types';
import { useClipboard } from '../core/hooks/use-clipboard';

interface MerchantLevelInfoCardProps {
  data: MerchantLevelInfo;
}

export function MerchantLevelInfoCard({ data }: MerchantLevelInfoCardProps) {
  const { copied, copy, isCopied } = useClipboard();

  return (
    <Card id="merchant-level-info">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg ">
          Merchant Level Info
        </CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {/* Merchant Level */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Merchant Level
          </label>
          <div className="text-sm font-medium">
            {data.merchantLevel}
          </div>
        </div>

        {/* Parent Merchant ID */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Parent Merchant ID
          </label>
          <div className="flex items-center gap-2">
            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
              {data.parentMerchantId}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(data.parentMerchantId || '', 'parentId')}
              className="h-8 px-2"
            >
              {isCopied('parentId') ? (
                <Check className="size-3 text-green-600" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          </div>
        </div>

        {/* Parent Merchant */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Parent Merchant
          </label>
          <div className="text-sm font-medium">
            {data.parentMerchant}
          </div>
        </div>

        {/* Parent Merchant Level */}
        <div className="flex items-center px-6 py-4">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Parent Merchant Level
          </label>
          <div className="text-sm font-medium">
            {data.parentMerchantLevel}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

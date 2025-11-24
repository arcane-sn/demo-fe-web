'use client';

import { Copy, Check } from 'lucide-react';
import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MerchantData } from '../../../types/merchant';
import { useClipboard } from '../core/hooks/use-clipboard';
import { formatAccountNumber } from '../core/utils/formatters';

interface BankInfoCardProps {
  merchant: MerchantData;
}

export function BankInfoCard({ merchant }: BankInfoCardProps) {
  const { copied, copy, isCopied } = useClipboard();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Bank Info
        </CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3">
          {/* Bank Icon */}
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
            <KeenIcon icon="bank" style="outline" className="text-lg text-muted-foreground" />
          </div>
          
          {/* All Data on the Right */}
          <div className="flex-1">
            {/* Bank Name and Code */}
            <p className="text-sm font-medium">
              {merchant.bankName} / {merchant.bankCode}
            </p>
            
            {/* Account Number */}
            <div className="flex items-center gap-2">
              <p className="text-sm ">
                {formatAccountNumber(merchant.accountNumber)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copy(merchant.accountNumber || '', 'accountNumber')}
                className="h-8 px-2"
              >
                {isCopied('accountNumber') ? (
                  <Check className="size-3 text-green-600" />
                ) : (
                  <Copy className="size-3" />
                )}
              </Button>
            </div>
            
            {/* Account Holder Name */}
            <p className="text-sm">{merchant.accountName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

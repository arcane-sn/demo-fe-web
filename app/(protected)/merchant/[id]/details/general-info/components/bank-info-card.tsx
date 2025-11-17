'use client';

import { CreditCard, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MerchantData } from '../../../../types/merchant';
import { useClipboard } from '../../core/hooks/use-clipboard';
import { formatAccountNumber } from '../../core/utils/formatters';

interface BankInfoCardProps {
  merchant: MerchantData;
}

export function BankInfoCard({ merchant }: BankInfoCardProps) {
  const { copied, copy, isCopied } = useClipboard();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="size-5" />
          Bank Info
        </CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Bank Icon and Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <CreditCard className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">
                {merchant.bankName} / {merchant.bankCode}
              </p>
            </div>
          </div>
          
          {/* Account Number */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Account Number</label>
            <div className="flex items-center gap-2">
              <p className="text-sm font-mono flex-1">
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
          </div>
          
          {/* Account Holder Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Account Holder Name</label>
            <p className="text-sm">{merchant.accountName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

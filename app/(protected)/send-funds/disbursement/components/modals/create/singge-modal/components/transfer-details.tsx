"use client";

import { AlertCircle } from 'lucide-react';
import { Input, InputGroup } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TransferDetailsProps {
  minimumAmount?: string;
  partnerReference: string;
  transferAmount: string;
  errors?: {
    partnerRef?: string;
    transferAmount?: string;
  };
  onAmountChange?: (amount: string) => void;
  onPartnerRefChange?: (ref: string) => void;
}

export function TransferDetails({ 
  minimumAmount = 'IDR 15.000',
  partnerReference,
  transferAmount,
  errors,
  onAmountChange,
  onPartnerRefChange,
}: TransferDetailsProps) {
  const handleAmountChange = (amount: string) => {
    onAmountChange?.(amount);
  };

  const handlePartnerRefChange = (ref: string) => {
    onPartnerRefChange?.(ref);
  };

  return (
    <Card>
      <CardHeader id="transfer_details">
        <CardTitle>Transfer Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full items-center gap-1 max-w-56">
            Partner Reference Number
          </Label>
          <div className="grow">
            <InputGroup className="relative">
            <Input
              id="partner-ref"
                value={partnerReference}
              onChange={(e) => handlePartnerRefChange(e.target.value)}
                placeholder="Input partner reference number"
                aria-invalid={Boolean(errors?.partnerRef)}
                className={cn(errors?.partnerRef && 'border-destructive text-destructive pr-10')}
              />
              {errors?.partnerRef && (
                <AlertCircle className="size-4 text-destructive absolute right-3 top-1/2 -translate-y-1/2" />
              )}
            </InputGroup>
            {errors?.partnerRef && (
              <p className="text-xs text-destructive mt-1">{errors.partnerRef}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full items-center gap-1 max-w-56">
            Transfer Amount
          </Label>
          <div className="grow">
            <InputGroup className="relative">
            <Input
              id="transfer-amount"
              value={transferAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="Input transfer amount"
                aria-invalid={Boolean(errors?.transferAmount)}
                className={cn(errors?.transferAmount && 'border-destructive text-destructive pr-10')}
              />
              {errors?.transferAmount && (
                <AlertCircle className="size-4 text-destructive absolute right-3 top-1/2 -translate-y-1/2" />
              )}
            </InputGroup>
            <p
              className={cn(
                'text-xs mt-1',
                errors?.transferAmount ? 'text-destructive' : 'text-muted-foreground',
              )}
            >
              {errors?.transferAmount ? errors.transferAmount : `Minimum amount is ${minimumAmount}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TransactionItem } from '../../../../types/batch-detail';

interface EditTransferDetailsProps {
  transaction?: TransactionItem;
  onPartnerRefChange?: (ref: string) => void;
  onAmountChange?: (amount: string) => void;
}

export function EditTransferDetails({ 
  transaction,
  onPartnerRefChange,
  onAmountChange 
}: EditTransferDetailsProps) {
  const partnerRef = transaction?.partnerReferenceNumber || '';
  const transferAmount = transaction?.transferAmount || '';

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
          <Input
            id="partner-ref"
            value={partnerRef}
            onChange={(e) => handlePartnerRefChange(e.target.value)}
            placeholder="Enter partner reference number"
          />
        </div>
        
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full items-center gap-1 max-w-56">
            Transfer Amount
          </Label>
          <div className="grow">
            <Input
              id="transfer-amount"
              value={transferAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="Enter transfer amount"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum amount is IDR 15.000
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


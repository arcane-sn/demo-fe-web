"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TransactionItem } from '../../../../types/batch-detail';

interface EditOtherDetailsProps {
  transaction?: TransactionItem;
  onRemarkChange?: (remark: string) => void;
  onEmailChange?: (email: string) => void;
}

export function EditOtherDetails({ 
  transaction,
  onRemarkChange,
  onEmailChange 
}: EditOtherDetailsProps) {
  const remark = transaction?.remark || '';
  const emailTo = transaction?.sendToEmail || '';

  return (
    <Card>
      <CardHeader id="other_details">
        <CardTitle>Other Details (Optional)</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full items-center gap-1 max-w-56">
            Remark
          </Label>
          <Input
            id="remark"
            value={remark}
            onChange={(e) => onRemarkChange?.(e.target.value)}
            placeholder="Enter remark"
          />
        </div>
        
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full items-center gap-1 max-w-56">
            Email To
          </Label>
          <div className="grow">
            <Input
              id="email-to"
              value={emailTo}
              onChange={(e) => onEmailChange?.(e.target.value)}
              placeholder="Enter email address"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Required if want to send notification via email
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


"use client";

import { AlertCircle } from 'lucide-react';
import { Input, InputAddon, InputGroup } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface BeneficiaryBankDetailsProps {
  bankName: string;
  accountNumber: string;
  errors?: {
    bankName?: string;
    accountNumber?: string;
  };
  onBankNameChange?: (value: string) => void;
  onAccountNumberChange?: (value: string) => void;
  onAccountInquiry?: () => void;
}

export function BeneficiaryBankDetails({
  bankName,
  accountNumber,
  errors,
  onBankNameChange,
  onAccountNumberChange,
  onAccountInquiry,
}: BeneficiaryBankDetailsProps) {
  return (
    <Card>
      <CardHeader id="beneficiary_bank_details" className="flex flex-row items-center justify-between">
        <CardTitle>Beneficiary Bank Details</CardTitle>
        <Badge variant="destructive" appearance="outline" className="text-xs">
          Mandatory Account Inquiry
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full items-center gap-1 max-w-56">
            Bank Name
          </Label>
          <div className="grow">
            <div className="relative">
              <Select value={bankName} onValueChange={onBankNameChange}>
                <SelectTrigger
                  aria-invalid={Boolean(errors?.bankName)}
                  className={cn(errors?.bankName && 'border-destructive text-destructive pr-10')}
                >
                  <SelectValue placeholder="Choose or search bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACB">ACB</SelectItem>
                <SelectItem value="BCA">BCA</SelectItem>
                <SelectItem value="BNI">BNI</SelectItem>
                <SelectItem value="BRI">BRI</SelectItem>
              </SelectContent>
            </Select>
              {errors?.bankName && (
                <AlertCircle className="size-4 text-destructive absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              )}
            </div>
            {errors?.bankName ? (
              <p className="text-xs text-destructive mt-1">{errors.bankName}</p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">Please select an option</p>
            )}
          </div>
        </div>
        
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className=" w-full items-center gap-1 max-w-56">
            Account Number
          </Label>
          <div className="grow space-y-3">
            <InputGroup className="relative">
            <Input
                id="account-number"
                value={accountNumber}
                onChange={(e) => onAccountNumberChange?.(e.target.value)}
                placeholder="Input account number"
                aria-invalid={Boolean(errors?.accountNumber)}
                className={cn(errors?.accountNumber && 'border-destructive text-destructive pr-10')}
              />
              {errors?.accountNumber && (
                <AlertCircle className="size-4 text-destructive absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              )}
            </InputGroup>
            {errors?.accountNumber && (
              <p className="text-xs text-destructive mt-1">{errors.accountNumber}</p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onAccountInquiry}
              className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10"
            >
                Account Inquiry
            </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

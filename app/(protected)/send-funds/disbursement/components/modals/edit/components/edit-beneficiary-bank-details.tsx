"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
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
import { KeenIcon } from '@/components/keenicons';
import type { TransactionItem } from '../../../../types/batch-detail';

interface EditBeneficiaryBankDetailsProps {
  transaction?: TransactionItem;
  onBankNameChange?: (bankName: string) => void;
  onAccountNumberChange?: (accountNumber: string) => void;
  onAccountInquiry?: () => void;
  hasError?: boolean;
  errorMessage?: string;
}

export function EditBeneficiaryBankDetails({ 
  transaction,
  onBankNameChange,
  onAccountNumberChange,
  onAccountInquiry,
  hasError = false,
  errorMessage = "Account Invalid. Please double-check the beneficiary account details and retry the account inquiry"
}: EditBeneficiaryBankDetailsProps) {
  const [bankName, setBankName] = useState(transaction?.bankName || '');
  const [accountNumber, setAccountNumber] = useState(transaction?.accountNumber || '');

  const handleBankNameChange = (value: string) => {
    setBankName(value);
    onBankNameChange?.(value);
  };

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    onAccountNumberChange?.(value);
  };

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
            <Select value={bankName} onValueChange={handleBankNameChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACB">ACB</SelectItem>
                <SelectItem value="BCA">BCA</SelectItem>
                <SelectItem value="BNI">BNI</SelectItem>
                <SelectItem value="BRI">BRI</SelectItem>
                <SelectItem value="Mandiri">Mandiri</SelectItem>
                <SelectItem value="CIMB">CIMB</SelectItem>
                <SelectItem value="Maybank">Maybank</SelectItem>
                <SelectItem value="OCBC">OCBC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full items-center gap-1 max-w-56">
            Account Number
          </Label>
          <div className="grow">
            <Input
              id="account-number"
              value={accountNumber}
              onChange={(e) => handleAccountNumberChange(e.target.value)}
              placeholder="Enter account number"
            />
            <Button
              className="p-3 h-10 text-blue-600 bg-blue-100 border border-blue-600 hover:text-blue-700 mt-2"
              onClick={onAccountInquiry}
            >
              Account Inquiry
            </Button>
            
          </div>
        </div>
        {hasError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-600 rounded-md flex items-start gap-2">
                <KeenIcon
                  icon="cross-circle"
                  style="outline"
                  className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-red-800">{errorMessage}</p>
              </div>
            )}
      </CardContent>
    </Card>
  );
}


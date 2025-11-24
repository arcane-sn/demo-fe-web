'use client';

import { useState } from 'react';
import { RangeInput } from '@/components/ui/floating-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { KeenIcon } from '@/components/keenicons';

interface RateDetailsSectionProps {
  bankData?: any;
  editMode: 'single' | 'selected' | 'all';
}

export function RateDetailsSection({ bankData, editMode }: RateDetailsSectionProps) {
  const [providerRateLeft, setProviderRateLeft] = useState('0.2');
  const [providerRateRight, setProviderRateRight] = useState('0');
  const [merchantRateLeft, setMerchantRateLeft] = useState('0.2');
  const [merchantRateRight, setMerchantRateRight] = useState('0');
  const [flypayRateLeft, setFlypayRateLeft] = useState('0.1');
  const [flypayRateRight, setFlypayRateRight] = useState('0');
  
  // Focus states for percentage fields
  const [providerRateLeftFocused, setProviderRateLeftFocused] = useState(false);
  const [merchantRateLeftFocused, setMerchantRateLeftFocused] = useState(false);
  const [flypayRateLeftFocused, setFlypayRateLeftFocused] = useState(false);

  // Helper function for percentage input (max 100, allow 0.)
  const handlePercentageChange = (value: string, setter: (value: string) => void) => {
    let cleaned = value.replace(/%/g, '').replace(/[^\d.]/g, '');
    
    // Allow "0." to be entered
    if (cleaned === '0.') {
      setter('0.');
      return;
    }
    
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts.length === 2 && parts[1].length > 2) {
      cleaned = parts[0] + '.' + parts[1].substring(0, 2);
    }
    const numValue = parseFloat(cleaned);
    if (!isNaN(numValue) && numValue > 100) {
      cleaned = '100';
    }
    setter(cleaned || '0');
  };

  // Helper function for IDR currency input
  const handleCurrencyChange = (value: string, setter: (value: string) => void) => {
    const numericValue = value.replace(/[^\d]/g, '');
    setter(numericValue || '0');
  };

  // Format percentage for display (add % when not focused, remove when focused)
  const formatPercentage = (value: string, isFocused: boolean): string => {
    if (!value || value === '0') return '';
    return isFocused ? value : value + '%';
  };

  // Format currency for display
  const formatCurrency = (value: string): string => {
    if (!value || value === '0') return '';
    const numValue = parseInt(value);
    if (isNaN(numValue)) return '';
    return 'IDR ' + numValue.toLocaleString('id-ID');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Rate Details (Optional)
        </CardTitle>
        <p className="text-sm text-gray-600">Setup rate for reporting</p>
      </CardHeader>
      <CardContent>
        <Table className="[&_tr]:border-0">
          <TableBody>
            <TableRow className="hover:!bg-transparent">
              <TableCell className="w-1/3">
                <Label>Provider Rate</Label>
              </TableCell>
              <TableCell>
                <div className="space-y-3">
                  <RangeInput
                    leftLabel="Percentage Price"
                    rightLabel="Fixed Price"
                    leftValue={formatPercentage(providerRateLeft, providerRateLeftFocused)}
                    rightValue={formatCurrency(providerRateRight)}
                    onLeftChange={(value) => handlePercentageChange(value, setProviderRateLeft)}
                    onRightChange={(value) => handleCurrencyChange(value, setProviderRateRight)}
                    onLeftFocus={() => setProviderRateLeftFocused(true)}
                    onLeftBlur={() => setProviderRateLeftFocused(false)}
                    leftPlaceholder="0.2%"
                    rightPlaceholder="IDR 0"
                    separator="plus"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="provider-rate-show" 
                      defaultChecked 
                      className="rounded"
                    />
                    <label 
                      htmlFor="provider-rate-show" 
                      className="text-sm font-medium text-gray-700"
                    >
                      Show this rate to this merchant
                    </label>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="hover:!bg-transparent">
              <TableCell className="w-1/3">
                <Label>Merchant Rate</Label>
              </TableCell>
              <TableCell>
                <div className="space-y-3">
                  <RangeInput
                    leftLabel="Percentage Price"
                    rightLabel="Fixed Price"
                    leftValue={formatPercentage(merchantRateLeft, merchantRateLeftFocused)}
                    rightValue={formatCurrency(merchantRateRight)}
                    onLeftChange={(value) => handlePercentageChange(value, setMerchantRateLeft)}
                    onRightChange={(value) => handleCurrencyChange(value, setMerchantRateRight)}
                    onLeftFocus={() => setMerchantRateLeftFocused(true)}
                    onLeftBlur={() => setMerchantRateLeftFocused(false)}
                    leftPlaceholder="0.2%"
                    rightPlaceholder="IDR 0"
                    separator="plus"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="merchant-rate-show" 
                      defaultChecked 
                      className="rounded"
                    />
                    <label 
                      htmlFor="merchant-rate-show" 
                      className="text-sm font-medium text-gray-700"
                    >
                      Show this rate to this merchant
                    </label>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="hover:!bg-transparent">
              <TableCell className="w-1/3">
                <Label>Flypay Rate (Excluded)</Label>
              </TableCell>
              <TableCell>
                <div className="space-y-3">
                  <RangeInput
                    leftLabel="Percentage Price"
                    rightLabel="Fixed Price"
                    leftValue={formatPercentage(flypayRateLeft, flypayRateLeftFocused)}
                    rightValue={formatCurrency(flypayRateRight)}
                    onLeftChange={(value) => handlePercentageChange(value, setFlypayRateLeft)}
                    onRightChange={(value) => handleCurrencyChange(value, setFlypayRateRight)}
                    onLeftFocus={() => setFlypayRateLeftFocused(true)}
                    onLeftBlur={() => setFlypayRateLeftFocused(false)}
                    leftPlaceholder="0.1%"
                    rightPlaceholder="IDR 0"
                    separator="plus"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="flypay-rate-show" 
                      defaultChecked 
                      className="rounded"
                    />
                    <label 
                      htmlFor="flypay-rate-show" 
                      className="text-sm font-medium text-gray-700"
                    >
                      Show this rate to this merchant
                    </label>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

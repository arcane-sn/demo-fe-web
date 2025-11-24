'use client';

import { useState } from 'react';
import { RangeInput } from '@/components/ui/floating-input';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { KeenIcon } from '@/components/keenicons';

interface SalesReferralSectionProps {
  bankData?: any;
  editMode: 'single' | 'selected' | 'all';
}

export function SalesReferralSection({ bankData, editMode }: SalesReferralSectionProps) {
  const [salesId, setSalesId] = useState('johndoe01');
  const [salesFeeLeft, setSalesFeeLeft] = useState('1.5');
  const [salesFeeRight, setSalesFeeRight] = useState('0');
  const [salesFeeLeftFocused, setSalesFeeLeftFocused] = useState(false);

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
          Sales Referral (Optional)
        </CardTitle>
        <p className="text-sm text-gray-600">Setup referral fee for sales</p>
      </CardHeader>
      <CardContent>
        <Table className="[&_tr]:border-0">
          <TableBody>
            <TableRow className="hover:!bg-transparent">
              <TableCell className="w-1/3">
                <Label>Sales ID</Label>
              </TableCell>
              <TableCell>
                <Input
                  value={salesId}
                  onChange={(e) => setSalesId(e.target.value)}
                  placeholder="johndoe01"
                  className="max-w-md"
                />
              </TableCell>
            </TableRow>
            <TableRow className="hover:!bg-transparent">
              <TableCell className="w-1/3">
                <Label>Sales Fee</Label>
              </TableCell>
              <TableCell>
                <RangeInput
                  leftLabel="Percentage Price"
                  rightLabel="Fixed Price"
                  leftValue={formatPercentage(salesFeeLeft, salesFeeLeftFocused)}
                  rightValue={formatCurrency(salesFeeRight)}
                  onLeftChange={(value) => handlePercentageChange(value, setSalesFeeLeft)}
                  onRightChange={(value) => handleCurrencyChange(value, setSalesFeeRight)}
                  onLeftFocus={() => setSalesFeeLeftFocused(true)}
                  onLeftBlur={() => setSalesFeeLeftFocused(false)}
                  leftPlaceholder="1.5%"
                  rightPlaceholder="IDR 0"
                  separator="plus"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


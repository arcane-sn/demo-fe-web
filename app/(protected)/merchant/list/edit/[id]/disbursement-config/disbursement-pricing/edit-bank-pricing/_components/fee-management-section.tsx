'use client';

import { useState } from 'react';
import { RangeInput } from '@/components/ui/floating-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { KeenIcon } from '@/components/keenicons';

interface FeeManagementSectionProps {
  bankData?: any;
  editMode: 'single' | 'selected' | 'all';
}

export function FeeManagementSection({ bankData, editMode }: FeeManagementSectionProps) {
  // Transfer Fee state
  const [feeTransferLeft, setFeeTransferLeft] = useState('0');
  const [feeTransferRight, setFeeTransferRight] = useState('0');
  const [feeTransferToVALeft, setFeeTransferToVALeft] = useState('0');
  const [feeTransferToVARight, setFeeTransferToVARight] = useState('0');
  
  // Inquiry Fee state
  const [feeInquiryLeft, setFeeInquiryLeft] = useState('0');
  const [feeInquiryRight, setFeeInquiryRight] = useState('0');
  const [feeInquiryToVALeft, setFeeInquiryToVALeft] = useState('0');
  const [feeInquiryToVARight, setFeeInquiryToVARight] = useState('0');

  // Focus states for percentage fields
  const [feeTransferLeftFocused, setFeeTransferLeftFocused] = useState(false);
  const [feeTransferToVALeftFocused, setFeeTransferToVALeftFocused] = useState(false);
  const [feeInquiryLeftFocused, setFeeInquiryLeftFocused] = useState(false);
  const [feeInquiryToVALeftFocused, setFeeInquiryToVALeftFocused] = useState(false);

  // Helper function for percentage input (max 100, allow 0.)
  const handlePercentageChange = (value: string, setter: (value: string) => void) => {
    // Remove % and non-numeric characters except decimal point
    let cleaned = value.replace(/%/g, '').replace(/[^\d.]/g, '');
    
    // Allow "0." to be entered
    if (cleaned === '0.') {
      setter('0.');
      return;
    }
    
    // Handle decimal point (only one, max 2 decimal places)
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts.length === 2 && parts[1].length > 2) {
      cleaned = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    // Validate max 100
    const numValue = parseFloat(cleaned);
    if (!isNaN(numValue) && numValue > 100) {
      cleaned = '100';
    }
    
    // Store raw number (without %)
    setter(cleaned || '0');
  };

  // Helper function for IDR currency input (format with thousand separators)
  const handleCurrencyChange = (value: string, setter: (value: string) => void) => {
    // Remove all non-numeric characters (IDR, spaces, dots, commas, thousand separators)
    const numericValue = value.replace(/[^\d]/g, '');
    setter(numericValue || '0');
  };

  // Format percentage for display (add % when not focused, remove when focused)
  const formatPercentage = (value: string, isFocused: boolean): string => {
    if (!value || value === '0') return '';
    // When focused, show without % to allow easy deletion
    // When not focused, show with % for visual clarity
    return isFocused ? value : value + '%';
  };

  // Format currency for display (add IDR and thousand separators)
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
          Fee Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Transfer Fee */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">Transfer Fee</h4>
            <Table className="[&_tr]:border-0">
              <TableBody>
                <TableRow className="hover:!bg-transparent">
                  <TableCell className="w-1/3">
                    <Label>Fee Transfer</Label>
                  </TableCell>
                  <TableCell>
                    <RangeInput
                      leftLabel="Percentage Price"
                      rightLabel="Fixed Price"
                      leftValue={formatPercentage(feeTransferLeft, feeTransferLeftFocused)}
                      rightValue={formatCurrency(feeTransferRight)}
                      onLeftChange={(value) => handlePercentageChange(value, setFeeTransferLeft)}
                      onRightChange={(value) => handleCurrencyChange(value, setFeeTransferRight)}
                      onLeftFocus={() => setFeeTransferLeftFocused(true)}
                      onLeftBlur={() => setFeeTransferLeftFocused(false)}
                      leftPlaceholder="0%"
                      rightPlaceholder="IDR 0"
                      separator="plus"
                    />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:!bg-transparent">
                  <TableCell className="w-1/3">
                    <Label>Fee Transfer to VA</Label>
                  </TableCell>
                  <TableCell>
                    <RangeInput
                      leftLabel="Percentage Price"
                      rightLabel="Fixed Price"
                      leftValue={formatPercentage(feeTransferToVALeft, feeTransferToVALeftFocused)}
                      rightValue={formatCurrency(feeTransferToVARight)}
                      onLeftChange={(value) => handlePercentageChange(value, setFeeTransferToVALeft)}
                      onRightChange={(value) => handleCurrencyChange(value, setFeeTransferToVARight)}
                      onLeftFocus={() => setFeeTransferToVALeftFocused(true)}
                      onLeftBlur={() => setFeeTransferToVALeftFocused(false)}
                      leftPlaceholder="0%"
                      rightPlaceholder="IDR 0"
                      separator="plus"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Inquiry Fee */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">Inquiry Fee</h4>
            <Table className="[&_tr]:border-0">
              <TableBody>
                <TableRow className="hover:!bg-transparent">
                  <TableCell className="w-1/3">
                    <Label>Fee Inquiry</Label>
                  </TableCell>
                  <TableCell>
                    <RangeInput
                      leftLabel="Percentage Price"
                      rightLabel="Fixed Price"
                      leftValue={formatPercentage(feeInquiryLeft, feeInquiryLeftFocused)}
                      rightValue={formatCurrency(feeInquiryRight)}
                      onLeftChange={(value) => handlePercentageChange(value, setFeeInquiryLeft)}
                      onRightChange={(value) => handleCurrencyChange(value, setFeeInquiryRight)}
                      onLeftFocus={() => setFeeInquiryLeftFocused(true)}
                      onLeftBlur={() => setFeeInquiryLeftFocused(false)}
                      leftPlaceholder="0%"
                      rightPlaceholder="IDR 0"
                      separator="plus"
                    />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:!bg-transparent">
                  <TableCell className="w-1/3">
                    <Label>Fee Inquiry to VA</Label>
                  </TableCell>
                  <TableCell>
                    <RangeInput
                      leftLabel="Percentage Price"
                      rightLabel="Fixed Price"
                      leftValue={formatPercentage(feeInquiryToVALeft, feeInquiryToVALeftFocused)}
                      rightValue={formatCurrency(feeInquiryToVARight)}
                      onLeftChange={(value) => handlePercentageChange(value, setFeeInquiryToVALeft)}
                      onRightChange={(value) => handleCurrencyChange(value, setFeeInquiryToVARight)}
                      onLeftFocus={() => setFeeInquiryToVALeftFocused(true)}
                      onLeftBlur={() => setFeeInquiryToVALeftFocused(false)}
                      leftPlaceholder="0%"
                      rightPlaceholder="IDR 0"
                      separator="plus"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


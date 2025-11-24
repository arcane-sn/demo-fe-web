'use client';

import { useState } from 'react';
import { RangeInput } from '@/components/ui/floating-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { KeenIcon } from '@/components/keenicons';

interface TransferManagementSectionProps {
  bankData?: any;
  editMode: 'single' | 'selected' | 'all';
}

export function TransferManagementSection({ bankData, editMode }: TransferManagementSectionProps) {
  const [minTransferAmount, setMinTransferAmount] = useState('15000');
  const [maxTransferAmount, setMaxTransferAmount] = useState('100000000');

  // Helper function for IDR currency input
  const handleCurrencyChange = (value: string, setter: (value: string) => void) => {
    const numericValue = value.replace(/[^\d]/g, '');
    setter(numericValue || '0');
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
          Transfer Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="[&_tr]:border-0">
          <TableBody>
            <TableRow className="hover:!bg-transparent">
              <TableCell className="w-1/3">
                <Label>Transfer Limit Amount</Label>
              </TableCell>
              <TableCell>
                <RangeInput
                  leftLabel="Minimum Trf. Amount"
                  rightLabel="Maximum Trf. Amount"
                  leftValue={formatCurrency(minTransferAmount)}
                  rightValue={formatCurrency(maxTransferAmount)}
                  onLeftChange={(value) => handleCurrencyChange(value, setMinTransferAmount)}
                  onRightChange={(value) => handleCurrencyChange(value, setMaxTransferAmount)}
                  leftPlaceholder="IDR 15.000"
                  rightPlaceholder="IDR 100.000.000"
                  separator="minus"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


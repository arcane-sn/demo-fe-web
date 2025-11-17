'use client';

import React, { useState } from 'react';
import { RangeInput } from './floating-input';
import { Label } from './label';
import { Table, TableBody, TableCell, TableRow } from './table';

export function CompactRangeDemo() {
  const [amountData, setAmountData] = useState({
    minimumAmount: 'IDR 15.000',
    maximumAmount: 'IDR 100.000.000',
  });

  const handleAmountChange = (field: 'minimumAmount' | 'maximumAmount', value: string) => {
    setAmountData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Compact Range Input</h2>
        <p className="text-gray-600">
          Komponen RangeInput dengan jarak yang lebih dekat dan warna grey (bukan biru).
        </p>
      </div>

      {/* Table Layout seperti di ChannelDetailSection */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-1/3 font-medium text-gray-700">
                <Label>Amount Limit</Label>
              </TableCell>
              <TableCell>
                <RangeInput
                  leftLabel="Minimum Amount"
                  rightLabel="Maximum Amount"
                  leftValue={amountData.minimumAmount}
                  rightValue={amountData.maximumAmount}
                  leftPlaceholder="IDR 15.000"
                  rightPlaceholder="IDR 100.000.000"
                  separator="minus"
                  onLeftChange={(value) => handleAmountChange('minimumAmount', value)}
                  onRightChange={(value) => handleAmountChange('maximumAmount', value)}
                  size="md"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Different Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Different Sizes (Compact)</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Small Size</p>
            <RangeInput
              leftLabel="Min Amount"
              rightLabel="Max Amount"
              leftValue="IDR 1.000"
              rightValue="IDR 10.000"
              separator="minus"
              size="sm"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Medium Size (Default)</p>
            <RangeInput
              leftLabel="Min Amount"
              rightLabel="Max Amount"
              leftValue="IDR 15.000"
              rightValue="IDR 100.000.000"
              separator="minus"
              size="md"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Large Size</p>
            <RangeInput
              leftLabel="Min Amount"
              rightLabel="Max Amount"
              leftValue="IDR 50.000"
              rightValue="IDR 500.000.000"
              separator="plus"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Current Values Display */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Values:</h4>
        <div className="text-sm text-gray-600">
          <p>Minimum Amount: <span className="font-mono">{amountData.minimumAmount}</span></p>
          <p>Maximum Amount: <span className="font-mono">{amountData.maximumAmount}</span></p>
        </div>
      </div>
    </div>
  );
}

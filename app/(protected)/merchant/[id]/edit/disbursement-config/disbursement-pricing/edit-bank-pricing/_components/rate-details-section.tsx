'use client';

import { RangeInput } from '@/components/ui/floating-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { TrendingUp } from 'lucide-react';

interface RateDetailsSectionProps {
  bankData?: any;
  editMode: 'single' | 'selected' | 'all';
}

export function RateDetailsSection({ bankData, editMode }: RateDetailsSectionProps) {
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
            <TableRow>
              <TableCell className="w-1/3">
                <Label>Provider Rate</Label>
              </TableCell>
              <TableCell>
                <div className="space-y-3">
                  <RangeInput
                    leftLabel="Percentage Price"
                    rightLabel="Fixed Price"
                    leftValue="0.2"
                    rightValue="0"
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
            <TableRow>
              <TableCell className="w-1/3">
                <Label>Merchant Rate</Label>
              </TableCell>
              <TableCell>
                <div className="space-y-3">
                  <RangeInput
                    leftLabel="Percentage Price"
                    rightLabel="Fixed Price"
                    leftValue="0.2"
                    rightValue="0"
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
            <TableRow>
              <TableCell className="w-1/3">
                <Label>Flypay Rate (Excluded)</Label>
              </TableCell>
              <TableCell>
                <div className="space-y-3">
                  <RangeInput
                    leftLabel="Percentage Price"
                    rightLabel="Fixed Price"
                    leftValue="0.1"
                    rightValue="0"
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

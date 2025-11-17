'use client';

import { RangeInput } from '@/components/ui/floating-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';

interface FeeManagementSectionProps {
  bankData?: any;
  editMode: 'single' | 'selected' | 'all';
}

export function FeeManagementSection({ bankData, editMode }: FeeManagementSectionProps) {
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
                <TableRow>
                  <TableCell className="w-1/3">
                    <Label>Fee Transfer</Label>
                  </TableCell>
                  <TableCell>
                    <RangeInput
                      leftLabel="Percentage Price"
                      rightLabel="Fixed Price"
                      leftValue="0"
                      rightValue="0"
                      leftPlaceholder="0%"
                      rightPlaceholder="IDR 0"
                      separator="plus"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-1/3">
                    <Label>Fee Transfer to VA</Label>
                  </TableCell>
                  <TableCell>
                    <RangeInput
                      leftLabel="Percentage Price"
                      rightLabel="Fixed Price"
                      leftValue="0"
                      rightValue="0"
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
                <TableRow>
                  <TableCell className="w-1/3">
                    <Label>Fee Inquiry</Label>
                  </TableCell>
                  <TableCell>
                    <RangeInput
                      leftLabel="Percentage Price"
                      rightLabel="Fixed Price"
                      leftValue="0"
                      rightValue="0"
                      leftPlaceholder="0%"
                      rightPlaceholder="IDR 0"
                      separator="plus"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-1/3">
                    <Label>Fee Inquiry to VA</Label>
                  </TableCell>
                  <TableCell>
                    <RangeInput
                      leftLabel="Percentage Price"
                      rightLabel="Fixed Price"
                      leftValue="0"
                      rightValue="0"
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


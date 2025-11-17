'use client';

import { RangeInput } from '@/components/ui/floating-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft } from 'lucide-react';

interface TransferManagementSectionProps {
  bankData?: any;
  editMode: 'single' | 'selected' | 'all';
}

export function TransferManagementSection({ bankData, editMode }: TransferManagementSectionProps) {
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
            <TableRow>
              <TableCell className="w-1/3">
                <Label>Transfer Limit Amount</Label>
              </TableCell>
              <TableCell>
                <RangeInput
                  leftLabel="Minimum Trf. Amount"
                  rightLabel="Maximum Trf. Amount"
                  leftValue="15000"
                  rightValue="100000000"
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


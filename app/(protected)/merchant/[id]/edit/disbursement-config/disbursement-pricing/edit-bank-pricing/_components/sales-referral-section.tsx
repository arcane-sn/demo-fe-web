'use client';

import { RangeInput } from '@/components/ui/floating-input';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';

interface SalesReferralSectionProps {
  bankData?: any;
  editMode: 'single' | 'selected' | 'all';
}

export function SalesReferralSection({ bankData, editMode }: SalesReferralSectionProps) {
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
            <TableRow>
              <TableCell className="w-1/3">
                <Label>Sales ID</Label>
              </TableCell>
              <TableCell>
                <Input
                  defaultValue="johndoe01"
                  placeholder="johndoe01"
                  className="max-w-md"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/3">
                <Label>Sales Fee</Label>
              </TableCell>
              <TableCell>
                <RangeInput
                  leftLabel="Percentage Price"
                  rightLabel="Fixed Price"
                  leftValue="1.5"
                  rightValue="0"
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


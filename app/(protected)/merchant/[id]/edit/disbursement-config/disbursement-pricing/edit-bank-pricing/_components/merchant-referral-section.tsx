'use client';

import { RangeInput } from '@/components/ui/floating-input';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Store } from 'lucide-react';

interface MerchantReferralSectionProps {
  bankData?: any;
  editMode: 'single' | 'selected' | 'all';
}

export function MerchantReferralSection({ bankData, editMode }: MerchantReferralSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Merchant Referral (Optional)
        </CardTitle>
        <p className="text-sm text-gray-600">Setup referral fee for merchant</p>
      </CardHeader>
      <CardContent>
        <Table className="[&_tr]:border-0">
          <TableBody>
            <TableRow>
              <TableCell className="w-1/3">
                <Label>Merchant ID</Label>
              </TableCell>
              <TableCell>
                <Input
                  defaultValue="FP123123929292"
                  placeholder="FP123123929292"
                  className="max-w-md"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/3">
                <Label>Merchant Fee</Label>
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


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { RangeInput } from '@/components/ui/floating-input';
import { SalesReferral } from '../types';

interface SalesReferralSectionProps {
  data: SalesReferral;
  onChange: (data: Partial<SalesReferral>) => void;
}

export function SalesReferralSection({ data, onChange }: SalesReferralSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Referral (Optional)</CardTitle>
        <p className="text-sm text-gray-600">Setup referral fee for sales</p>
      </CardHeader>
      <CardContent>
        <Table className="[&_tr]:border-0">
          <TableBody>
            <TableRow>
              <TableCell className="w-1/3">
                <Label htmlFor="salesId">Sales ID</Label>
              </TableCell>
              <TableCell>
                <Input
                  id="salesId"
                  value={data.salesId}
                  onChange={(e) => onChange({ salesId: e.target.value })}
                  placeholder="johndoe01"
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
                  leftValue={data.salesFee.percentagePrice}
                  rightValue={data.salesFee.fixedPrice}
                  leftPlaceholder="1.5%"
                  rightPlaceholder="IDR 0"
                  separator="plus"
                  onLeftChange={(value) => onChange({
                    salesFee: { ...data.salesFee, percentagePrice: value }
                  })}
                  onRightChange={(value) => onChange({
                    salesFee: { ...data.salesFee, fixedPrice: value }
                  })}
                  size="md"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
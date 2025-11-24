import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { RangeInput } from '@/components/ui/floating-input';
import { MerchantReferral } from '../types';

interface MerchantReferralSectionProps {
  data: MerchantReferral;
  onChange: (data: Partial<MerchantReferral>) => void;
}

export function MerchantReferralSection({ data, onChange }: MerchantReferralSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Merchant Referral (Optional)</CardTitle>
        <p className="text-sm text-gray-600">Setup referral fee for merchant</p>
      </CardHeader>
      <CardContent>
        <Table className="[&_tr]:border-0">
          <TableBody>
            <TableRow>
              <TableCell className="w-1/3">
                <Label htmlFor="merchantId">Merchant ID</Label>
              </TableCell>
              <TableCell>
                <Input
                  id="merchantId"
                  value={data.merchantId}
                  onChange={(e) => onChange({ merchantId: e.target.value })}
                  placeholder="FP123123929292"
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
                  leftValue={data.merchantFee.percentagePrice}
                  rightValue={data.merchantFee.fixedPrice}
                  leftPlaceholder="1.5%"
                  rightPlaceholder="IDR 0"
                  separator="plus"
                  onLeftChange={(value) => onChange({
                    merchantFee: { ...data.merchantFee, percentagePrice: value }
                  })}
                  onRightChange={(value) => onChange({
                    merchantFee: { ...data.merchantFee, fixedPrice: value }
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
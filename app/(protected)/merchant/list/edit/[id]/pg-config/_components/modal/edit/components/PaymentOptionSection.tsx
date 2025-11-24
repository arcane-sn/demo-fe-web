import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { KeenIcon } from '@/components/keenicons';
import { PaymentOption } from '../types';

interface PaymentOptionSectionProps {
  data: PaymentOption;
  onChange: (data: Partial<PaymentOption>) => void;
}

export function PaymentOptionSection({ data, onChange }: PaymentOptionSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Option</CardTitle>
        <p className="text-sm text-gray-600">At least 1 option is selected</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="open-amount"
                      checked={data.openAmount}
                      onCheckedChange={(checked) => onChange({ openAmount: checked as boolean })}
                    />
                    <Label htmlFor="open-amount" className="flex items-center gap-2">
                      Open Amount
                      <KeenIcon icon="information" style="outline" className="h-4 w-4 text-gray-400" />
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fixed-amount"
                      checked={data.fixedAmount}
                      onCheckedChange={(checked) => onChange({ fixedAmount: checked as boolean })}
                    />
                    <Label htmlFor="fixed-amount" className="flex items-center gap-2">
                      Fixed Amount
                      <KeenIcon icon="information" style="outline" className="h-4 w-4 text-gray-400" />
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="recurring"
                      checked={data.recurring}
                      onCheckedChange={(checked) => onChange({ recurring: checked as boolean })}
                    />
                    <Label htmlFor="recurring" className="flex items-center gap-2">
                      Recurring
                      <KeenIcon icon="information" style="outline" className="h-4 w-4 text-gray-400" />
                    </Label>
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
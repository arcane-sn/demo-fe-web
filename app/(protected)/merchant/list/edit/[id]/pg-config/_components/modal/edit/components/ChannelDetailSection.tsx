import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { RangeInput } from '@/components/ui/floating-input';
import { ChannelDetail } from '../types';

interface ChannelDetailSectionProps {
  data: ChannelDetail;
  onChange: (data: Partial<ChannelDetail>) => void;
}

export function ChannelDetailSection({ data, onChange }: ChannelDetailSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Channel Detail</CardTitle>
      </CardHeader>
      <CardContent>
          <Table className="[&_tr]:border-0">
          <TableBody>
            <TableRow>
              <TableCell className="w-1/3">
                <Label htmlFor="category">Category</Label>
              </TableCell>
              <TableCell>
                <Select value={data.category} onValueChange={(value) => onChange({ category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="QR">QR</SelectItem>
                    <SelectItem value="E-Wallet">E-Wallet</SelectItem>
                    <SelectItem value="Virtual Account">Virtual Account</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>

            {/* Channel */}
            <TableRow>
              <TableCell className="w-1/3">
                <Label htmlFor="channel">Channel</Label>
              </TableCell>
              <TableCell>
                <Select value={data.channel} onValueChange={(value) => onChange({ channel: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DANA">DANA</SelectItem>
                    <SelectItem value="OVO">OVO</SelectItem>
                    <SelectItem value="ShopeePay">ShopeePay</SelectItem>
                    <SelectItem value="Gopay">Gopay</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>

            {/* Channel Mode */}
            <TableRow>
              <TableCell className="w-1/3">
                <Label htmlFor="channelMode">Channel Mode</Label>
              </TableCell>
              <TableCell>
                <Select value={data.channelMode} onValueChange={(value) => onChange({ channelMode: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Close">Close</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>

            {/* Channel Bill Descriptor */}
            <TableRow>
              <TableCell className="w-1/3">
                <Label htmlFor="channelBillDescriptor">Channel Bill Descriptor</Label>
              </TableCell>
              <TableCell>
                <Input
                  id="channelBillDescriptor"
                  value={data.channelBillDescriptor}
                  onChange={(e) => onChange({ channelBillDescriptor: e.target.value })}
                  placeholder="Enter bill descriptor"
                />
              </TableCell>
            </TableRow>

            {/* Amount Limit */}
            <TableRow>
              <TableCell className="w-1/3">
                <Label>Amount Limit</Label>
              </TableCell>
              <TableCell>
                <RangeInput
                  leftLabel="Minimum Amount"
                  rightLabel="Maximum Amount"
                  leftValue={data.minimumAmount}
                  rightValue={data.maximumAmount}
                  leftPlaceholder="IDR 15.000"
                  rightPlaceholder="IDR 100.000.000"
                  separator="minus"
                  onLeftChange={(value) => onChange({ minimumAmount: value })}
                  onRightChange={(value) => onChange({ maximumAmount: value })}
                  size="md"
                />
              </TableCell>
            </TableRow>

            {/* Channel Currency */}
            <TableRow>
              <TableCell className="w-1/3">
                <Label htmlFor="channelCurrency">Channel Currency</Label>
              </TableCell>
              <TableCell>
                <Input
                  id="channelCurrency"
                  value={data.channelCurrency}
                  onChange={(e) => onChange({ channelCurrency: e.target.value })}
                  placeholder="IDR"
                />
              </TableCell>
            </TableRow>

            {/* Settlement Days */}
            <TableRow>
              <TableCell className="w-1/3">
                <Label htmlFor="settlementDays">Settlement Days</Label>
              </TableCell>
              <TableCell>
                <Input
                  id="settlementDays"
                  value={data.settlementDays}
                  onChange={(e) => onChange({ settlementDays: e.target.value })}
                  placeholder="2"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
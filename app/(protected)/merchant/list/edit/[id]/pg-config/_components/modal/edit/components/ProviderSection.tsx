import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Provider } from '../types';

interface ProviderSectionProps {
  data: Provider;
  onChange: (data: Partial<Provider>) => void;
}

export function ProviderSection({ data, onChange }: ProviderSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Provider</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-1/3">
                <Label htmlFor="provider01">Provider 01</Label>
              </TableCell>
              <TableCell>
                <Select value={data.provider01} onValueChange={(value) => onChange({ provider01: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PIRO_01 - NMID11110000022">PIRO_01 - NMID11110000022</SelectItem>
                    <SelectItem value="PIRO_02 - NMID11110000023">PIRO_02 - NMID11110000023</SelectItem>
                    <SelectItem value="PIRO_03 - NMID11110000024">PIRO_03 - NMID11110000024</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
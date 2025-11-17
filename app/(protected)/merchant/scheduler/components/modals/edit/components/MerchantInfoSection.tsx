"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Copy } from 'lucide-react';
import { MerchantInfo } from '../types';

interface MerchantInfoSectionProps {
  merchantInfo: MerchantInfo;
}

export function MerchantInfoSection({ merchantInfo }: MerchantInfoSectionProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <Card>
      <CardHeader id="merchant_info">
        <CardTitle>Merchant Info</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-1/3">
                <span className="text-sm font-medium text-gray-700">Client ID</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-900">{merchantInfo.clientId}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(merchantInfo.clientId)}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="w-1/3">
                <span className="text-sm font-medium text-gray-700">Company Name</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-900">{merchantInfo.companyName}</span>
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="w-1/3">
                <span className="text-sm font-medium text-gray-700">Merchant Name</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-900">{merchantInfo.merchantName}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


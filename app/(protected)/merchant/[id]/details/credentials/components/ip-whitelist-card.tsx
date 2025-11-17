'use client';

import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IPWhitelist } from './types';
import { useClipboard } from '../../core/hooks/use-clipboard';

interface IPWhitelistCardProps {
  data: IPWhitelist[];
}

export function IPWhitelistCard({ data }: IPWhitelistCardProps) {
  const { copied, copy, isCopied } = useClipboard();

  return (
    <Card id="ip-whitelist">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          IP Whitelist
        </CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {data.map((item, index) => (
          <div 
            key={item.id} 
            className={`flex items-center px-6 py-4 ${index < data.length - 1 ? 'border-b border-border' : ''}`}
          >
            <label className="w-48 text-sm font-medium text-muted-foreground">
              IP Whitelist {index + 1}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {item.ipAddress}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copy(item.ipAddress, `ip-${item.id}`)}
                className="h-8 px-2"
              >
                {isCopied(`ip-${item.id}`) ? (
                  <Check className="size-3 text-green-600" />
                ) : (
                  <Copy className="size-3" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

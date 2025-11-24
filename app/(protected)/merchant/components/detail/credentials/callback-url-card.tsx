'use client';

import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CallbackURLGroup } from './types';
import { useClipboard } from '../core/hooks/use-clipboard';

interface CallbackURLCardProps {
  data: CallbackURLGroup[];
}

export function CallbackURLCard({ data }: CallbackURLCardProps) {
  const { copied, copy, isCopied } = useClipboard();

  return (
    <Card id="callback-url">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">
          Callback URL
        </CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {data.map((group, groupIndex) => (
          <div key={group.title} className={groupIndex > 0 ? 'border-t border-border' : ''}>
            {/* Group Title */}
            <div className="px-6 py-3 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-900">{group.title}</h4>
            </div>
            
            {/* Group URLs */}
            {group.urls.map((url, urlIndex) => (
              <div 
                key={url.id} 
                className={`flex items-center px-6 py-4 ${urlIndex < group.urls.length - 1 ? 'border-b border-border' : ''}`}
              >
                <label className="w-48 text-sm font-medium text-muted-foreground">
                  {url.id}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {url.url}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copy(url.url, `url-${url.id}`)}
                    className="h-8 px-2"
                  >
                    {isCopied(`url-${url.id}`) ? (
                      <Check className="size-3 text-green-600" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

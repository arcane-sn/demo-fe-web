'use client';

import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IpWhitelistItem } from '../shared';
import type { IpWhitelistItem as IpWhitelistItemType } from '../../_lib/types';

interface IpWhitelistSectionProps {
  ipWhitelist: IpWhitelistItemType[];
  onDelete: (id: number) => void;
  onAdd: () => void;
  onChange: (id: number, value: string) => void;
}

export function IpWhitelistSection({ 
  ipWhitelist, 
  onDelete, 
  onAdd, 
  onChange 
}: IpWhitelistSectionProps) {
  return (
    <Card id="ip-whitelist">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">IP Whitelist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ipWhitelist.map((item, index) => (
          <IpWhitelistItem
            key={item.id}
            item={item}
            index={index}
            onDelete={onDelete}
            onChange={onChange}
            canDelete={ipWhitelist.length > 1}
          />
        ))}
        
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={onAdd}
            className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal"
          >
            <KeenIcon icon="plus" style="outline" className="h-4 w-4 mr-1" />
            Add More Field
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { IpWhitelistItemProps } from '../../_lib/types';

export function IpWhitelistItem({ 
  item, 
  index, 
  onDelete, 
  onChange, 
  canDelete 
}: IpWhitelistItemProps) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={`ip-${item.id}`} className="text-sm font-normal text-gray-700">
        IP Whitelist {index + 1}
      </Label>
      <div className="flex items-center">
        <Input
          id={`ip-${item.id}`}
          value={item.value}
          onChange={(e) => onChange(item.id, e.target.value)}
          placeholder="Enter IP address"
          className="w-144"
        />
        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="text-red-600 hover:text-red-800 p-1 h-8"
          >
            <KeenIcon icon="trash" style="outline" className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CredentialFieldProps } from '../../_lib/types';

export function CredentialField({ 
  label, 
  value, 
  onCopy, 
  className = "w-144" 
}: CredentialFieldProps) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-normal text-gray-700">
        {label}
      </Label>
      <div className="flex items-center">
        <Input
          id={label.toLowerCase().replace(/\s+/g, '-')}
          value={value}
          readOnly
          className={`bg-gray-50 ${className}`}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(value)}
          className="p-1 h-8 w-8"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

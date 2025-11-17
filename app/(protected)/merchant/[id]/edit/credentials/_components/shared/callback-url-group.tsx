'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CallbackUrlGroupProps } from '../../_lib/types';

export function CallbackUrlGroup({ title, fields }: CallbackUrlGroupProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <div className="space-y-3 ml-4">
        {fields.map((field) => (
          <div key={field.key} className="flex items-center justify-between">
            <Label htmlFor={field.key} className="text-sm font-normal text-gray-700">
              {field.label}
            </Label>
            <Input
              id={field.key}
              value={field.value}
              onChange={(e) => field.onChange(field.key, e.target.value)}
              className="w-150"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

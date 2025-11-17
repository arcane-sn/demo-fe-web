'use client';

import { SquareMousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, InputWrapper } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form';
import type { ColorPickerProps } from '../../_lib/types';

export function ColorPicker({ 
  label, 
  description, 
  value, 
  onChange, 
  placeholder, 
  colorId 
}: ColorPickerProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <label className="text-sm font-medium">{label}</label>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <Input
          id={colorId}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
        <InputWrapper className="w-100 h-10">
          <Button 
            type="button"
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0 -me-2"
            onClick={() => document.getElementById(colorId)?.click()}
          >
            <SquareMousePointer 
              size={16} 
              fill={value}
              stroke={value}
              strokeWidth={1}
              style={{ opacity: 1 }}
              className="transition-colors duration-200"
            />
          </Button>
          <FormControl>
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="font-mono text-sm uppercase text-gray-600 border-0 shadow-none focus-visible:ring-0"
              placeholder={placeholder}
            />
          </FormControl>
        </InputWrapper>
      </div>
    </div>
  );
}

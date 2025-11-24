'use client';

import { KeenIcon } from '@/components/keenicons';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { Button } from '@/components/ui/button';
import { Input, InputWrapper } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form';
import type { ColorPickerProps } from '../../_lib/types';

// Helper function to check if color is light/bright
function isLightColor(hex: string | undefined): boolean {
  if (!hex) return false;
  
  // Remove # if present and trim whitespace
  hex = hex.replace('#', '').trim();
  
  // Handle 3-digit hex (e.g., #fff -> #ffffff)
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // Validate hex format
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return false;
  }
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate brightness using relative luminance formula
  // https://www.w3.org/WAI/GL/wiki/Relative_luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Consider color light if luminance is greater than 0.7
  return luminance > 0.7;
}

export function ColorPicker({ 
  label, 
  description, 
  value, 
  onChange, 
  placeholder, 
  colorId 
}: ColorPickerProps) {
  const isLight = isLightColor(value || '#ffffff');
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
            <HexagonBadge
              size="size-[32px]"
              stroke="stroke-gray-300"
              fill="fill-transparent"
              badge={
                <div 
                  className={`w-4 h-4 rounded transition-all duration-200 ${
                    isLight ? 'border-1 border-gray-500' : ''
                  }`}
                  style={{ backgroundColor: value }}
                />
              }
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

'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface ServiceOption {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

interface ServiceOptionsProps {
  title: string;
  description: string;
  options: ServiceOption[];
}

export function ServiceOptions({ title, description, options }: ServiceOptionsProps) {
  return (
    <div className="space-y-4 p-3">
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="space-y-4">
        {options.map((option) => (
          <div key={option.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                id={option.id}
                checked={option.checked}
                onCheckedChange={(checked) => option.onCheckedChange(checked === true)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <div>
                <label htmlFor={option.id} className="text-sm font-medium text-gray-900">
                  {option.label}
                </label>
                <p className="text-xs text-gray-600">{option.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

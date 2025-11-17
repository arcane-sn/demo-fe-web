"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChannelFilterState } from "../types";

interface ProviderSectionProps {
  values: ChannelFilterState;
  onUpdate: (key: keyof ChannelFilterState, value: any) => void;
  onSelectAll: () => void;
  onClear: () => void;
}

const providerOptions = [
  { label: 'PIRO', value: 'PIRO', count: 52 },
  { label: 'Other', value: 'Other', count: 0 },
];

export function ProviderSection({ values, onUpdate, onSelectAll, onClear }: ProviderSectionProps) {
  const handleProviderChange = (providerValue: string, checked: boolean) => {
    const currentValues = values.provider || [];
    if (checked) {
      onUpdate('provider', [...currentValues, providerValue]);
    } else {
      onUpdate('provider', currentValues.filter(v => v !== providerValue));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Provider</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            className="text-xs"
          >
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="text-xs"
          >
            Clear
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        {providerOptions.map((option) => (
          <div key={option.value} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`provider-${option.value}`}
                checked={values.provider?.includes(option.value) || false}
                onCheckedChange={(checked) => handleProviderChange(option.value, checked as boolean)}
              />
              <label
                htmlFor={`provider-${option.value}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
            <span className="text-xs text-gray-500">{option.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

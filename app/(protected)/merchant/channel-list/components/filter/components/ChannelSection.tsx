"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChannelFilterState } from "../types";

interface ChannelSectionProps {
  values: ChannelFilterState;
  onUpdate: (key: keyof ChannelFilterState, value: any) => void;
  onSelectAll: () => void;
  onClear: () => void;
}

const channelOptions = [
  { label: 'DANA', value: 'DANA', count: 6 },
  { label: 'OVO', value: 'OVO', count: 6 },
  { label: 'LinkAja', value: 'LinkAja', count: 6 },
  { label: 'GoPay', value: 'GoPay', count: 5 },
  { label: 'PayPal', value: 'PayPal', count: 5 },
  { label: 'Tcash', value: 'Tcash', count: 5 },
  { label: 'Jenius', value: 'Jenius', count: 5 },
  { label: 'Cash', value: 'Cash', count: 5 },
  { label: 'Alipay', value: 'Alipay', count: 5 },
  { label: 'Zelle', value: 'Zelle', count: 4 },
];

export function ChannelSection({ values, onUpdate, onSelectAll, onClear }: ChannelSectionProps) {
  const handleChannelChange = (channelValue: string, checked: boolean) => {
    const currentValues = values.channel || [];
    if (checked) {
      onUpdate('channel', [...currentValues, channelValue]);
    } else {
      onUpdate('channel', currentValues.filter(v => v !== channelValue));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Channel</h3>
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
      
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {channelOptions.map((option) => (
          <div key={option.value} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`channel-${option.value}`}
                checked={values.channel?.includes(option.value) || false}
                onCheckedChange={(checked) => handleChannelChange(option.value, checked as boolean)}
              />
              <label
                htmlFor={`channel-${option.value}`}
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

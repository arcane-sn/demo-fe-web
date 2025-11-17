"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChannelFilterState } from "../types";

interface MerchantNameSectionProps {
  values: ChannelFilterState;
  onUpdate: (key: keyof ChannelFilterState, value: any) => void;
  onSelectAll: () => void;
  onClear: () => void;
}

const merchantOptions = [
  { label: 'DigiStore', value: 'DigiStore', count: 52 },
  { label: 'Other Merchant', value: 'Other Merchant', count: 0 },
];

export function MerchantNameSection({ values, onUpdate, onSelectAll, onClear }: MerchantNameSectionProps) {
  const handleMerchantChange = (merchantValue: string, checked: boolean) => {
    const currentValues = values.merchantName || [];
    if (checked) {
      onUpdate('merchantName', [...currentValues, merchantValue]);
    } else {
      onUpdate('merchantName', currentValues.filter(v => v !== merchantValue));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Merchant Name</h3>
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
        {merchantOptions.map((option) => (
          <div key={option.value} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`merchant-${option.value}`}
                checked={values.merchantName?.includes(option.value) || false}
                onCheckedChange={(checked) => handleMerchantChange(option.value, checked as boolean)}
              />
              <label
                htmlFor={`merchant-${option.value}`}
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

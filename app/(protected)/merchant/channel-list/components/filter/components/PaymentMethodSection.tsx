"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChannelFilterState } from "../types";

interface PaymentMethodSectionProps {
  values: ChannelFilterState;
  onUpdate: (key: keyof ChannelFilterState, value: any) => void;
  onSelectAll: () => void;
  onClear: () => void;
}

const paymentMethodOptions = [
  { label: 'E-Wallet', value: 'e_wallet', count: 52 },
  { label: 'Bank Transfer', value: 'bank_transfer', count: 0 },
  { label: 'Credit Card', value: 'credit_card', count: 0 },
  { label: 'Debit Card', value: 'debit_card', count: 0 },
  { label: 'Virtual Account', value: 'virtual_account', count: 0 },
];

export function PaymentMethodSection({ values, onUpdate, onSelectAll, onClear }: PaymentMethodSectionProps) {
  const handlePaymentMethodChange = (methodValue: string, checked: boolean) => {
    const currentValues = values.paymentMethod || [];
    if (checked) {
      onUpdate('paymentMethod', [...currentValues, methodValue]);
    } else {
      onUpdate('paymentMethod', currentValues.filter(v => v !== methodValue));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Payment Method</h3>
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
        {paymentMethodOptions.map((option) => (
          <div key={option.value} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`payment-${option.value}`}
                checked={values.paymentMethod?.includes(option.value) || false}
                onCheckedChange={(checked) => handlePaymentMethodChange(option.value, checked as boolean)}
              />
              <label
                htmlFor={`payment-${option.value}`}
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
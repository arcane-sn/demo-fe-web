"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ChannelFilterModalProps } from "./types";
import { useFilterState, useFilterActions } from "./hooks";
import { 
  DateFilterSection, 
  MerchantNameSection, 
  PaymentMethodSection, 
  ChannelSection, 
  ProviderSection 
} from "./components";

export default function ChannelFilterModal({
  open,
  onOpenChange,
  onApply,
  onReset,
}: ChannelFilterModalProps) {
  const { values, setValues, updateValue, resetValues } = useFilterState();
  const {
    handleSelectAllMerchantName,
    handleClearMerchantName,
    handleSelectAllPaymentMethod,
    handleClearPaymentMethod,
    handleSelectAllChannel,
    handleClearChannel,
    handleSelectAllProvider,
    handleClearProvider,
  } = useFilterActions(setValues);

  const handleApply = () => {
    onApply?.(values);
    onOpenChange(false);
  };

  const handleReset = () => {
    resetValues();
    onReset?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[480px] max-h-[90vh] p-0 bg-white rounded-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Filter Channels
              </DialogTitle>
              <button
                onClick={() => onOpenChange(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 px-6 py-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Date Filter */}
              <DateFilterSection 
                values={values} 
                onUpdate={updateValue} 
              />

              {/* Merchant Name Filter */}
              <MerchantNameSection 
                values={values} 
                onUpdate={updateValue}
                onSelectAll={handleSelectAllMerchantName}
                onClear={handleClearMerchantName}
              />

              {/* Payment Method Filter */}
              <PaymentMethodSection 
                values={values} 
                onUpdate={updateValue}
                onSelectAll={handleSelectAllPaymentMethod}
                onClear={handleClearPaymentMethod}
              />

              {/* Channel Filter */}
              <ChannelSection 
                values={values} 
                onUpdate={updateValue}
                onSelectAll={handleSelectAllChannel}
                onClear={handleClearChannel}
              />

              {/* Provider Filter */}
              <ProviderSection 
                values={values} 
                onUpdate={updateValue}
                onSelectAll={handleSelectAllProvider}
                onClear={handleClearProvider}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleReset}
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Reset
              </Button>
              <Button
                onClick={handleApply}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComponentProps } from "react";
import { DateFilterSection } from "../../../components/DateFilterSection";
import { FilterSection } from "./FilterSection";
import { ModalFooter } from "./ModalFooter";
import { CheckboxOption } from "../../../components/CheckboxList";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PAY_IN_PAYMENT_STATUS_OPTIONS,
  PAY_IN_ACTIVITY_OPTIONS,
  PAY_IN_PAYMENT_METHOD_OPTIONS,
} from "../../core/_consts";
import { Separator } from "@/components/ui/separator";

type ModalFilterPayInProps = ComponentProps<typeof Dialog>;

const ModalFilterPayIn = ({ open, onOpenChange }: ModalFilterPayInProps) => {
  // Payment Status options
  const [paymentStatusOptions, setPaymentStatusOptions] = useState<
    CheckboxOption[]
  >(PAY_IN_PAYMENT_STATUS_OPTIONS);

  // Activity options
  const [activityOptions, setActivityOptions] = useState<CheckboxOption[]>(
    PAY_IN_ACTIVITY_OPTIONS
  );

  // Payment Method options with nested structure
  const [paymentMethodOptions, setPaymentMethodOptions] = useState<
    CheckboxOption[]
  >(PAY_IN_PAYMENT_METHOD_OPTIONS);

  const updateOption = (
    options: CheckboxOption[],
    optionId: string,
    checked: boolean
  ): CheckboxOption[] => {
    return options.map((option) => {
      if (option.id === optionId) {
        return { ...option, checked };
      }
      if (option.children) {
        return {
          ...option,
          children: updateOption(option.children, optionId, checked),
        };
      }
      return option;
    });
  };

  const handlePaymentStatusChange = (optionId: string, checked: boolean) => {
    setPaymentStatusOptions((prev) => updateOption(prev, optionId, checked));
  };

  const handleActivityChange = (optionId: string, checked: boolean) => {
    setActivityOptions((prev) => updateOption(prev, optionId, checked));
  };

  const handlePaymentMethodChange = (optionId: string, checked: boolean) => {
    setPaymentMethodOptions((prev) => updateOption(prev, optionId, checked));
  };

  const selectAllOptions = (options: CheckboxOption[]): CheckboxOption[] => {
    return options.map((option) => ({
      ...option,
      checked: true,
      children: option.children ? selectAllOptions(option.children) : undefined,
    }));
  };

  const clearAllOptions = (options: CheckboxOption[]): CheckboxOption[] => {
    return options.map((option) => ({
      ...option,
      checked: false,
      children: option.children ? clearAllOptions(option.children) : undefined,
    }));
  };

  const handlePaymentStatusSelectAll = () => {
    setPaymentStatusOptions(selectAllOptions);
  };

  const handlePaymentStatusClear = () => {
    setPaymentStatusOptions(clearAllOptions);
  };

  const handleActivitySelectAll = () => {
    setActivityOptions(selectAllOptions);
  };

  const handleActivityClear = () => {
    setActivityOptions(clearAllOptions);
  };

  const handlePaymentMethodSelectAll = () => {
    setPaymentMethodOptions(selectAllOptions);
  };

  const handlePaymentMethodClear = () => {
    setPaymentMethodOptions(clearAllOptions);
  };

  const handleDateFilterClear = () => {
    // Handle date filter clear
  };

  const handleReset = () => {
    setPaymentStatusOptions(clearAllOptions);
    setActivityOptions(clearAllOptions);
    setPaymentMethodOptions(clearAllOptions);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  const handleApply = () => {
    // Handle apply filter logic
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        {/* Header */}
        <DialogHeader className="px-5 border-b border-gray-200 w-full">
          <DialogTitle className="text-b-14-14-600 text-gray-900 py-5">
            Filter
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <ScrollArea className="flex flex-col items-center justify-center gap-5 px-5">
          {/* Date Filter */}
          <DateFilterSection onClear={handleDateFilterClear} />

          {/* Separator */}
          <Separator />

          {/* Payment Status */}
          <FilterSection
            title="Payment Status"
            options={paymentStatusOptions}
            onOptionChange={handlePaymentStatusChange}
            onSelectAll={handlePaymentStatusSelectAll}
            onClear={handlePaymentStatusClear}
          />

          {/* Separator */}
          <Separator />

          {/* Activity */}
          <FilterSection
            title="Activity"
            options={activityOptions}
            onOptionChange={handleActivityChange}
            onSelectAll={handleActivitySelectAll}
            onClear={handleActivityClear}
          />

          {/* Separator */}
          <Separator />

          {/* Payment Method */}
          <FilterSection
            title="Payment Method"
            options={paymentMethodOptions}
            onOptionChange={handlePaymentMethodChange}
            onSelectAll={handlePaymentMethodSelectAll}
            onClear={handlePaymentMethodClear}
          />

          {/* Separator */}
          <Separator />
        </ScrollArea>

        <ModalFooter onReset={handleReset} onApply={handleApply} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalFilterPayIn;

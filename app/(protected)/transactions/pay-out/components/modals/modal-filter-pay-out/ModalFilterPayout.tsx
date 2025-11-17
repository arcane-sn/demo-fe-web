"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComponentProps } from "react";
import { DateFilterSection } from "./DateFilterSection";
import { FilterSectionGeneric } from "../../../../components/FilterSectionGeneric";
import { CheckboxOption } from "../../../../components/CheckboxList";
import {
  PAY_OUT_STATUS_OPTIONS,
  PAY_OUT_TRANSACTION_TYPE_OPTIONS,
} from "../../../core/_consts";
import { ModalFooter } from "./ModalFooter";
import { Separator } from "@/components/ui/separator";

type ModalFilterPayoutProps = ComponentProps<typeof Dialog>;

const ModalFilterPayout = ({ open, onOpenChange }: ModalFilterPayoutProps) => {
  // Status options
  const [statusOptions, setStatusOptions] = useState<CheckboxOption[]>(
    PAY_OUT_STATUS_OPTIONS.map((option) => ({ ...option }))
  );

  // Transaction Type options
  const [transactionTypeOptions, setTransactionTypeOptions] = useState<
    CheckboxOption[]
  >(PAY_OUT_TRANSACTION_TYPE_OPTIONS.map((option) => ({ ...option })));

  // Status handlers
  const handleStatusChange = (optionId: string, checked: boolean) => {
    setStatusOptions((prev) =>
      prev.map((option) =>
        option.id === optionId ? { ...option, checked } : option
      )
    );
  };

  const handleStatusSelectAll = () => {
    setStatusOptions((prev) =>
      prev.map((option) => ({ ...option, checked: true }))
    );
  };

  const handleStatusClear = () => {
    setStatusOptions((prev) =>
      prev.map((option) => ({ ...option, checked: false }))
    );
  };

  // Transaction Type handlers
  const handleTransactionTypeChange = (optionId: string, checked: boolean) => {
    setTransactionTypeOptions((prev) =>
      prev.map((option) =>
        option.id === optionId ? { ...option, checked } : option
      )
    );
  };

  const handleTransactionTypeSelectAll = () => {
    setTransactionTypeOptions((prev) =>
      prev.map((option) => ({ ...option, checked: true }))
    );
  };

  const handleTransactionTypeClear = () => {
    setTransactionTypeOptions((prev) =>
      prev.map((option) => ({ ...option, checked: false }))
    );
  };

  // Date filter handlers
  const handleDateFilterClear = () => {
    // Handle date filter clear logic
    console.log("Date filter cleared");
  };

  // Footer handlers
  const handleReset = () => {
    setStatusOptions(
      PAY_OUT_STATUS_OPTIONS.map((option) => ({ ...option, checked: false }))
    );
    setTransactionTypeOptions(
      PAY_OUT_TRANSACTION_TYPE_OPTIONS.map((option) => ({
        ...option,
        checked: false,
      }))
    );
    handleDateFilterClear();
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  const handleApply = () => {
    // Handle apply filter logic
    const selectedStatuses = statusOptions
      .filter((option) => option.checked)
      .map((option) => option.id);
    const selectedTransactionTypes = transactionTypeOptions
      .filter((option) => option.checked)
      .map((option) => option.id);

    console.log("Applied filters:", {
      statuses: selectedStatuses,
      transactionTypes: selectedTransactionTypes,
    });

    onOpenChange?.(false);
  };

  // Check if reset should be disabled
  const hasAnyFilters =
    statusOptions.some((option) => option.checked) ||
    transactionTypeOptions.some((option) => option.checked);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-slate-900 text-sm font-semibold ">
            Filter
          </DialogTitle>
        </DialogHeader>
        <Separator />
        {/* Content */}
        <div className=" py-5 flex flex-col justify-center items-center gap-5">
          {/* Date Filter */}
          <DateFilterSection onClear={handleDateFilterClear} />

          {/* Separator */}
          <Separator />

          {/* Status */}
          <FilterSectionGeneric
            title="Status"
            options={statusOptions}
            onOptionChange={handleStatusChange}
            onSelectAll={handleStatusSelectAll}
            onClear={handleStatusClear}
          />

          {/* Separator */}
          <Separator />

          {/* Transaction Type */}
          <FilterSectionGeneric
            title="Transaction Type"
            options={transactionTypeOptions}
            onOptionChange={handleTransactionTypeChange}
            onSelectAll={handleTransactionTypeSelectAll}
            onClear={handleTransactionTypeClear}
          />

          {/* Separator */}
          <Separator />

          {/* Footer */}
          <ModalFooter
            onReset={handleReset}
            onCancel={handleCancel}
            onApply={handleApply}
            isResetDisabled={!hasAnyFilters}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFilterPayout;

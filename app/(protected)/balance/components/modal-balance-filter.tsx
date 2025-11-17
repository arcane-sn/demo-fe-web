"use client";

import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import DatePickerRange from "@/components/ui/datepickerrange";
import { Button } from "@/components/ui/button";
import BalanceCheckboxFilter from "./balance-checkbox-filter";
import type { CheckboxFilterOption } from "./balance-checkbox-filter";

export interface DateFilterOption {
  value: string;
  label: string;
}

export interface ModalBalanceFilterProps {
  open: boolean;
  onClose: () => void;
  onApply?: (filters: {
    dateRange?: DateRange;
    transactionTypes: string[];
    status: string[];
  }) => void;
  dateFilterOptions?: DateFilterOption[];
  transactionTypeOptions?: CheckboxFilterOption[];
  statusOptions?: CheckboxFilterOption[];
  defaultDateRange?: DateRange;
  showResetButton?: boolean;
}

const ModalBalanceFilter = ({
  open,
  onClose,
  onApply,
  dateFilterOptions = [
    { value: "transaction-date", label: "Transaction Date" },
    { value: "last-activity", label: "Last Activity Date" },
  ],
  transactionTypeOptions = [
    { id: "account-inquiry", label: "Account Inquiry" },
    { id: "disbursement", label: "Disbursement" },
    { id: "top-up", label: "Top Up" },
    { id: "settlement-to-balance", label: "Settlement to Balance" },
    { id: "adjustment", label: "Adjustment" },
  ],
  statusOptions = [
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
    { id: "processing", label: "Processing" },
  ],
  defaultDateRange,
  showResetButton = true,
}: ModalBalanceFilterProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    defaultDateRange || {
      from: new Date(2025, 0, 20),
      to: addDays(new Date(2025, 0, 20), 20),
    }
  );
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<
    string[]
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>(
    dateFilterOptions[0]?.value || "transaction-date"
  );

  const handleClear = () => {
    setDateRange(undefined);
    setSelectedTransactionTypes([]);
    setSelectedStatus([]);
  };

  const handleReset = () => {
    handleClear();
    // Reset to default date range if provided
    if (defaultDateRange) {
      setDateRange(defaultDateRange);
    }
  };

  const handleApply = () => {
    if (onApply) {
      onApply({
        dateRange,
        transactionTypes: selectedTransactionTypes,
        status: selectedStatus,
      });
    } else {
      console.log("Applied filters:", {
        dateRange,
        transactionTypes: selectedTransactionTypes,
        status: selectedStatus,
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="w-full self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-slate-800 text-xs font-normal font-['Inter'] leading-none">
              Date Filter
            </div>
            <button
              onClick={handleClear}
              className="px-0.5 py-1 rounded-md flex justify-start items-center gap-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="justify-start text-rose-500 text-xs font-medium font-['Inter'] leading-3">
                Clear
              </div>
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <Select value={selectedDateFilter} onValueChange={setSelectedDateFilter}>
              <SelectTrigger>
                <div>
                  {dateFilterOptions.find((opt) => opt.value === selectedDateFilter)?.label ||
                    "Transaction Date"}
                </div>
              </SelectTrigger>
              <SelectContent>
                {dateFilterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date Range Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-800">
                Select Date Range
              </label>
              <DatePickerRange
                value={dateRange}
                onChange={setDateRange}
                placeholder="Pick a date range"
                numberOfMonths={2}
                align="end"
              />
            </div>

            {/* Transaction Type Filter */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <BalanceCheckboxFilter
                options={transactionTypeOptions}
                selectedTypes={selectedTransactionTypes}
                onChange={setSelectedTransactionTypes}
                label="Transaction Type"
              />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <BalanceCheckboxFilter
                options={statusOptions}
                selectedTypes={selectedStatus}
                onChange={setSelectedStatus}
                label="Status"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-3 pt-3 border-t mt-6 border-gray-200">
          {showResetButton && (
            <Button
              variant="foreground"
              className="bg-rose-50 opacity-50  outline-1 outline-offset-[-1px] outline-rose-500/20 text-rose-500"
              onClick={handleReset}
            >
              Reset to Default
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceFilter;


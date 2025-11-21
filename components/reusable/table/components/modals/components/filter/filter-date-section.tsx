"use client";

import { useEffect, useMemo, useState } from "react";
import { format, parse, isValid } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePickerRange from "@/components/ui/datepickerrange";
import { FilterDateConfig } from "../../types";

interface FilterDateSectionProps {
  config: FilterDateConfig;
}

export function FilterDateSection({ config }: FilterDateSectionProps) {
  const {
    label = "Date Filter",
    placeholder = "Transaction Date",
    value,
    dateRange,
    dateType = "transactionDate",
    dateTypeOptions = [
      { label: "Transaction Date", value: "transactionDate" },
      { label: "Requested Date", value: "requestedDate" },
    ],
    presetDisplayValue,
    onClear,
    onDateChange,
    onDateTypeChange,
    onDateRangeChange,
  } = config;

  const DISPLAY_FORMAT = "MMM dd, yyyy";

  const parseValueToRange = useMemo(() => {
    const normalizedPlaceholder = placeholder?.trim() || "";
    return (input?: string): DateRange | undefined => {
      if (!input) return undefined;

      const raw = input.trim();
      if (!raw || raw === normalizedPlaceholder) {
        return undefined;
      }

      const [fromStr, toStr] = raw.split("-");
      if (!fromStr) return undefined;

      const parseWithFormats = (...formats: string[]) => {
        for (const fmt of formats) {
          const parsed = parse(fromStr.trim(), fmt, new Date());
          if (isValid(parsed)) {
            const toParsed =
              toStr && toStr.trim()
                ? parse(toStr.trim(), fmt, new Date())
                : undefined;

              if (!toStr || !toStr.trim()) {
                return { from: parsed };
              }

              if (toParsed && isValid(toParsed)) {
                return { from: parsed, to: toParsed };
              }
          }
        }
        return undefined;
      };

      return parseWithFormats(DISPLAY_FORMAT, "dd/MM/yyyy");
    };
  }, [placeholder]);

  const [internalRange, setInternalRange] = useState<DateRange | undefined>(() =>
    dateRange ?? parseValueToRange(value),
  );

  useEffect(() => {
    const newRange = dateRange ?? parseValueToRange(value);
    setInternalRange((prev) => {
      // Only update if the range actually changed
      if (
        prev?.from?.getTime() !== newRange?.from?.getTime() ||
        prev?.to?.getTime() !== newRange?.to?.getTime()
      ) {
        return newRange;
      }
      return prev;
    });
  }, [value, dateRange, parseValueToRange]);

  const formatRange = (range?: DateRange): string => {
    if (!range?.from) return presetDisplayValue ?? "";
    const start = format(range.from, "dd/MM/yyyy");
    if (range.to) {
      return `${start} - ${format(range.to, "dd/MM/yyyy")}`;
    }
    return start;
  };

  const handleApply = (range?: DateRange) => {
    setInternalRange(range);
    onDateChange?.(formatRange(range));
    onDateRangeChange?.(range);
  };

  const handleReset = () => {
    setInternalRange(undefined);
    onClear?.();
    onDateChange?.("");
    onDateRangeChange?.(undefined);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-5 pb-2.5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h3 className="text-b-13-14-400 text-gray-800">{label}</h3>
        {onClear && (
          <button
            onClick={handleReset}
          className="px-1 py-1 rounded-md hover:bg-gray-50 transition-colors"
        >
          <span className="text-b-11-12-500 text-red-500">Clear</span>
        </button>
      )}
    </div>

      {/* Input Fields */}
      <div className="flex flex-col items-start gap-2.5 w-full">
        {/* Date Type Dropdown */}
        <Select
          value={dateType}
          onValueChange={onDateTypeChange || (() => {})}
        >
          <SelectTrigger className="w-full h-10 bg-white border border-gray-300">
            <SelectValue placeholder="Select date type" />
          </SelectTrigger>
          <SelectContent>
            {dateTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range Picker */}
        <DatePickerRange
          value={internalRange}
          onChange={setInternalRange}
          onApply={handleApply}
          onReset={handleReset}
          placeholder={presetDisplayValue ?? placeholder}
          className="w-full"
        />
      </div>
    </div>
  );
}


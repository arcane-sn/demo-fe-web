"use client";

import { useState } from "react";
import { addDays, format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerRangeProps {
  value?: DateRange | undefined;
  onChange?: (date: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  numberOfMonths?: number;
  align?: "start" | "center" | "end";
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  showResetButton?: boolean;
  showApplyButton?: boolean;
  onApply?: (date: DateRange | undefined) => void;
  onReset?: () => void;
}

const DatePickerRange = ({
  value,
  onChange,
  placeholder = "Pick a date range",
  className = "",
  disabled = false,
  numberOfMonths = 2,
  align = "end",
  defaultMonth,
  minDate,
  maxDate,
  showResetButton = true,
  showApplyButton = true,
  onApply,
  onReset,
}: DatePickerRangeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(
    value
  );

  const handleDateRangeApply = () => {
    if (onApply) {
      onApply(tempDateRange);
    } else if (onChange) {
      onChange(tempDateRange);
    }
    setIsOpen(false);
  };

  const handleDateRangeReset = () => {
    setTempDateRange(undefined);
    if (onReset) {
      onReset();
    } else if (onChange) {
      onChange(undefined);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset temp date range when closing without applying
      setTempDateRange(value);
    }
  };

  const formatDateRange = (date: DateRange | undefined) => {
    if (!date?.from) return placeholder;

    if (date.to) {
      return `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`;
    }

    return format(date.from, "LLL dd, y");
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            className="w-full flex items-center justify-start"
            id="date"
            variant="outline"
            disabled={disabled}
          >
            <CalendarDays size={16} className="me-0.5" />
            {formatDateRange(value)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={tempDateRange?.from || defaultMonth || new Date()}
            selected={tempDateRange}
            onSelect={setTempDateRange}
            numberOfMonths={numberOfMonths}
            disabled={(date) => {
              if (minDate && date < minDate) return true;
              if (maxDate && date > maxDate) return true;
              return false;
            }}
          />
          {(showResetButton || showApplyButton) && (
            <div className="flex items-center justify-end gap-1.5 border-t border-border p-3">
              {showResetButton && (
                <Button variant="outline" onClick={handleDateRangeReset}>
                  Reset
                </Button>
              )}
              {showApplyButton && (
                <Button onClick={handleDateRangeApply}>Apply</Button>
              )}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerRange;

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { DateFilterProps } from "../core";

const DateFilterSection: React.FC<DateFilterProps> = ({
  values,
  setFieldValue,
}) => {
  // Convert string dates to DateRange format
  const dateRange: DateRange | undefined =
    values.dateStart && values.dateEnd
      ? {
          from: new Date(values.dateStart),
          to: new Date(values.dateEnd),
        }
      : undefined;

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      setFieldValue("dateStart", range.from.toISOString());
    } else {
      setFieldValue("dateStart", "");
    }
    if (range?.to) {
      setFieldValue("dateEnd", range.to.toISOString());
    } else {
      setFieldValue("dateEnd", "");
    }
  };

  const handleClear = () => {
    setFieldValue("dateStart", "");
    setFieldValue("dateEnd", "");
  };

  return (
    <div className="px-7.5 py-2.5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="text-[#252F4A] text-[13px] font-normal leading-[14px]">
          Date Filter
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="px-1 py-1 h-auto text-[#F8285A] text-[11px] font-medium leading-[12px] hover:bg-transparent"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>

      <div className="flex flex-col gap-2.5">
        {/* Date Filter Mode Dropdown */}
        <Select
          value={values.dateFilterMode}
          onValueChange={(value) => setFieldValue("dateFilterMode", value)}
        >
          <SelectTrigger className="w-full h-[42px] px-3 py-2.75 bg-[#FCFCFC] border-[#DBDFE9] rounded-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_date">Created Date</SelectItem>
            <SelectItem value="updated_date">Updated Date</SelectItem>
            <SelectItem value="last_login_date">Last Login Date</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range Picker with 2-month view */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-[42px] px-3 py-2.75 bg-[#FCFCFC] border-[#DBDFE9] rounded-md justify-start text-left font-normal",
                !values.dateStart && !values.dateEnd && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {values.dateStart && values.dateEnd
                ? `${format(new Date(values.dateStart), "dd/MM/yyyy")} - ${format(
                    new Date(values.dateEnd),
                    "dd/MM/yyyy"
                  )}`
                : "Select date range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateFilterSection;

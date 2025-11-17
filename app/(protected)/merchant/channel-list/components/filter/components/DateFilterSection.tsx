"use client";

import React from "react";
import DatePickerRange from "@/components/ui/datepickerrange";
import { ChannelFilterState } from "../types";

interface DateFilterSectionProps {
  values: ChannelFilterState;
  onUpdate: (key: keyof ChannelFilterState, value: any) => void;
}

export function DateFilterSection({ values, onUpdate }: DateFilterSectionProps) {
  const handleDateRangeChange = (dateRange: any) => {
    onUpdate('dateFilter', {
      ...values.dateFilter,
      dateRange,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Registered Date</h3>
        <DatePickerRange
          value={values.dateFilter.dateRange}
          onChange={handleDateRangeChange}
          placeholder="Choose a date range"
          numberOfMonths={1}
          showResetButton={true}
          showApplyButton={true}
          align="start"
        />
      </div>
    </div>
  );
}
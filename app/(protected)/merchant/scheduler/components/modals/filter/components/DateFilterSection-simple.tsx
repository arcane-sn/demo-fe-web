import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePickerRange from "@/components/ui/datepickerrange";
import { SchedulerFilterState } from "../types";

interface DateFilterSectionProps {
  values: SchedulerFilterState;
  updateValue: (path: string, value: any) => void;
}

export const DateFilterSectionSimple: React.FC<DateFilterSectionProps> = ({ values, updateValue }) => {
  return (
    <div className="space-y-3 border-b pb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Date Filter</h3>
        <button 
          className="text-xs text-red-500 hover:text-red-600 font-medium"
          onClick={() => updateValue('dateFilter.dateRange', undefined)}
        >
          Clear
        </button>
      </div>
      
      <div className="space-y-2.5">
        <Select 
          value={values.dateFilter.type} 
          onValueChange={(value) => updateValue('dateFilter.type', value)}
        >
          <SelectTrigger className="w-full h-10">
            <SelectValue placeholder="Updated Date" />
          </SelectTrigger>
          <SelectContent className="z-50">
            <SelectItem value="updatedDate">Updated Date</SelectItem>
            <SelectItem value="createdDate">Created Date</SelectItem>
          </SelectContent>
        </Select>

        <DatePickerRange
          value={values.dateFilter.dateRange}
          onChange={(dateRange) => updateValue('dateFilter.dateRange', dateRange)}
          placeholder="Choose a date range"
          className="w-full"
          align="start"
          numberOfMonths={1}
          showResetButton={true}
          showApplyButton={true}
        />
      </div>
    </div>
  );
};

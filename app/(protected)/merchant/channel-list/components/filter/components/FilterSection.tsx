import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChannelFilterState } from "../types";

interface FilterSectionProps {
  title: string;
  values: any;
  fields: Array<{
    key: string;
    label: string;
  }>;
  updateValue: (path: string, value: any) => void;
  handleSelectAll: () => void;
  handleClear: () => void;
  gapClass?: string;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  values,
  fields,
  updateValue,
  handleSelectAll,
  handleClear,
  gapClass = "gap-30"
}) => {
  return (
    <div className={`space-y-3 border-b pb-6 flex ${gapClass}`}>
      <div className="gap-2">
        <h3 className="text-sm font-semibold text-gray-700 pb-2">{title}</h3>
        <div className="flex items-center gap-3">
          <button 
            className="text-xs text-blue-500 hover:text-blue-600 font-medium"
            onClick={handleSelectAll}
          >
            Select All
          </button>
          <button 
            className="text-xs text-red-500 hover:text-red-600 font-medium"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        {fields.map((field) => (
          <label key={field.key} className="flex items-center gap-2.5 cursor-pointer">
            <Checkbox
              checked={values[field.key]}
              onCheckedChange={(checked) => updateValue(field.key, checked as boolean)}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-700">{field.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { SchedulerFilterState } from "../types";

interface SchedulerSectionProps {
  title: string;
  values: SchedulerFilterState['activeScheduler'] | SchedulerFilterState['inactiveScheduler'];
  updateValue: (path: string, value: boolean) => void;
  handleSelectAll: () => void;
  handleClear: () => void;
}

export const SchedulerSection: React.FC<SchedulerSectionProps> = ({
  title,
  values,
  updateValue,
  handleSelectAll,
  handleClear,
}) => {
  const fields = [
    { key: 'settlement', label: 'Settlement' },
    { key: 'transactionReport', label: 'Transaction Report' },
    { key: 'transactionSummary', label: 'Transaction Summary' },
    { key: 'balanceStatement', label: 'Balance Statement' },
    { key: 'disbursement', label: 'Disbursement' },
  ];

  return (
    <div className="space-y-3 border-b pb-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
          <div className="flex items-center gap-4">
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
        
        <div className="grid grid-cols-1 gap-3">
          {fields.map((field) => (
            <div key={field.key} className="flex items-center space-x-2">
              <Checkbox
                id={`${title.toLowerCase().replace(/\s+/g, '-')}-${field.key}`}
                checked={values[field.key as keyof typeof values]}
                onCheckedChange={(checked) => updateValue(field.key, checked as boolean)}
                className="h-4 w-4"
              />
              <label
                htmlFor={`${title.toLowerCase().replace(/\s+/g, '-')}-${field.key}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {field.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


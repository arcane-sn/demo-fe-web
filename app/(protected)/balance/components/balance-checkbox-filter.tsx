"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export interface CheckboxFilterOption {
  id: string;
  label: string;
}

export interface BalanceCheckboxFilterProps {
  options: CheckboxFilterOption[];
  selectedTypes?: string[];
  onChange?: (selectedTypes: string[]) => void;
  className?: string;
  label?: string;
}

const BalanceCheckboxFilter = ({
  options,
  selectedTypes = [],
  onChange,
  className = "",
  label = "Transaction Type",
}: BalanceCheckboxFilterProps) => {
  const [selected, setSelected] = useState<string[]>(selectedTypes);

  useEffect(() => {
    setSelected(selectedTypes);
  }, [selectedTypes]);

  const handleSelectAll = () => {
    const allIds = options.map((option) => option.id);
    setSelected(allIds);
    onChange?.(allIds);
  };

  const handleClear = () => {
    setSelected([]);
    onChange?.([]);
  };

  const handleCheckboxChange = (typeId: string, checked: boolean) => {
    let newSelected: string[];
    if (checked) {
      newSelected = [...selected, typeId];
    } else {
      newSelected = selected.filter((id) => id !== typeId);
    }
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const isAllSelected = selected.length === options.length && options.length > 0;
  const isNoneSelected = selected.length === 0;

  return (
    <div className={`space-y-4 flex items-center justify-start ${className}`}>
      <div className="w-52 flex flex-col items-start justify-between">
        <div className="text-slate-800 text-xs font-normal font-['Inter'] leading-none">
          {label}
        </div>
        <div className="flex items-center gap-2 mt-2.5">
          <button
            onClick={handleSelectAll}
            className={` py-1 rounded-md text-xs font-medium transition-colors ${
              isAllSelected
                ? "text-blue-500 "
                : "text-blue-500 hover:bg-blue-50"
            }`}
          >
            Select All
          </button>
          <button
            onClick={handleClear}
            className={` py-1 rounded-md text-xs font-medium transition-colors ${
              isNoneSelected
                ? "text-rose-500  opacity-50"
                : "text-rose-500 hover:bg-rose-50"
            }`}
            disabled={isNoneSelected}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <Checkbox
              id={option.id}
              checked={selected.includes(option.id)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(option.id, checked as boolean)
              }
            />
            <label
              htmlFor={option.id}
              className="text-slate-800 text-xs font-medium font-['Inter'] leading-none cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalanceCheckboxFilter;



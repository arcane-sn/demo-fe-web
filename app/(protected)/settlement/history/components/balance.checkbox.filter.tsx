"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface TransactionType {
  id: string;
  label: string;
}

interface BalanceCheckboxFilterProps {
  selectedTypes?: string[];
  onChange?: (selectedTypes: string[]) => void;
  className?: string;
  label?: string;
}

const transactionTypes: TransactionType[] = [
  { id: "account-inquiry", label: "Account Inquiry" },
  { id: "disbursement", label: "Disbursement" },
  { id: "top-up", label: "Top Up" },
  { id: "settlement-to-balance", label: "Settlement to Balance" },
  { id: "adjustment", label: "Adjustment" },
];

const BalanceCheckboxFilter = ({
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
    const allIds = transactionTypes.map((type) => type.id);
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

  const isAllSelected = selected.length === transactionTypes.length;
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
        {transactionTypes.map((type) => (
          <div key={type.id} className="flex items-center gap-2">
            <Checkbox
              id={type.id}
              checked={selected.includes(type.id)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(type.id, checked as boolean)
              }
            />
            <label
              htmlFor={type.id}
              className="text-slate-800 text-xs font-medium font-['Inter'] leading-none cursor-pointer"
            >
              {type.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalanceCheckboxFilter;

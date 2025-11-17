"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroupProps } from "../core";
import { handleSelectAll, handleClear, hasAnySelected } from "../core";

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  fieldName,
  title,
  options,
  values,
  setFieldValue,
}) => {
  const field = values[fieldName] as any[];
  const hasSelected = hasAnySelected(field);

  return (
    <div className="px-7.5 py-2.5 flex gap-2.5">
      <div className="w-[200px] flex flex-col gap-2.5">
        <div className="text-[#252F4A] text-[13px] font-normal leading-[14px]">
          {title}
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-1 py-1 h-auto text-[#1B84FF] text-[11px] font-medium leading-[12px] hover:bg-transparent"
            onClick={() => handleSelectAll(fieldName, setFieldValue, values)}
          >
            Select All
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={`px-1 py-1 h-auto text-[#F8285A] text-[11px] font-medium leading-[12px] hover:bg-transparent ${
              !hasSelected ? "opacity-50" : ""
            }`}
            disabled={!hasSelected}
            onClick={() => handleClear(fieldName, setFieldValue, values)}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        {field.map((option, index) => (
          <div key={option.id} className="flex items-center gap-1.5">
            <Checkbox
              id={`${fieldName}-${option.id}`}
              checked={option.value}
              onCheckedChange={(checked) => {
                const updatedField = [...field];
                updatedField[index] = {
                  ...option,
                  value: !!checked,
                };
                setFieldValue(fieldName, updatedField);
              }}
              className="w-[18px] h-[18px] border-[#DBDFE9] rounded"
            />
            <label
              htmlFor={`${fieldName}-${option.id}`}
              className="text-[#252F4A] text-[13px] font-medium leading-[14px] cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;

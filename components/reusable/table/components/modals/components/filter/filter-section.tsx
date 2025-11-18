"use client";

import { useState, useCallback } from "react";
import { FilterSectionConfig, FilterCheckboxOption } from "../../types";
import { SectionHeader } from "@/components/reusable/SectionHeader";
import { CheckboxList } from "@/components/reusable/CheckboxList";

export function FilterSection({
  id,
  title,
  options,
  onOptionChange,
  onSelectAll,
  onClear,
  defaultExpanded = [],
}: FilterSectionConfig) {
  const [expandedOptions, setExpandedOptions] = useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const handleToggleExpanded = useCallback((optionId: string) => {
    setExpandedOptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(optionId)) {
        newSet.delete(optionId);
      } else {
        newSet.add(optionId);
      }
      return newSet;
    });
  }, []);

  return (
    <div className="flex items-start gap-10 py-8 w-full ">
      {/* Left column - Title and buttons */}
      <SectionHeader
        title={title}
        onSelectAll={onSelectAll}
        onClear={onClear}
        showSelectAll={!!onSelectAll}
        showClear={!!onClear}
        selectAllText="Select All"
        clearText="Clear"
      />

      {/* Right column - Options */}
      <CheckboxList
        options={options}
        onOptionChange={onOptionChange}
        expandedOptions={expandedOptions}
        onToggleExpanded={handleToggleExpanded}
      />
    </div>
  );
}


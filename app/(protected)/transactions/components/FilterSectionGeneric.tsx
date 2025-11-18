"use client";

import { useState } from "react";
import { SectionHeader } from "../../../../components/reusable/SectionHeader";
import { CheckboxList } from "../../../../components/reusable/CheckboxList";
import type { CheckboxOption } from "../../../../components/reusable/CheckboxList";

interface FilterSectionGenericProps {
  title: string;
  options: CheckboxOption[];
  onOptionChange: (optionId: string, checked: boolean) => void;
  onSelectAll?: () => void;
  onClear?: () => void;
  showSelectAll?: boolean;
  showClear?: boolean;
  selectAllText?: string;
  clearText?: string;
  defaultExpanded?: string[];
}

export function FilterSectionGeneric({
  title,
  options,
  onOptionChange,
  onSelectAll,
  onClear,
  showSelectAll = true,
  showClear = true,
  selectAllText = "Select All",
  clearText = "Clear",
  defaultExpanded = [],
}: FilterSectionGenericProps) {
  const [expandedOptions, setExpandedOptions] = useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const toggleExpanded = (optionId: string) => {
    const newExpanded = new Set(expandedOptions);
    if (newExpanded.has(optionId)) {
      newExpanded.delete(optionId);
    } else {
      newExpanded.add(optionId);
    }
    setExpandedOptions(newExpanded);
  };

  return (
    <div className="flex items-start gap-2.5 py-2.5 w-full">
      {/* Left column - Title and buttons */}
      <SectionHeader
        title={title}
        onSelectAll={onSelectAll}
        onClear={onClear}
        showSelectAll={showSelectAll}
        showClear={showClear}
        selectAllText={selectAllText}
        clearText={clearText}
      />

      {/* Right column - Options */}
      <CheckboxList
        options={options}
        onOptionChange={onOptionChange}
        expandedOptions={expandedOptions}
        // onToggleExpanded={toggleExpanded}
      />
    </div>
  );
}

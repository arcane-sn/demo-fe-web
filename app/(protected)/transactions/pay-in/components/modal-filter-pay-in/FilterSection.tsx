"use client";

import { FilterSectionGeneric } from "../../../components/FilterSectionGeneric";
import { CheckboxOption } from "../../../components/CheckboxList";

interface FilterSectionProps {
  title: string;
  options: CheckboxOption[];
  onOptionChange: (optionId: string, checked: boolean) => void;
  onSelectAll: () => void;
  onClear: () => void;
}

export function FilterSection({
  title,
  options,
  onOptionChange,
  onSelectAll,
  onClear,
}: FilterSectionProps) {
  return (
    <FilterSectionGeneric
      title={title}
      options={options}
      onOptionChange={onOptionChange}
      onSelectAll={onSelectAll}
      onClear={onClear}
      defaultExpanded={["debit-credit-card", "payment-channel", "payment-mode"]}
    />
  );
}

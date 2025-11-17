"use client";

import { FilterSectionGeneric } from "../../../components/FilterSectionGeneric";
import { CheckboxOption } from "../../../components/CheckboxList";

interface ExportStatusSectionProps {
  onOptionChange: (optionId: string, checked: boolean) => void;
  onSelectAll?: () => void;
  onClear?: () => void;
}

export function ExportStatusSection({
  onOptionChange,
  onSelectAll,
  onClear,
}: ExportStatusSectionProps) {
  const statusOptions: CheckboxOption[] = [
    { id: "success", label: "Success", checked: false },
    { id: "pending", label: "Pending", checked: false },
    { id: "failed", label: "Failed", checked: false },
    { id: "expired", label: "Expired", checked: false },
  ];

  return (
    <FilterSectionGeneric
      title="Payment Status"
      options={statusOptions}
      onOptionChange={onOptionChange}
      onSelectAll={onSelectAll}
      onClear={onClear}
      showSelectAll={true}
      showClear={true}
    />
  );
}

import { useTableTagsWithFilters } from "../../../../../core/hooks";

interface UseDisbursementTableTagsProps {
  activeDateFilter: string;
  dateType: string;
  selectedStatuses: string[];
  selectedTypes: string[];
  onRemoveDate: () => void;
  onRemoveStatus: () => void;
  onRemoveType: () => void;
}

export function useDisbursementTableTags({
  activeDateFilter,
  dateType,
  selectedStatuses,
  selectedTypes,
  onRemoveDate,
  onRemoveStatus,
  onRemoveType,
}: UseDisbursementTableTagsProps) {
  return useTableTagsWithFilters({
    activeDateFilter,
    dateType,
    dateLabelConfig: {
      defaultLabel: "Last Activity Date",
      alternativeLabel: "Created Date",
    },
    onRemoveDate,
    selectedStatuses,
    statusLabel: "Inquiry Status",
    onRemoveStatus,
    selectedTypes,
    typeLabel: "Creation Type",
    onRemoveType,
  });
}


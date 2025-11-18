import { useTableTagsWithFilters } from "../../../../../core/hooks";

interface UsePendingApprovalTableTagsProps {
  activeDateFilter: string;
  dateType: string;
  selectedStatuses: string[];
  selectedTypes: string[];
  onRemoveDate: () => void;
  onRemoveStatus: () => void;
  onRemoveType: () => void;
}

export function usePendingApprovalTableTags({
  activeDateFilter,
  dateType,
  selectedStatuses,
  selectedTypes,
  onRemoveDate,
  onRemoveStatus,
  onRemoveType,
}: UsePendingApprovalTableTagsProps) {
  return useTableTagsWithFilters({
    activeDateFilter,
    dateType,
    dateLabelConfig: {
      defaultLabel: "Last Activity Date",
      alternativeLabel: "Submitted Date",
    },
    onRemoveDate,
    selectedStatuses,
    statusLabel: "Status",
    onRemoveStatus,
    selectedTypes,
    typeLabel: "Creation Type",
    onRemoveType,
  });
}


import { useMemo } from "react";
import { format } from "date-fns";
import type { DataTableHeaderTag } from "@/components/reusable/table";
import { useTableTags } from "../../../../../core/hooks/table/useTableTags";
import { parseDateRangeString } from "../../../../../core/utils";

interface UseApprovalLogTableTagsProps {
  activeDateFilter: string;
  dateType: string;
  selectedStatuses: string[];
  selectedTypes: string[];
  onRemoveDate: () => void;
  onRemoveStatus: () => void;
  onRemoveType: () => void;
}

const DATE_LABEL_MAP: Record<string, string> = {
  lastActivityDate: "Last Activity Date",
  approvedDate: "Approved Date",
  scheduledDate: "Scheduled Date",
};

export function useApprovalLogTableTags({
  activeDateFilter,
  dateType,
  selectedStatuses,
  selectedTypes,
  onRemoveDate,
  onRemoveStatus,
  onRemoveType,
}: UseApprovalLogTableTagsProps) {
  const dateRange = activeDateFilter ? parseDateRangeString(activeDateFilter) : undefined;

  const baseTags = useTableTags({
    dateFilter: activeDateFilter
      ? {
          dateType,
          startDate: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "",
          endDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "",
        }
      : undefined,
    onRemoveDate,
  });

  const headerTags = useMemo<DataTableHeaderTag[]>(() => {
    const tags: DataTableHeaderTag[] = [...baseTags];

    if (activeDateFilter) {
      const dateTagIndex = tags.findIndex((tag) => tag.id === "date");
      if (dateTagIndex !== -1) {
        tags[dateTagIndex] = {
          id: "date",
          label: DATE_LABEL_MAP[dateType] || "Date",
          value: activeDateFilter,
          onRemove: onRemoveDate,
        };
      }
    }

    if (selectedStatuses.length > 0) {
      tags.push({
        id: "status",
        label: "Status",
        value: selectedStatuses.join(", "),
        onRemove: onRemoveStatus,
      });
    }

    if (selectedTypes.length > 0) {
      tags.push({
        id: "type",
        label: "Creation Type",
        value: selectedTypes.join(", "),
        onRemove: onRemoveType,
      });
    }

    return tags;
  }, [
    baseTags,
    activeDateFilter,
    dateType,
    selectedStatuses,
    selectedTypes,
    onRemoveDate,
    onRemoveStatus,
    onRemoveType,
  ]);

  return headerTags;
}


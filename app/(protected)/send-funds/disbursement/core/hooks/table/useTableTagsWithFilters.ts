import { useMemo } from "react";
import { format } from "date-fns";
import type { DataTableHeaderTag } from "@/components/reusable/table";
import { useTableTags } from "./useTableTags";
import { parseDateRangeString } from "../../utils";

export interface UseTableTagsWithFiltersOptions {
  // Date filter
  activeDateFilter?: string;
  dateType: string;
  dateLabelConfig?: {
    defaultLabel: string; // "Last Activity Date"
    alternativeLabel: string; // "Created Date" | "Submitted Date" | "Approved Date"
  };
  onRemoveDate?: () => void;

  // Status filter
  selectedStatuses?: string[];
  statusLabel?: string; // "Status" | "Inquiry Status"
  onRemoveStatus?: () => void;

  // Type filter
  selectedTypes?: string[];
  typeLabel?: string; // "Creation Type"
  onRemoveType?: () => void;
}

export function useTableTagsWithFilters(
  options: UseTableTagsWithFiltersOptions
): DataTableHeaderTag[] {
  const {
    activeDateFilter,
    dateType,
    dateLabelConfig = {
      defaultLabel: "Last Activity Date",
      alternativeLabel: "Date",
    },
    onRemoveDate,
    selectedStatuses = [],
    statusLabel = "Status",
    onRemoveStatus,
    selectedTypes = [],
    typeLabel = "Creation Type",
    onRemoveType,
  } = options;

  // Parse date range
  const dateRange = activeDateFilter ? parseDateRangeString(activeDateFilter) : undefined;

  // Get base tags from useTableTags
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

  // Build header tags with all filters
  const headerTags = useMemo<DataTableHeaderTag[]>(() => {
    const tags: DataTableHeaderTag[] = [...baseTags];

    // Override date tag label based on dateType
    if (activeDateFilter) {
      const dateTagIndex = tags.findIndex((tag) => tag.id === "date");
      if (dateTagIndex !== -1) {
        tags[dateTagIndex] = {
          id: "date",
          label:
            dateType === "lastActivityDate"
              ? dateLabelConfig.defaultLabel
              : dateLabelConfig.alternativeLabel,
          value: activeDateFilter,
          onRemove: onRemoveDate,
        };
      }
    }

    // Add status tag if statuses are selected
    if (selectedStatuses.length > 0) {
      tags.push({
        id: "status",
        label: statusLabel,
        value: selectedStatuses.join(", "),
        onRemove: onRemoveStatus,
      });
    }

    // Add type tag if types are selected
    if (selectedTypes.length > 0) {
      tags.push({
        id: "type",
        label: typeLabel,
        value: selectedTypes.join(", "),
        onRemove: onRemoveType,
      });
    }

    return tags;
  }, [
    baseTags,
    activeDateFilter,
    dateType,
    dateLabelConfig.defaultLabel,
    dateLabelConfig.alternativeLabel,
    selectedStatuses,
    statusLabel,
    selectedTypes,
    typeLabel,
    onRemoveDate,
    onRemoveStatus,
    onRemoveType,
  ]);

  return headerTags;
}


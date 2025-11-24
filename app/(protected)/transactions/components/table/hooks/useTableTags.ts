import { useMemo } from "react";
import type { DataTableHeaderTag } from "@/components/reusable/table/types";

export interface BaseTagConfig {
  dateFilter?: {
    dateType: string;
    startDate: string;
    endDate?: string;
    label?: string;
    displayValue?: string;
  };
  [key: string]: any;
}

export interface UseTableTagsOptions {
  dateFilter?: BaseTagConfig["dateFilter"];
  onRemoveDate?: () => void;
}

export function useTableTags(
  options?: UseTableTagsOptions
): DataTableHeaderTag[] {
  const tags = useMemo(() => {
    const result: DataTableHeaderTag[] = [];

    if (options?.dateFilter) {
      const { startDate, endDate, label, displayValue } = options.dateFilter;
      if (startDate) {
        // Use displayValue if provided, otherwise format the dates
        const value =
          displayValue || (endDate ? `${startDate} - ${endDate}` : startDate);
        result.push({
          id: "date",
          label: label || "Date",
          value,
          onRemove: options.onRemoveDate,
        });
      }
    }

    return result;
  }, [options?.dateFilter, options?.onRemoveDate]);

  return tags;
}

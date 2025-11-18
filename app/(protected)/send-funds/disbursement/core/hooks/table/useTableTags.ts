import { useMemo } from "react";
import type { DataTableHeaderTag } from "@/components/reusable/table/types";

export interface BaseTagConfig {
  dateFilter?: {
    dateType: string;
    startDate: string;
    endDate: string;
  };
  [key: string]: any;
}

export interface UseTableTagsOptions {
  dateFilter?: BaseTagConfig["dateFilter"];
  onRemoveDate?: () => void;
}

export function useTableTags(options?: UseTableTagsOptions): DataTableHeaderTag[] {
  const tags = useMemo(() => {
    const result: DataTableHeaderTag[] = [];

    if (options?.dateFilter) {
      const { startDate, endDate } = options.dateFilter;
      if (startDate && endDate) {
        result.push({
          id: "date",
          label: "Date",
          value: `${startDate} - ${endDate}`,
          onRemove: options.onRemoveDate,
        });
      }
    }

    return result;
  }, [options?.dateFilter, options?.onRemoveDate]);

  return tags;
}


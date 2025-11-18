import { useMemo } from "react";
import { format } from "date-fns";
import type { DataTableHeaderTag } from "@/components/reusable/table";
import { useTableTags } from "../../../../components/table/hooks";
import { parseDateRangeString } from "../../../../components/shared/utils";
import { PAY_OUT_PROVIDER_NAME_OPTIONS } from "../../../core/_consts";

interface UsePayOutTableTagsProps {
  activeDateFilter: string;
  dateType: string;
  selectedStatuses: string[];
  selectedTransactionTypes: string[];
  selectedProviderNames: string[];
  onRemoveDate: () => void;
  onRemoveStatus: () => void;
  onRemoveTransactionType: () => void;
  onRemoveProviderName: () => void;
}

export function usePayOutTableTags({
  activeDateFilter,
  dateType,
  selectedStatuses,
  selectedTransactionTypes,
  selectedProviderNames,
  onRemoveDate,
  onRemoveStatus,
  onRemoveTransactionType,
  onRemoveProviderName,
}: UsePayOutTableTagsProps) {
  const dateRange = activeDateFilter ? parseDateRangeString(activeDateFilter) : undefined;
  const baseTags = useTableTags({
    dateFilter: activeDateFilter ? {
      dateType,
      startDate: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "",
      endDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "",
    } : undefined,
    onRemoveDate,
  });

  const headerTags = useMemo<DataTableHeaderTag[]>(() => {
    const tags: DataTableHeaderTag[] = [...baseTags];

    if (activeDateFilter) {
      const dateTagIndex = tags.findIndex(tag => tag.id === "date");
      if (dateTagIndex !== -1) {
        tags[dateTagIndex] = {
          id: "date",
          label: dateType === "transactionDate" ? "Transaction Date" : "Served Date",
          value: activeDateFilter,
          onRemove: onRemoveDate,
        };
      }
    }

    if (selectedStatuses.length) {
      tags.push({
        id: "status",
        label: "Status",
        value: selectedStatuses.join(", "),
        onRemove: onRemoveStatus,
      });
    }

    if (selectedTransactionTypes.length) {
      tags.push({
        id: "transactionType",
        label: "Transaction Type",
        value: selectedTransactionTypes.join(", "),
        onRemove: onRemoveTransactionType,
      });
    }

    if (selectedProviderNames.length) {
      const providerLabels = selectedProviderNames.map((id) => {
        const option = PAY_OUT_PROVIDER_NAME_OPTIONS.find((opt) => opt.id === id);
        return option?.label || id;
      });
      tags.push({
        id: "providerName",
        label: "Provider Name",
        value: providerLabels.join(", "),
        onRemove: onRemoveProviderName,
      });
    }

    return tags;
  }, [
    baseTags,
    activeDateFilter,
    dateType,
    selectedStatuses,
    selectedTransactionTypes,
    selectedProviderNames,
    onRemoveDate,
    onRemoveStatus,
    onRemoveTransactionType,
    onRemoveProviderName,
  ]);

  return headerTags;
}


import { useMemo } from "react";
import { format } from "date-fns";
import type { DataTableHeaderTag } from "@/components/reusable/table";
import { useTableTags } from "../../../../components/table/hooks";
import { parseDateRangeString } from "../../../../components/shared/utils";

interface UsePayInTableTagsProps {
  activeDateFilter: string;
  dateType: string;
  selectedStatuses: string[];
  selectedActivities: string[];
  selectedProviderNames: string[];
  selectedPaymentMethods: string[];
  selectedVATypes: string[];
  selectedVAStatuses: string[];
  selectedVABanks: string[];
  selectedQRISAcquirers: string[];
  onRemoveDate: () => void;
  onRemoveStatus: () => void;
  onRemoveActivity: () => void;
  onRemoveProviderName: () => void;
  onRemovePaymentMethod: () => void;
  onRemoveVAType: () => void;
  onRemoveVAStatus: () => void;
  onRemoveVABanks: () => void;
  onRemoveQRISAcquirer: () => void;
}

export function usePayInTableTags({
  activeDateFilter,
  dateType,
  selectedStatuses,
  selectedActivities,
  selectedProviderNames,
  selectedPaymentMethods,
  selectedVATypes,
  selectedVAStatuses,
  selectedVABanks,
  selectedQRISAcquirers,
  onRemoveDate,
  onRemoveStatus,
  onRemoveActivity,
  onRemoveProviderName,
  onRemovePaymentMethod,
  onRemoveVAType,
  onRemoveVAStatus,
  onRemoveVABanks,
  onRemoveQRISAcquirer,
}: UsePayInTableTagsProps) {
  const dateRange = activeDateFilter
    ? parseDateRangeString(activeDateFilter)
    : undefined;
  const dateLabel =
    dateType === "transactionDate" ? "Transaction Date" : "Requested Date";

  const baseTags = useTableTags({
    dateFilter: activeDateFilter
      ? {
          dateType,
          startDate: dateRange?.from
            ? format(dateRange.from, "yyyy-MM-dd")
            : "",
          endDate: dateRange?.to
            ? format(dateRange.to, "yyyy-MM-dd")
            : undefined,
          label: dateLabel,
          displayValue: activeDateFilter,
        }
      : undefined,
    onRemoveDate,
  });

  const headerTags = useMemo<DataTableHeaderTag[]>(() => {
    const tags: DataTableHeaderTag[] = [...baseTags];

    if (selectedStatuses.length) {
      tags.push({
        id: "status",
        label: "Payment Status",
        value: selectedStatuses.join(", "),
        onRemove: onRemoveStatus,
      });
    }

    if (selectedVATypes.length) {
      tags.push({
        id: "vaType",
        label: "VA Type",
        value: selectedVATypes.join(", "),
        onRemove: onRemoveVAType,
      });
    }

    if (selectedVAStatuses.length) {
      tags.push({
        id: "vaStatus",
        label: "VA Status",
        value: selectedVAStatuses.join(", "),
        onRemove: onRemoveVAStatus,
      });
    }

    if (selectedVABanks.length) {
      tags.push({
        id: "vaBanks",
        label: "Banks",
        value: selectedVABanks.join(", "),
        onRemove: onRemoveVABanks,
      });
    }

    if (selectedQRISAcquirers.length) {
      tags.push({
        id: "qrisAcquirer",
        label: "Acquirer",
        value: selectedQRISAcquirers.join(", "),
        onRemove: onRemoveQRISAcquirer,
      });
    }

    if (selectedActivities.length) {
      tags.push({
        id: "activity",
        label: "Activity",
        value: selectedActivities.join(", "),
        onRemove: onRemoveActivity,
      });
    }

    if (selectedProviderNames.length) {
      tags.push({
        id: "providerName",
        label: "Provider Name",
        value: selectedProviderNames.join(", "),
        onRemove: onRemoveProviderName,
      });
    }

    if (selectedPaymentMethods.length) {
      tags.push({
        id: "paymentMethod",
        label: "Payment Method",
        value: selectedPaymentMethods.join(", "),
        onRemove: onRemovePaymentMethod,
      });
    }

    return tags;
  }, [
    baseTags,
    activeDateFilter,
    dateType,
    selectedStatuses,
    selectedActivities,
    selectedProviderNames,
    selectedPaymentMethods,
    selectedVATypes,
    selectedVAStatuses,
    selectedVABanks,
    selectedQRISAcquirers,
    onRemoveDate,
    onRemoveStatus,
    onRemoveActivity,
    onRemoveProviderName,
    onRemovePaymentMethod,
    onRemoveVAType,
    onRemoveVAStatus,
    onRemoveVABanks,
    onRemoveQRISAcquirer,
  ]);

  return headerTags;
}

import { useTableFilters } from "./useTableFilters";
import {
  PROVIDER_MASTER_DATA_FILTER_KEYS,
  PROVIDER_MASTER_DATA_FILTER_LABELS,
  PROVIDER_MASTER_DATA_SEARCH_FIELDS,
  PROVIDER_MASTER_DATA_STATUS_OPTIONS,
  PROVIDER_MASTER_DATA_DEFAULT_DATE_TYPE,
  PROVIDER_MASTER_DATA_PROVIDER_TYPE_OPTIONS,
} from "../../../../core/constants";
import { ProviderMasterData } from "../../../../core/_models";

export function useProviderMasterDataFilters(data: ProviderMasterData[]) {
  return useTableFilters<ProviderMasterData>({
    data,
    defaultSearchField: PROVIDER_MASTER_DATA_SEARCH_FIELDS[0].value,
    defaultDateType: PROVIDER_MASTER_DATA_DEFAULT_DATE_TYPE,
    filterSections: {
      status: {
        key: PROVIDER_MASTER_DATA_FILTER_KEYS.STATUS,
        label: PROVIDER_MASTER_DATA_FILTER_LABELS.STATUS,
        options: PROVIDER_MASTER_DATA_STATUS_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
      type: {
        key: PROVIDER_MASTER_DATA_FILTER_KEYS.PROVIDER_TYPE,
        label: PROVIDER_MASTER_DATA_FILTER_LABELS.PROVIDER_TYPE,
        options: PROVIDER_MASTER_DATA_PROVIDER_TYPE_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
    },
    searchResolver: (row, field, value) => {
      const normalized = value.toLowerCase();
      if (field === "providerId") {
        return row.providerId.toLowerCase().includes(normalized);
      }
      if (field === "providerName") {
        return row.providerName.toLowerCase().includes(normalized);
      }
      if (field === "providerType") {
        return row.providerType.toLowerCase().includes(normalized);
      }
      return false;
    },
    dateResolver: (row, dateType) =>
      dateType === "updatedDate" ? row.updatedDate : row.registeredDate,
  });
}


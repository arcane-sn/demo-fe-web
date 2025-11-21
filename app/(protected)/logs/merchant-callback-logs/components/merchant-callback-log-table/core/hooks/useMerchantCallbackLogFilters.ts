import { useTableFilters } from "./useTableFilters";
import {
  MERCHANT_CALLBACK_LOG_FILTER_KEYS,
  MERCHANT_CALLBACK_LOG_FILTER_LABELS,
  MERCHANT_CALLBACK_LOG_SEARCH_FIELDS,
  MERCHANT_CALLBACK_LOG_DEFAULT_DATE_TYPE,
  MERCHANT_CALLBACK_LOG_STATUS_OPTIONS,
} from "../../../../core/constants";
import { MerchantCallbackLogData } from "../../../../core/types";

export function useMerchantCallbackLogFilters(data: MerchantCallbackLogData[]) {
  return useTableFilters<MerchantCallbackLogData>({
    data,
    defaultSearchField: MERCHANT_CALLBACK_LOG_SEARCH_FIELDS[0].value,
    defaultDateType: MERCHANT_CALLBACK_LOG_DEFAULT_DATE_TYPE,
    filterSections: {
      status: {
        key: MERCHANT_CALLBACK_LOG_FILTER_KEYS.STATUS,
        label: MERCHANT_CALLBACK_LOG_FILTER_LABELS.STATUS,
        options: MERCHANT_CALLBACK_LOG_STATUS_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
    },
    searchResolver: (row, field, value) => {
      const normalized = value.toLowerCase();
      if (field === "merchantName") {
        return row.merchantName?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "clientId") {
        return row.clientId?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "referenceNumber") {
        return row.referenceNumber?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "partnerReferenceNumber") {
        return row.partnerReferenceNumber?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "url") {
        return row.url?.toLowerCase().includes(normalized) ?? false;
      }
      return false;
    },
    dateResolver: (row, dateType) => {
      if (dateType === "createdDate") return row.createdDate;
      if (dateType === "updatedDate") return row.updatedDate;
      return row.createdDate;
    },
    statusResolver: (row, selectedStatuses) => {
      return selectedStatuses.includes(row.status);
    },
  });
}


import { useTableFilters } from "./useTableFilters";
import {
  ACCOUNT_INQUIRY_FILTER_KEYS,
  ACCOUNT_INQUIRY_FILTER_LABELS,
  ACCOUNT_INQUIRY_SEARCH_FIELDS,
  ACCOUNT_INQUIRY_STATUS_OPTIONS,
} from "../../../../core/constants";
import { AccountInquiryRecord } from "../models";

export function useAccountInquiryFilters(data: AccountInquiryRecord[]) {
  return useTableFilters<AccountInquiryRecord>({
    data,
    defaultSearchField: ACCOUNT_INQUIRY_SEARCH_FIELDS[0].value,
    filterSections: {
      status: {
        key: ACCOUNT_INQUIRY_FILTER_KEYS.STATUS,
        label: ACCOUNT_INQUIRY_FILTER_LABELS.STATUS,
        options: ACCOUNT_INQUIRY_STATUS_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
    },
    searchResolver: (row, field, value) => {
      const normalized = value.toLowerCase();
      if (field === "accountName") {
        return row.accountName?.toLowerCase().includes(normalized);
      }
      if (field === "bankNameCode") {
        return row.bankNameCode.toLowerCase().includes(normalized);
      }
      return row.accountNumber.replace(/\s/g, "").toLowerCase().includes(
        normalized.replace(/\s/g, ""),
      );
    },
    dateResolver: (row) => row.activityDate,
  });
}


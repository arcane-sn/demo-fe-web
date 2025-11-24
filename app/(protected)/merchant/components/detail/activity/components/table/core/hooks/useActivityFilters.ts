import { useTableFilters } from "./useTableFilters";
import {
  ACTIVITY_FILTER_KEYS,
  ACTIVITY_FILTER_LABELS,
  ACTIVITY_SEARCH_FIELDS,
  ACTIVITY_DEFAULT_DATE_TYPE,
  ACTIVITY_STATUS_OPTIONS,
  ACTIVITY_ACTION_OPTIONS,
  ACTIVITY_DATA_DATE_FORMAT,
} from "../../../../core/constants";
import { ActivityLog } from "../../../types";

export function useActivityFilters(data: ActivityLog[]) {
  return useTableFilters<ActivityLog>({
    data,
    defaultSearchField: ACTIVITY_SEARCH_FIELDS[0].value,
    defaultDateType: ACTIVITY_DEFAULT_DATE_TYPE,
    filterSections: {
      status: {
        key: ACTIVITY_FILTER_KEYS.STATUS,
        label: ACTIVITY_FILTER_LABELS.STATUS,
        options: ACTIVITY_STATUS_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
      action: {
        key: ACTIVITY_FILTER_KEYS.ACTION,
        label: ACTIVITY_FILTER_LABELS.ACTION,
        options: ACTIVITY_ACTION_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
    },
    searchResolver: (row, field, value) => {
      const normalized = value.toLowerCase();
      if (field === "action") {
        return row.action.toLowerCase().includes(normalized);
      }
      if (field === "description") {
        return row.description.toLowerCase().includes(normalized);
      }
      if (field === "user") {
        return row.user.toLowerCase().includes(normalized);
      }
      if (field === "ipAddress") {
        return row.ipAddress.toLowerCase().includes(normalized);
      }
      return false;
    },
    dateResolver: (row) => row.timestamp,
    statusResolver: (row, selectedStatuses) => {
      return selectedStatuses.includes(row.status);
    },
  });
}


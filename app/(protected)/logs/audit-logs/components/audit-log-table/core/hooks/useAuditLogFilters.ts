import { useTableFilters } from "./useTableFilters";
import {
  AUDIT_LOG_FILTER_KEYS,
  AUDIT_LOG_FILTER_LABELS,
  AUDIT_LOG_SEARCH_FIELDS,
  AUDIT_LOG_DEFAULT_DATE_TYPE,
  AUDIT_LOG_ACTION_OPTIONS,
} from "../../../../core/constants";
import { AuditLogData } from "../types";

export function useAuditLogFilters(data: AuditLogData[]) {
  return useTableFilters<AuditLogData>({
    data,
    defaultSearchField: AUDIT_LOG_SEARCH_FIELDS[0].value,
    defaultDateType: AUDIT_LOG_DEFAULT_DATE_TYPE,
    filterSections: {
      action: {
        key: AUDIT_LOG_FILTER_KEYS.ACTION,
        label: AUDIT_LOG_FILTER_LABELS.ACTION,
        options: AUDIT_LOG_ACTION_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
    },
    searchResolver: (row, field, value) => {
      const normalized = value.toLowerCase();
      if (field === "userId") {
        return row.userId?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "user") {
        const userName = row.user?.name?.toLowerCase() ?? "";
        const userEmail = row.user?.email?.toLowerCase() ?? "";
        return userName.includes(normalized) || userEmail.includes(normalized);
      }
      if (field === "sectionType") {
        return row.sectionType?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "sectionId") {
        return row.sectionId?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "ipAddress") {
        return row.ipAddress?.toLowerCase().includes(normalized) ?? false;
      }
      return false;
    },
    dateResolver: (row, dateType) => {
      if (dateType === "activityDate") return row.timestamp;
      return row.timestamp;
    },
    actionResolver: (row, selectedActions) => {
      const actions = Array.isArray(row.action) ? row.action : [row.action];
      return actions.some((action) => selectedActions.includes(action));
    },
  });
}


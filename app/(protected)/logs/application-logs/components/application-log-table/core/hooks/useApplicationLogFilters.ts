import { useTableFilters } from "./useTableFilters";
import {
  APPLICATION_LOG_FILTER_KEYS,
  APPLICATION_LOG_FILTER_LABELS,
  APPLICATION_LOG_SEARCH_FIELDS,
  APPLICATION_LOG_DEFAULT_DATE_TYPE,
  APPLICATION_LOG_LEVEL_OPTIONS,
  APPLICATION_LOG_SERVICE_OPTIONS,
  APPLICATION_LOG_EVENT_TYPE_OPTIONS,
  APPLICATION_LOG_ENV_OPTIONS,
} from "../../../../core/constants";
import { ApplicationLogData } from "../../../../core/types";

export function useApplicationLogFilters(data: ApplicationLogData[]) {
  return useTableFilters<ApplicationLogData>({
    data,
    defaultSearchField: APPLICATION_LOG_SEARCH_FIELDS[0].value,
    defaultDateType: APPLICATION_LOG_DEFAULT_DATE_TYPE,
    filterSections: {
      level: {
        key: APPLICATION_LOG_FILTER_KEYS.LEVEL,
        label: APPLICATION_LOG_FILTER_LABELS.LEVEL,
        options: APPLICATION_LOG_LEVEL_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
      serviceName: {
        key: APPLICATION_LOG_FILTER_KEYS.SERVICE_NAME,
        label: APPLICATION_LOG_FILTER_LABELS.SERVICE_NAME,
        options: APPLICATION_LOG_SERVICE_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
      eventType: {
        key: APPLICATION_LOG_FILTER_KEYS.EVENT_TYPE,
        label: APPLICATION_LOG_FILTER_LABELS.EVENT_TYPE,
        options: APPLICATION_LOG_EVENT_TYPE_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
      env: {
        key: APPLICATION_LOG_FILTER_KEYS.ENV,
        label: APPLICATION_LOG_FILTER_LABELS.ENV,
        options: APPLICATION_LOG_ENV_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
    },
    searchResolver: (row, field, value) => {
      const normalized = value.toLowerCase();
      if (field === "logId") {
        return row.logId?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "serviceName") {
        return row.serviceName?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "eventType") {
        return row.eventType?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "userId") {
        return row.userId?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "clientId") {
        return row.clientId?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "traceId") {
        return row.traceId?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "ipAddress") {
        return row.ipAddress?.toLowerCase().includes(normalized) ?? false;
      }
      return false;
    },
    dateResolver: (row, dateType) => {
      if (dateType === "timestamp") return row.timestamp;
      return row.timestamp;
    },
    levelResolver: (row, selectedLevels) => {
      return selectedLevels.includes(row.level);
    },
    serviceNameResolver: (row, selectedServices) => {
      return selectedServices.includes(row.serviceName);
    },
    eventTypeResolver: (row, selectedEventTypes) => {
      return selectedEventTypes.includes(row.eventType);
    },
    envResolver: (row, selectedEnvs) => {
      return selectedEnvs.includes(row.env);
    },
  });
}

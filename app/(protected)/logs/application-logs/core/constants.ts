"use client";

export const APPLICATION_LOG_SEARCH_FIELDS = [
  { label: "Log ID", value: "logId" },
  { label: "Service Name", value: "serviceName" },
  { label: "Event Type", value: "eventType" },
  { label: "User ID", value: "userId" },
  { label: "Client ID", value: "clientId" },
  { label: "Trace ID", value: "traceId" },
  { label: "IP Address", value: "ipAddress" },
] as const;

export const APPLICATION_LOG_LEVEL_OPTIONS = [
  { label: "INFO", value: "INFO" },
  { label: "WARN", value: "WARN" },
  { label: "ERROR", value: "ERROR" },
  { label: "DEBUG", value: "DEBUG" },
] as const;

export const APPLICATION_LOG_SERVICE_OPTIONS = [
  { label: "Payment Service", value: "Payment Service" },
  { label: "User Service", value: "User Service" },
  { label: "Auth Service", value: "Auth Service" },
  { label: "Notification Service", value: "Notification Service" },
  { label: "Merchant Service", value: "Merchant Service" },
] as const;

export const APPLICATION_LOG_EVENT_TYPE_OPTIONS = [
  { label: "API Request", value: "API Request" },
  { label: "API Response", value: "API Response" },
  { label: "Database Query", value: "Database Query" },
  { label: "External API Call", value: "External API Call" },
  { label: "System Event", value: "System Event" },
] as const;

export const APPLICATION_LOG_ENV_OPTIONS = [
  { label: "Development", value: "development" },
  { label: "Staging", value: "staging" },
  { label: "Production", value: "production" },
] as const;

export const APPLICATION_LOG_FILTER_KEYS = {
  LEVEL: "level",
  SERVICE_NAME: "serviceName",
  EVENT_TYPE: "eventType",
  ENV: "env",
} as const;

export const APPLICATION_LOG_FILTER_LABELS = {
  LEVEL: "Level",
  SERVICE_NAME: "Service Name",
  EVENT_TYPE: "Event Type",
  ENV: "Environment",
} as const;

export const APPLICATION_LOG_SEARCH_PLACEHOLDER =
  "Search log ID, service name, event type, user ID, client ID, trace ID, or IP address...";

export const APPLICATION_LOG_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy";
export const APPLICATION_LOG_DISPLAY_DATE_FORMAT = "MMM dd, yyyy";
export const APPLICATION_LOG_DEFAULT_DATE_TYPE = "timestamp";
export const APPLICATION_LOG_DATE_TYPE_OPTIONS = [
  { label: "Timestamp", value: "timestamp" },
] as const;

export const APPLICATION_LOG_PAGE_SIZE = 10;
export const APPLICATION_LOG_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const APPLICATION_LOG_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const APPLICATION_LOG_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const APPLICATION_LOG_DATE_FILTER_PLACEHOLDER = "Timestamp";

export const APPLICATION_LOG_EMPTY_STATE = {
  defaultTitle: "No Application Logs Found",
  defaultDescription:
    "You don't have any application logs yet. Application logs will appear here as system activities occur.",
  filteredTitle: "No Results Found",
  filteredDescription:
    "No application logs match your filters. Try adjusting search or filters.",
} as const;

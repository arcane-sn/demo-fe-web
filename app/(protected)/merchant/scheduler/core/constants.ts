"use client";

import { SCHEDULER_FIELDS } from "../data/constants";

export const SCHEDULER_SEARCH_FIELDS = [
  { label: "Merchant Name", value: "merchantName" },
  { label: "Client ID", value: "clientId" },
] as const;

export const SCHEDULER_TOOLBAR_ACTIONS = [
  { id: "filter", label: "Filter" },
  { id: "export", label: "Export" },
] as const;

export const SCHEDULER_DATE_DISPLAY_FORMAT = "EEE, MMM dd, yyyy";
export const SCHEDULER_DATA_DATE_FORMAT = "EEE, MMM dd, yyyy";
export const SCHEDULER_DEFAULT_DATE_TYPE = "updatedDate";

export const SCHEDULER_DATE_TYPE_OPTIONS = [
  { label: "Updated Date", value: "updatedDate" },
] as const;

export const SCHEDULER_DATE_RANGE_PLACEHOLDER = "01/01/2025 - 31/12/2025";

export const SCHEDULER_PAGE_SIZE = 10;
export const SCHEDULER_PAGE_SIZE_OPTIONS = [10, 20, 50];

export const SCHEDULER_FILTER_KEYS = {
  ACTIVE_SERVICES: "activeServices",
  INACTIVE_SERVICES: "inactiveServices",
} as const;

export const SCHEDULER_FILTER_LABELS = {
  ACTIVE_SERVICES: "Active Scheduler",
  INACTIVE_SERVICES: "Inactive Scheduler",
} as const;

export type SchedulerServiceKey = (typeof SCHEDULER_FIELDS)[number]["key"];

export const SCHEDULER_SERVICE_OPTIONS = SCHEDULER_FIELDS.map((field) => ({
  label: field.label,
  value: field.key,
}));

export const SCHEDULER_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;


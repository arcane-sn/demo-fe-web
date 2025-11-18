import type { CheckboxOption } from "@/components/reusable/CheckboxList";

export const DEFAULT_SEARCH_FIELD = "creationId";

export const STATUS_OPTIONS: CheckboxOption[] = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
] as const;

export const TYPE_OPTIONS: CheckboxOption[] = [
  { id: "single", label: "Single" },
  { id: "batch", label: "Batch" },
] as const;

export const STATUS_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
} as const;

export const FILTER_SECTION_LABELS = {
  TYPE: "Creation Type",
} as const;

export const FILTER_SECTION_KEYS = {
  TYPE: "type",
} as const;


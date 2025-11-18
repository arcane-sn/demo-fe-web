import type { CheckboxOption } from "@/components/reusable/CheckboxList";

export const DEFAULT_SEARCH_FIELD = "creationId";

export const STATUS_OPTIONS: CheckboxOption[] = [
  { id: "approved", label: "Approved" },
  { id: "scheduled", label: "Scheduled" },
  { id: "processing", label: "Processing" },
  { id: "partially-complete", label: "Partially Complete" },
  { id: "completed", label: "Completed" },
  { id: "rejected", label: "Rejected" },
] as const;

export const TYPE_OPTIONS: CheckboxOption[] = [
  { id: "single", label: "Single" },
  { id: "batch", label: "Batch" },
] as const;

export const FILTER_SECTION_LABELS = {
  STATUS: "Status",
  TYPE: "Creation Type",
} as const;

export const FILTER_SECTION_KEYS = {
  STATUS: "status",
  TYPE: "type",
} as const;


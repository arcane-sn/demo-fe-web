import type { CheckboxOption } from "@/components/reusable/CheckboxList";

export const DEFAULT_SEARCH_FIELD = "creationId";

export const STATUS_OPTIONS: CheckboxOption[] = [
  { id: "draft", label: "Draft" },
  { id: "inquiry-process", label: "Inquiry Process" },
  { id: "valid", label: "Valid" },
  { id: "issue", label: "Issue" },
  { id: "uploaded", label: "Uploaded" },
] as const;

export const TYPE_OPTIONS: CheckboxOption[] = [
  { id: "single", label: "Single" },
  { id: "batch", label: "Batch" },
] as const;

export const FILTER_SECTION_LABELS = {
  STATUS: "Inquiry Status",
  TYPE: "Creation Type",
} as const;

export const FILTER_SECTION_KEYS = {
  STATUS: "status",
  TYPE: "type",
} as const;


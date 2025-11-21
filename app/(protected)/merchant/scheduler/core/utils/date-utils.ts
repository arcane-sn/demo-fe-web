import { format, parse, isValid } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  SCHEDULER_DATE_DISPLAY_FORMAT,
  SCHEDULER_DATA_DATE_FORMAT,
} from "../constants";

export function formatDateRange(range?: DateRange): string {
  if (!range?.from) return "";
  if (range.to) {
    return `${format(range.from, SCHEDULER_DATE_DISPLAY_FORMAT)} - ${format(
      range.to,
      SCHEDULER_DATE_DISPLAY_FORMAT,
    )}`;
  }
  return format(range.from, SCHEDULER_DATE_DISPLAY_FORMAT);
}

export function parseDateRangeString(input?: string): DateRange | undefined {
  if (!input) return undefined;
  const [fromStr, toStr] = input.split("-");

  const parseWithFormats = (value: string) => {
    const normalized = value.trim();
    if (!normalized) return undefined;
    const formats = [SCHEDULER_DATE_DISPLAY_FORMAT, "dd/MM/yyyy"];
    for (const fmt of formats) {
      const parsed = parse(normalized, fmt, new Date());
      if (isValid(parsed)) {
        return parsed;
      }
    }
    return undefined;
  };

  const from = parseWithFormats(fromStr);
  if (!from) return undefined;

  if (toStr) {
    const to = parseWithFormats(toStr);
    if (to) {
      return { from, to };
    }
  }

  return { from };
}

export function formatDataDate(value: string): Date {
  return parse(value, SCHEDULER_DATA_DATE_FORMAT, new Date());
}


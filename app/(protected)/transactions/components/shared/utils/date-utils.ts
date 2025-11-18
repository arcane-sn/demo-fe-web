import { format, parse, isValid } from "date-fns";
import type { DateRange } from "react-day-picker";
import { DISPLAY_DATE_FORMAT } from "../../../core/_constants";

export function formatDateRange(range?: DateRange): string {
  if (!range?.from) return "";
  if (range.to) {
    return `${format(range.from, DISPLAY_DATE_FORMAT)} - ${format(range.to, DISPLAY_DATE_FORMAT)}`;
  }
  return format(range.from, DISPLAY_DATE_FORMAT);
}

export function parseDateRangeString(input?: string): DateRange | undefined {
  if (!input) return undefined;
  const [fromStr, toStr] = input.split("-");
  const from = parse(fromStr.trim(), DISPLAY_DATE_FORMAT, new Date());
  if (!isValid(from)) return undefined;
  if (toStr) {
    const to = parse(toStr.trim(), DISPLAY_DATE_FORMAT, new Date());
    if (isValid(to)) {
      return { from, to };
    }
  }
  return { from };
}


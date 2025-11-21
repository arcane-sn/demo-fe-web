import { format, parse, isValid } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  MERCHANT_BALANCE_DATA_DATE_FORMAT,
  MERCHANT_BALANCE_DISPLAY_DATE_FORMAT,
} from "../constants";

export function formatDateRange(range?: DateRange): string {
  if (!range?.from) return "";
  if (range.to) {
    return `${format(range.from, MERCHANT_BALANCE_DISPLAY_DATE_FORMAT)} - ${format(range.to, MERCHANT_BALANCE_DISPLAY_DATE_FORMAT)}`;
  }
  return format(range.from, MERCHANT_BALANCE_DISPLAY_DATE_FORMAT);
}

export function parseDateRangeString(
  dateString: string
): DateRange | undefined {
  if (!dateString) return undefined;
  const parts = dateString.split(" - ");
  if (parts.length === 1) {
    const parsed = parse(
      parts[0],
      MERCHANT_BALANCE_DISPLAY_DATE_FORMAT,
      new Date()
    );
    if (isValid(parsed)) {
      return { from: parsed };
    }
  } else if (parts.length === 2) {
    const from = parse(
      parts[0],
      MERCHANT_BALANCE_DISPLAY_DATE_FORMAT,
      new Date()
    );
    const to = parse(
      parts[1],
      MERCHANT_BALANCE_DISPLAY_DATE_FORMAT,
      new Date()
    );
    if (isValid(from) && isValid(to)) {
      return { from, to };
    }
  }
  return undefined;
}

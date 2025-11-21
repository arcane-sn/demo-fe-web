import { format, parse, isValid, parseISO } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  MERCHANT_REVIEW_DATE_DISPLAY_FORMAT,
  MERCHANT_REVIEW_DATA_DATE_FORMAT,
} from "../constants";

export function formatDateRange(range?: DateRange): string {
  if (!range?.from) return "";
  if (range.to) {
    return `${format(range.from, MERCHANT_REVIEW_DATE_DISPLAY_FORMAT)} - ${format(
      range.to,
      MERCHANT_REVIEW_DATE_DISPLAY_FORMAT,
    )}`;
  }
  return format(range.from, MERCHANT_REVIEW_DATE_DISPLAY_FORMAT);
}

export function parseDateRangeString(input?: string): DateRange | undefined {
  if (!input) return undefined;
  const [fromStr, toStr] = input.split("-");
  const from = parse(fromStr.trim(), MERCHANT_REVIEW_DATE_DISPLAY_FORMAT, new Date());
  if (!isValid(from)) return undefined;
  if (toStr) {
    const to = parse(toStr.trim(), MERCHANT_REVIEW_DATE_DISPLAY_FORMAT, new Date());
    if (isValid(to)) {
      return { from, to };
    }
  }
  return { from };
}

export function parseCreatedDate(value?: string) {
  if (!value) return null;
  const parsed = parse(value, MERCHANT_REVIEW_DATA_DATE_FORMAT, new Date());
  return isValid(parsed) ? parsed : null;
}

export function parseSubmittedDate(value?: string) {
  if (!value) return null;
  const parsed = parseISO(value);
  return isValid(parsed) ? parsed : null;
}


import { parse, isValid, format } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  CHANNEL_LIST_DATE_DISPLAY_FORMAT,
  CHANNEL_LIST_DATA_DATE_FORMAT,
} from "../constants";

export function formatDateRange(range?: DateRange): string {
  if (!range?.from) return "";
  if (range.to) {
    return `${format(range.from, CHANNEL_LIST_DATE_DISPLAY_FORMAT)} - ${format(
      range.to,
      CHANNEL_LIST_DATE_DISPLAY_FORMAT,
    )}`;
  }
  return format(range.from, CHANNEL_LIST_DATE_DISPLAY_FORMAT);
}

export function parseDateRangeString(input?: string): DateRange | undefined {
  if (!input) return undefined;
  const [fromStr, toStr] = input.split("-");
  const from = parse(fromStr.trim(), CHANNEL_LIST_DATE_DISPLAY_FORMAT, new Date());
  if (!isValid(from)) return undefined;
  if (toStr) {
    const to = parse(toStr.trim(), CHANNEL_LIST_DATE_DISPLAY_FORMAT, new Date());
    if (isValid(to)) {
      return { from, to };
    }
  }
  return { from };
}

function parseChannelDate(value?: string) {
  if (!value) return null;
  const parsed = parse(value, CHANNEL_LIST_DATA_DATE_FORMAT, new Date());
  return isValid(parsed) ? parsed : null;
}

export function parseRegisteredDate(dateInfo?: { date: string }) {
  return parseChannelDate(dateInfo?.date);
}

export function parseUpdatedDate(dateInfo?: { date: string }) {
  return parseChannelDate(dateInfo?.date);
}


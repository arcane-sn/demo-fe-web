"use client";

import { SettlementHistoryData } from "../../../../core/models";
import {
  SETTLEMENT_SEARCH_FIELDS,
  SETTLEMENT_FILTER_KEYS,
  SETTLEMENT_FILTER_LABELS,
  SETTLEMENT_STATUS_OPTIONS,
} from "../../../../core/constants";
import { useTableFilters } from "./useTableFilters";

export function useSettlementHistoryFilters(data: SettlementHistoryData[]) {
  return useTableFilters<SettlementHistoryData>({
    data,
    defaultSearchField: SETTLEMENT_SEARCH_FIELDS[0].value,
    filterSections: {
      status: {
        key: SETTLEMENT_FILTER_KEYS.STATUS,
        label: SETTLEMENT_FILTER_LABELS.STATUS,
        options: [...SETTLEMENT_STATUS_OPTIONS],
      },
    },
    searchResolver: (row, field, value) => {
      const normalized = value.toLowerCase();
      switch (field) {
        case "merchantName":
          return row.merchantName.toLowerCase().includes(normalized);
        case "clientId":
          return row.clientId.toLowerCase().includes(normalized);
        case "settlementId":
          return row.settlementId.toLowerCase().includes(normalized);
        case "reportId":
          return row.reportId.toLowerCase().includes(normalized);
        case "channel":
          return row.channel.toLowerCase().includes(normalized);
        default:
          return false;
      }
    },
    dateResolver: (row, dateType) => {
      if (dateType === "reportDate") {
        return row.reportDate;
      }
      return row.settlementDate;
    },
  });
}


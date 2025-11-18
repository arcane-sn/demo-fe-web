import { ApprovalLogData } from "../models";
import { useTableFilters } from "../../../shared/hooks";
import {
  DEFAULT_SEARCH_FIELD,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  FILTER_SECTION_LABELS,
  FILTER_SECTION_KEYS,
} from "../_constants";

export function useApprovalLogFilters(data: ApprovalLogData[] = []) {
  return useTableFilters<ApprovalLogData>({
    data,
    defaultSearchField: DEFAULT_SEARCH_FIELD,
    filterSections: {
      status: {
        key: FILTER_SECTION_KEYS.STATUS,
        label: FILTER_SECTION_LABELS.STATUS,
        options: STATUS_OPTIONS,
      },
      type: {
        key: FILTER_SECTION_KEYS.TYPE,
        label: FILTER_SECTION_LABELS.TYPE,
        options: TYPE_OPTIONS,
      },
    },
    searchResolver: (row, searchField, searchValue) => {
      switch (searchField) {
        case 'createdBy':
          const searchableText = `${row.createdBy.name} ${row.createdBy.email}`.toLowerCase();
          return searchableText.includes(searchValue);
        case 'creationId':
          return row.creationId.toLowerCase().includes(searchValue);
        default:
          const target = row[searchField as keyof ApprovalLogData];
          return target ? String(target).toLowerCase().includes(searchValue) : false;
      }
    },
    dateResolver: (row, dateType) => {
      switch (dateType) {
        case 'approvedDate':
          return row.approvedDate;
        case 'scheduledDate':
          return row.scheduledDate || row.lastActivityDate;
        case 'lastActivityDate':
        default:
          return row.lastActivityDate;
      }
    },
  });
}

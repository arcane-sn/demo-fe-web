import { PendingApprovalData } from "../models";
import { useTableFilters } from "../../../shared/hooks";
import {
  DEFAULT_SEARCH_FIELD,
  TYPE_OPTIONS,
  FILTER_SECTION_LABELS,
  FILTER_SECTION_KEYS,
} from "../_constants";

export function usePendingApprovalFilters(data: PendingApprovalData[] = []) {
  return useTableFilters<PendingApprovalData>({
    data,
    defaultSearchField: DEFAULT_SEARCH_FIELD,
    filterSections: {
      // Note: Status filter not included as PendingApprovalData doesn't have status field
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
          const target = row[searchField as keyof PendingApprovalData];
          return target ? String(target).toLowerCase().includes(searchValue) : false;
      }
    },
    dateResolver: (row, dateType) => {
      switch (dateType) {
        case 'submittedDate':
          return row.submittedDate;
        case 'lastActivityDate':
        default:
          return row.lastActivityDate;
      }
    },
  });
}

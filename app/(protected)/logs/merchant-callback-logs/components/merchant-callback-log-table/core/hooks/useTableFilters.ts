import { useState, useMemo, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import {
  parse,
  isValid,
  startOfDay,
  endOfDay,
  isAfter,
  isBefore,
} from "date-fns";
import {
  MERCHANT_CALLBACK_LOG_DATA_DATE_FORMAT,
  MERCHANT_CALLBACK_LOG_DEFAULT_DATE_TYPE,
} from "../../../../core/constants";
import {
  formatDateRange,
  parseDateRangeString,
  collectCheckedValues,
  buildSectionFromOptions,
} from "../../../../core/utils";

export interface UseTableFiltersConfig<T> {
  data: T[];
  defaultSearchField: string;
  defaultDateType?: string;
  filterSections: {
    status?: { key: string; label: string; options: any[] };
  };
  searchResolver: (row: T, searchField: string, searchValue: string) => boolean;
  dateResolver: (row: T, dateType: string) => string;
  statusResolver?: (row: T, selectedStatuses: string[]) => boolean;
}

export function useTableFilters<T>({
  data,
  defaultSearchField,
  defaultDateType = MERCHANT_CALLBACK_LOG_DEFAULT_DATE_TYPE,
  filterSections,
  searchResolver,
  dateResolver,
  statusResolver,
}: UseTableFiltersConfig<T>) {
  const statusSectionKey = filterSections.status?.key ?? "status";

  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(defaultSearchField);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState(defaultDateType);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const [draftDateRange, setDraftDateRange] = useState<DateRange | undefined>(
    dateRange
  );
  const [draftDateType, setDraftDateType] = useState(dateType);
  const [draftDateFilterString, setDraftDateFilterString] = useState<string>(
    formatDateRange(dateRange)
  );

  const activeRange = useMemo(
    () => dateRange ?? parseDateRangeString(activeDateFilter),
    [dateRange, activeDateFilter]
  );

  const filteredData = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const statusesSet = selectedStatuses.length
      ? new Set(selectedStatuses)
      : null;

    return data.filter((row) => {
      if (
        normalizedSearch &&
        !searchResolver(row, searchField, normalizedSearch)
      ) {
        return false;
      }

      if (statusesSet && statusResolver) {
        if (!statusResolver(row, selectedStatuses)) {
          return false;
        }
      }

      if (activeRange?.from) {
        const dateFieldValue = dateResolver(row, dateType);
        let parsedDate = new Date(dateFieldValue);
        if (!isValid(parsedDate)) {
          parsedDate = parse(
            dateFieldValue,
            MERCHANT_CALLBACK_LOG_DATA_DATE_FORMAT,
            new Date()
          );
        }
        if (isValid(parsedDate)) {
          const from = startOfDay(activeRange.from);
          const to = startOfDay(activeRange.to ?? activeRange.from);
          if (isBefore(parsedDate, from) || isAfter(parsedDate, endOfDay(to))) {
            return false;
          }
        }
      }

      return true;
    });
  }, [
    data,
    searchValue,
    searchField,
    selectedStatuses,
    activeRange,
    dateType,
    searchResolver,
    dateResolver,
    statusResolver,
  ]);

  const builtFilterSections = useMemo<FilterSectionConfig[]>(() => {
    const sections: FilterSectionConfig[] = [];

    if (filterSections.status) {
      sections.push(
        buildSectionFromOptions(
          filterSections.status.key,
          filterSections.status.label,
          filterSections.status.options,
          selectedStatuses
        )
      );
    }

    return sections;
  }, [filterSections, selectedStatuses]);

  const filterModalKey = useMemo(
    () =>
      [dateType, activeDateFilter, [...selectedStatuses].sort().join(",")].join(
        "|"
      ),
    [dateType, activeDateFilter, selectedStatuses]
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedStatuses(
        collectCheckedValues(filters.sections?.[statusSectionKey])
      );
    },
    [draftDateFilterString, draftDateRange, draftDateType, statusSectionKey]
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(defaultDateType);
    setActiveDateFilter("");
    setSelectedStatuses([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(defaultDateType);
  }, [defaultDateType]);

  const openFilterModal = useCallback(() => {
    setDraftDateRange(dateRange);
    setDraftDateFilterString(formatDateRange(dateRange));
    setDraftDateType(dateType);
    setIsFilterOpen(true);
  }, [dateRange, dateType]);

  const handleRemoveDate = useCallback(() => {
    setActiveDateFilter("");
    setDateRange(undefined);
  }, []);

  const handleRemoveStatus = useCallback(() => {
    setSelectedStatuses([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedStatuses.length > 0) count++;
    return count;
  }, [activeDateFilter, selectedStatuses]);

  return {
    searchValue,
    setSearchValue,
    searchField,
    setSearchField,
    isFilterOpen,
    setIsFilterOpen,
    isExportOpen,
    setIsExportOpen,
    dateType,
    activeDateFilter,
    selectedStatuses,
    draftDateFilterString,
    setDraftDateFilterString,
    draftDateType,
    setDraftDateType,
    draftDateRange,
    setDraftDateRange,
    filteredData,
    filterSections: builtFilterSections,
    filterModalKey,
    handleFilterApply,
    handleResetFilters,
    openFilterModal,
    handleRemoveDate,
    handleRemoveStatus,
    activeFilterCount,
  };
}

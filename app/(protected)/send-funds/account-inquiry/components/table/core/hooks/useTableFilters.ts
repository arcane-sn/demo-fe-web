import { useState, useMemo, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import { parse, isValid, startOfDay, endOfDay, isAfter, isBefore } from "date-fns";
import {
  ACCOUNT_INQUIRY_DATA_DATE_FORMAT,
  ACCOUNT_INQUIRY_DEFAULT_DATE_TYPE,
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
    type?: { key: string; label: string; options: any[] };
  };
  searchResolver: (row: T, searchField: string, searchValue: string) => boolean;
  dateResolver: (row: T, dateType: string) => string;
  statusResolver?: (row: T, selectedStatuses: string[]) => boolean;
}

export function useTableFilters<T>({
  data,
  defaultSearchField,
  defaultDateType = ACCOUNT_INQUIRY_DEFAULT_DATE_TYPE,
  filterSections,
  searchResolver,
  dateResolver,
  statusResolver,
}: UseTableFiltersConfig<T>) {
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(defaultSearchField);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState(defaultDateType);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [draftDateRange, setDraftDateRange] = useState<DateRange | undefined>(dateRange);
  const [draftDateType, setDraftDateType] = useState(dateType);
  const [draftDateFilterString, setDraftDateFilterString] = useState<string>(
    formatDateRange(dateRange),
  );

  const activeRange = useMemo(
    () => dateRange ?? parseDateRangeString(activeDateFilter),
    [dateRange, activeDateFilter],
  );

  const filteredData = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const statusesSet = selectedStatuses.length ? new Set(selectedStatuses) : null;
    const typesSet = selectedTypes.length ? new Set(selectedTypes) : null;

    return data.filter((row) => {
      if (normalizedSearch && !searchResolver(row, searchField, normalizedSearch)) {
        return false;
      }

      if (statusesSet) {
        if (statusResolver) {
          if (!statusResolver(row, selectedStatuses)) {
            return false;
          }
        } else {
          const rowStatus = (row as any).status;
          if (rowStatus && !statusesSet.has(rowStatus)) {
            return false;
          }
        }
      }

      if (typesSet) {
        const rowType = (row as any).type || (row as any).creationType;
        if (rowType && !typesSet.has(rowType)) {
          return false;
        }
      }

      if (activeRange?.from) {
        const dateFieldValue = dateResolver(row, dateType);
        const parsedDate = parse(dateFieldValue, ACCOUNT_INQUIRY_DATA_DATE_FORMAT, new Date());
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
    selectedTypes,
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
          selectedStatuses,
        ),
      );
    }

    if (filterSections.type) {
      sections.push(
        buildSectionFromOptions(
          filterSections.type.key,
          filterSections.type.label,
          filterSections.type.options,
          selectedTypes,
        ),
      );
    }

    return sections;
  }, [filterSections, selectedStatuses, selectedTypes]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedStatuses].sort().join(","),
        [...selectedTypes].sort().join(","),
      ].join("|"),
    [dateType, activeDateFilter, selectedStatuses, selectedTypes],
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedStatuses(collectCheckedValues(filters.sections?.status));
      setSelectedTypes(collectCheckedValues(filters.sections?.type));
    },
    [draftDateFilterString, draftDateRange, draftDateType],
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(defaultDateType);
    setActiveDateFilter("");
    setSelectedStatuses([]);
    setSelectedTypes([]);
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

  const handleRemoveType = useCallback(() => {
    setSelectedTypes([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedStatuses.length > 0) count++;
    if (selectedTypes.length > 0) count++;
    return count;
  }, [activeDateFilter, selectedStatuses, selectedTypes]);

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
    selectedTypes,

    draftDateRange,
    setDraftDateRange,
    draftDateType,
    setDraftDateType,
    draftDateFilterString,
    setDraftDateFilterString,

    filteredData,
    filterSections: builtFilterSections,
    filterModalKey,
    activeFilterCount,

    handleFilterApply,
    handleResetFilters,
    openFilterModal,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveType,
  };
}


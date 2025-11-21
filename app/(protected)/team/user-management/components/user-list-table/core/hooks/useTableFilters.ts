import { useState, useMemo, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import { parse, isValid, startOfDay, endOfDay, isAfter, isBefore } from "date-fns";
import {
  USER_MANAGEMENT_DATA_DATE_FORMAT,
  USER_MANAGEMENT_DEFAULT_DATE_TYPE,
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
    role?: { key: string; label: string; options: any[] };
  };
  searchResolver: (row: T, searchField: string, searchValue: string) => boolean;
  dateResolver: (row: T, dateType: string) => string;
  statusResolver?: (row: T, selectedStatuses: string[]) => boolean;
}

export function useTableFilters<T>({
  data,
  defaultSearchField,
  defaultDateType = USER_MANAGEMENT_DEFAULT_DATE_TYPE,
  filterSections,
  searchResolver,
  dateResolver,
  statusResolver,
}: UseTableFiltersConfig<T>) {
  const statusSectionKey = filterSections.status?.key ?? "accountStatus";
  const roleSectionKey = filterSections.role?.key ?? "role";

  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(defaultSearchField);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState(defaultDateType);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

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
    const rolesSet = selectedRoles.length ? new Set(selectedRoles) : null;

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
          const rowStatus = (row as any).accountStatus;
          if (rowStatus && !statusesSet.has(rowStatus)) {
            return false;
          }
        }
      }

      if (rolesSet) {
        const rowRole = (row as any).role;
        if (rowRole && !rolesSet.has(rowRole)) {
          return false;
        }
      }

      if (activeRange?.from) {
        const dateFieldValue = dateResolver(row, dateType);
        // Try parsing as ISO string first, then fallback to formatted date
        let parsedDate = new Date(dateFieldValue);
        if (!isValid(parsedDate)) {
          parsedDate = parse(dateFieldValue, USER_MANAGEMENT_DATA_DATE_FORMAT, new Date());
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
    selectedRoles,
    activeRange,
    dateType,
    searchResolver,
    dateResolver,
    statusResolver,
  ]);

  const builtFilterSections = useMemo<FilterSectionConfig[]>(() => {
    const sections: FilterSectionConfig[] = [];

    // Role section first (as shown in the image)
    if (filterSections.role) {
      sections.push(
        buildSectionFromOptions(
          filterSections.role.key,
          filterSections.role.label,
          filterSections.role.options,
          selectedRoles,
        ),
      );
    }

    // Status section second
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

    return sections;
  }, [filterSections, selectedStatuses, selectedRoles]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedStatuses].sort().join(","),
        [...selectedRoles].sort().join(","),
      ].join("|"),
    [dateType, activeDateFilter, selectedStatuses, selectedRoles],
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedStatuses(
        collectCheckedValues(filters.sections?.[statusSectionKey]),
      );
      setSelectedRoles(collectCheckedValues(filters.sections?.[roleSectionKey]));
    },
    [
      draftDateFilterString,
      draftDateRange,
      draftDateType,
      statusSectionKey,
      roleSectionKey,
    ],
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(defaultDateType);
    setActiveDateFilter("");
    setSelectedStatuses([]);
    setSelectedRoles([]);
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

  const handleRemoveRole = useCallback(() => {
    setSelectedRoles([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedStatuses.length > 0) count++;
    if (selectedRoles.length > 0) count++;
    return count;
  }, [activeDateFilter, selectedStatuses, selectedRoles]);

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
    selectedRoles,
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
    handleRemoveRole,
    activeFilterCount,
  };
}


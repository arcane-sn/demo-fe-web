import { useState, useMemo, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import { parse, isValid, startOfDay, endOfDay, isAfter, isBefore } from "date-fns";
import {
  ACTIVITY_DATA_DATE_FORMAT,
  ACTIVITY_DEFAULT_DATE_TYPE,
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
    action?: { key: string; label: string; options: any[] };
    type?: { key: string; label: string; options: any[] };
  };
  searchResolver: (row: T, searchField: string, searchValue: string) => boolean;
  dateResolver: (row: T, dateType?: string) => string;
  statusResolver?: (row: T, selectedStatuses: string[]) => boolean;
}

export function useTableFilters<T>({
  data,
  defaultSearchField,
  defaultDateType = ACTIVITY_DEFAULT_DATE_TYPE,
  filterSections,
  searchResolver,
  dateResolver,
  statusResolver,
}: UseTableFiltersConfig<T>) {
  const statusSectionKey = filterSections.status?.key ?? "status";
  const actionSectionKey = filterSections.action?.key ?? "action";
  const typeSectionKey = filterSections.type?.key ?? "type";

  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(defaultSearchField);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState(defaultDateType);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
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
    const actionsSet = selectedActions.length ? new Set(selectedActions) : null;
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

      if (actionsSet) {
        const rowAction = (row as any).action;
        if (rowAction && !actionsSet.has(rowAction)) {
          return false;
        }
      }

      if (typesSet) {
        const rowType = (row as any).type || (row as any).providerType;
        if (rowType && !typesSet.has(rowType)) {
          return false;
        }
      }

      if (activeRange?.from) {
        const dateFieldValue = dateResolver(row, dateType);
        const parsedDate = parse(dateFieldValue, ACTIVITY_DATA_DATE_FORMAT, new Date());
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
    selectedActions,
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
          filterSections.status.options.map(opt => ({ id: opt.id, label: opt.label })),
          selectedStatuses,
        ),
      );
    }

    if (filterSections.action) {
      sections.push(
        buildSectionFromOptions(
          filterSections.action.key,
          filterSections.action.label,
          filterSections.action.options.map(opt => ({ id: opt.id, label: opt.label })),
          selectedActions,
        ),
      );
    }

    if (filterSections.type) {
      sections.push(
        buildSectionFromOptions(
          filterSections.type.key,
          filterSections.type.label,
          filterSections.type.options.map(opt => ({ id: opt.id, label: opt.label })),
          selectedTypes,
        ),
      );
    }

    return sections;
  }, [filterSections, selectedStatuses, selectedActions, selectedTypes]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedStatuses].sort().join(","),
        [...selectedActions].sort().join(","),
        [...selectedTypes].sort().join(","),
      ].join("|"),
    [dateType, activeDateFilter, selectedStatuses, selectedActions, selectedTypes],
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedStatuses(
        collectCheckedValues(filters.sections?.[statusSectionKey]),
      );
      setSelectedActions(
        collectCheckedValues(filters.sections?.[actionSectionKey]),
      );
      setSelectedTypes(collectCheckedValues(filters.sections?.[typeSectionKey]));
    },
    [
      draftDateFilterString,
      draftDateRange,
      draftDateType,
      statusSectionKey,
      actionSectionKey,
      typeSectionKey,
    ],
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(defaultDateType);
    setActiveDateFilter("");
    setSelectedStatuses([]);
    setSelectedActions([]);
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

  const handleRemoveAction = useCallback(() => {
    setSelectedActions([]);
  }, []);

  const handleRemoveType = useCallback(() => {
    setSelectedTypes([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedStatuses.length > 0) count++;
    if (selectedActions.length > 0) count++;
    if (selectedTypes.length > 0) count++;
    return count;
  }, [activeDateFilter, selectedStatuses, selectedActions, selectedTypes]);

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
    selectedActions,
    selectedTypes,
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
    handleRemoveAction,
    handleRemoveType,
    activeFilterCount,
  };
}


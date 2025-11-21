import { useState, useMemo, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import { parse, isValid, startOfDay, endOfDay, isAfter, isBefore } from "date-fns";
import {
  AUDIT_LOG_DATA_DATE_FORMAT,
  AUDIT_LOG_DEFAULT_DATE_TYPE,
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
    action?: { key: string; label: string; options: any[] };
    sectionType?: { key: string; label: string; options: any[] };
  };
  searchResolver: (row: T, searchField: string, searchValue: string) => boolean;
  dateResolver: (row: T, dateType: string) => string;
  actionResolver?: (row: T, selectedActions: string[]) => boolean;
  sectionTypeResolver?: (row: T, selectedSectionTypes: string[]) => boolean;
}

export function useTableFilters<T>({
  data,
  defaultSearchField,
  defaultDateType = AUDIT_LOG_DEFAULT_DATE_TYPE,
  filterSections,
  searchResolver,
  dateResolver,
  actionResolver,
  sectionTypeResolver,
}: UseTableFiltersConfig<T>) {
  const actionSectionKey = filterSections.action?.key ?? "action";
  const sectionTypeSectionKey = filterSections.sectionType?.key ?? "sectionType";

  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(defaultSearchField);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState(defaultDateType);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedSectionTypes, setSelectedSectionTypes] = useState<string[]>([]);

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
    const actionsSet = selectedActions.length ? new Set(selectedActions) : null;
    const sectionTypesSet = selectedSectionTypes.length ? new Set(selectedSectionTypes) : null;

    return data.filter((row) => {
      if (normalizedSearch && !searchResolver(row, searchField, normalizedSearch)) {
        return false;
      }

      if (actionsSet) {
        if (actionResolver) {
          if (!actionResolver(row, selectedActions)) {
            return false;
          }
        } else {
          const rowAction = (row as any).action;
          if (rowAction) {
            const actions = Array.isArray(rowAction) ? rowAction : [rowAction];
            if (!actions.some((action) => actionsSet.has(action))) {
              return false;
            }
          }
        }
      }

      if (sectionTypesSet) {
        if (sectionTypeResolver) {
          if (!sectionTypeResolver(row, selectedSectionTypes)) {
            return false;
          }
        } else {
          const rowSectionType = (row as any).sectionType;
          if (rowSectionType && !sectionTypesSet.has(rowSectionType)) {
            return false;
          }
        }
      }

      if (activeRange?.from) {
        const dateFieldValue = dateResolver(row, dateType);
        // Try parsing as ISO string first, then fallback to formatted date
        let parsedDate = new Date(dateFieldValue);
        if (!isValid(parsedDate)) {
          parsedDate = parse(dateFieldValue, AUDIT_LOG_DATA_DATE_FORMAT, new Date());
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
    selectedActions,
    selectedSectionTypes,
    activeRange,
    dateType,
    searchResolver,
    dateResolver,
    actionResolver,
    sectionTypeResolver,
  ]);

  const builtFilterSections = useMemo<FilterSectionConfig[]>(() => {
    const sections: FilterSectionConfig[] = [];

    // Action section first (as shown in the image)
    if (filterSections.action) {
      sections.push(
        buildSectionFromOptions(
          filterSections.action.key,
          filterSections.action.label,
          filterSections.action.options,
          selectedActions,
        ),
      );
    }

    // Section Type section second
    if (filterSections.sectionType) {
      sections.push(
        buildSectionFromOptions(
          filterSections.sectionType.key,
          filterSections.sectionType.label,
          filterSections.sectionType.options,
          selectedSectionTypes,
        ),
      );
    }

    return sections;
  }, [filterSections, selectedActions, selectedSectionTypes]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedActions].sort().join(","),
        [...selectedSectionTypes].sort().join(","),
      ].join("|"),
    [dateType, activeDateFilter, selectedActions, selectedSectionTypes],
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedActions(
        collectCheckedValues(filters.sections?.[actionSectionKey]),
      );
      setSelectedSectionTypes(collectCheckedValues(filters.sections?.[sectionTypeSectionKey]));
    },
    [
      draftDateFilterString,
      draftDateRange,
      draftDateType,
      actionSectionKey,
      sectionTypeSectionKey,
    ],
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(defaultDateType);
    setActiveDateFilter("");
    setSelectedActions([]);
    setSelectedSectionTypes([]);
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

  const handleRemoveAction = useCallback(() => {
    setSelectedActions([]);
  }, []);

  const handleRemoveSectionType = useCallback(() => {
    setSelectedSectionTypes([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedActions.length > 0) count++;
    if (selectedSectionTypes.length > 0) count++;
    return count;
  }, [activeDateFilter, selectedActions, selectedSectionTypes]);

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
    selectedActions,
    selectedSectionTypes,
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
    handleRemoveAction,
    handleRemoveSectionType,
    activeFilterCount,
  };
}


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
  BALANCE_REQUEST_FILTER_KEYS,
  BALANCE_REQUEST_FILTER_LABELS,
  BALANCE_REQUEST_SEARCH_FIELDS,
  BALANCE_REQUEST_STATUS_OPTIONS,
  BALANCE_REQUEST_ACTIVITY_TYPE_OPTIONS,
  BALANCE_REQUEST_DEFAULT_DATE_TYPE,
  BALANCE_REQUEST_DATA_DATE_FORMAT,
} from "../constants";
import { BalanceRequestData } from "../../../../core/_model";
import {
  buildSectionFromOptions,
  collectCheckedValues,
  formatDateRange,
  parseDateRangeString,
} from "../utils";

export function useBalanceRequestFilters(data: BalanceRequestData[]) {
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(
    BALANCE_REQUEST_SEARCH_FIELDS[0].value
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState(BALANCE_REQUEST_DEFAULT_DATE_TYPE);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<string[]>(
    []
  );

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
    const activityTypesSet = selectedActivityTypes.length
      ? new Set(selectedActivityTypes)
      : null;

    return data.filter((row) => {
      // Search filter
      if (normalizedSearch) {
        let matches = false;
        if (searchField === "merchantName") {
          matches =
            row.merchantName?.toLowerCase().includes(normalizedSearch) ?? false;
        } else if (searchField === "clientId") {
          matches =
            row.clientId?.toLowerCase().includes(normalizedSearch) ?? false;
        } else if (searchField === "notesReason") {
          matches =
            row.notesReason?.toLowerCase().includes(normalizedSearch) ?? false;
        } else if (searchField === "requestedBy") {
          matches =
            row.requestedBy?.username
              ?.toLowerCase()
              .includes(normalizedSearch) ||
            row.requestedBy?.email?.toLowerCase().includes(normalizedSearch) ||
            false;
        }
        if (!matches) return false;
      }

      // Status filter
      if (statusesSet) {
        if (!statusesSet.has(row.status.status)) {
          return false;
        }
      }

      // Activity Type filter
      if (activityTypesSet) {
        if (!activityTypesSet.has(row.activityType.type)) {
          return false;
        }
      }

      // Date filter
      if (activeRange?.from) {
        let dateFieldValue = "";
        if (dateType === "lastActivityDate") {
          dateFieldValue = row.lastActivityDate?.date || "";
        } else if (dateType === "createdDate") {
          // If createdDate exists in the data, use it
          dateFieldValue = (row as any).createdDate || "";
        }

        if (dateFieldValue) {
          // Parse date string (format: "yyyy-MM-dd")
          let parsedDate = parse(
            dateFieldValue,
            BALANCE_REQUEST_DATA_DATE_FORMAT,
            new Date()
          );
          if (!isValid(parsedDate)) {
            // Try parsing as ISO string
            parsedDate = new Date(dateFieldValue);
          }
          if (isValid(parsedDate)) {
            const from = startOfDay(activeRange.from);
            const to = startOfDay(activeRange.to ?? activeRange.from);
            const rowDate = startOfDay(parsedDate);
            if (isBefore(rowDate, from) || isAfter(rowDate, endOfDay(to))) {
              return false;
            }
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
    selectedActivityTypes,
    activeRange,
    dateType,
  ]);

  const builtFilterSections = useMemo<FilterSectionConfig[]>(() => {
    const sections: FilterSectionConfig[] = [];

    sections.push(
      buildSectionFromOptions(
        BALANCE_REQUEST_FILTER_KEYS.STATUS,
        BALANCE_REQUEST_FILTER_LABELS.STATUS,
        BALANCE_REQUEST_STATUS_OPTIONS.map((opt) => ({
          id: opt.value,
          label: opt.label,
        })),
        selectedStatuses
      )
    );

    sections.push(
      buildSectionFromOptions(
        BALANCE_REQUEST_FILTER_KEYS.ACTIVITY_TYPE,
        BALANCE_REQUEST_FILTER_LABELS.ACTIVITY_TYPE,
        BALANCE_REQUEST_ACTIVITY_TYPE_OPTIONS.map((opt) => ({
          id: opt.value,
          label: opt.label,
        })),
        selectedActivityTypes
      )
    );

    return sections;
  }, [selectedStatuses, selectedActivityTypes]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedStatuses].sort().join(","),
        [...selectedActivityTypes].sort().join(","),
      ].join("|"),
    [dateType, activeDateFilter, selectedStatuses, selectedActivityTypes]
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedStatuses(
        collectCheckedValues(
          filters.sections?.[BALANCE_REQUEST_FILTER_KEYS.STATUS]
        )
      );
      setSelectedActivityTypes(
        collectCheckedValues(
          filters.sections?.[BALANCE_REQUEST_FILTER_KEYS.ACTIVITY_TYPE]
        )
      );
    },
    [draftDateFilterString, draftDateRange, draftDateType]
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(BALANCE_REQUEST_DEFAULT_DATE_TYPE);
    setActiveDateFilter("");
    setSelectedStatuses([]);
    setSelectedActivityTypes([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(BALANCE_REQUEST_DEFAULT_DATE_TYPE);
  }, []);

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

  const handleRemoveActivityType = useCallback(() => {
    setSelectedActivityTypes([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedStatuses.length > 0) count++;
    if (selectedActivityTypes.length > 0) count++;
    return count;
  }, [activeDateFilter, selectedStatuses, selectedActivityTypes]);

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
    selectedActivityTypes,
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
    handleRemoveActivityType,
    activeFilterCount,
  };
}

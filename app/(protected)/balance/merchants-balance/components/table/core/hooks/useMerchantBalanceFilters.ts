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
  MERCHANT_BALANCE_FILTER_KEYS,
  MERCHANT_BALANCE_FILTER_LABELS,
  MERCHANT_BALANCE_SEARCH_FIELDS,
  MERCHANT_BALANCE_MERCHANT_LEVEL_OPTIONS,
  MERCHANT_BALANCE_STATUS_OPTIONS,
  MERCHANT_BALANCE_DEFAULT_DATE_TYPE,
  MERCHANT_BALANCE_DATA_DATE_FORMAT,
} from "../constants";
import { MerchantBalanceData } from "../../../../core/_model";
import {
  buildSectionFromOptions,
  collectCheckedValues,
  formatDateRange,
  parseDateRangeString,
} from "../utils";

export function useMerchantBalanceFilters(data: MerchantBalanceData[]) {
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(
    MERCHANT_BALANCE_SEARCH_FIELDS[0].value
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState(MERCHANT_BALANCE_DEFAULT_DATE_TYPE);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedMerchantLevels, setSelectedMerchantLevels] = useState<
    string[]
  >([]);
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
    const merchantLevelsSet = selectedMerchantLevels.length
      ? new Set(selectedMerchantLevels)
      : null;
    const statusesSet = selectedStatuses.length
      ? new Set(selectedStatuses)
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
        } else if (searchField === "status") {
          matches =
            row.status?.label?.toLowerCase().includes(normalizedSearch) ??
            false;
        } else if (searchField === "merchantLevel") {
          matches =
            row.merchantLevel?.label
              ?.toLowerCase()
              .includes(normalizedSearch) ?? false;
        } else if (searchField === "lastActivity") {
          matches =
            row.lastActivityDate?.date
              ?.toLowerCase()
              .includes(normalizedSearch) ?? false;
        }
        if (!matches) return false;
      }

      // Merchant Level filter
      if (merchantLevelsSet) {
        if (!merchantLevelsSet.has(row.merchantLevel.label)) {
          return false;
        }
      }

      // Status filter
      if (statusesSet) {
        if (!statusesSet.has(row.status.status)) {
          return false;
        }
      }

      // Date filter
      if (activeRange?.from) {
        let dateFieldValue = "";
        if (dateType === "lastActivityDate") {
          dateFieldValue = row.lastActivityDate?.date || "";
        }

        if (dateFieldValue) {
          // Parse date string (format: "yyyy-MM-dd")
          let parsedDate = parse(
            dateFieldValue,
            MERCHANT_BALANCE_DATA_DATE_FORMAT,
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
    selectedMerchantLevels,
    selectedStatuses,
    activeRange,
    dateType,
  ]);

  const builtFilterSections = useMemo<FilterSectionConfig[]>(() => {
    const sections: FilterSectionConfig[] = [];

    sections.push(
      buildSectionFromOptions(
        MERCHANT_BALANCE_FILTER_KEYS.MERCHANT_LEVEL,
        MERCHANT_BALANCE_FILTER_LABELS.MERCHANT_LEVEL,
        MERCHANT_BALANCE_MERCHANT_LEVEL_OPTIONS.map((opt) => ({
          id: opt.value,
          label: opt.label,
        })),
        selectedMerchantLevels
      )
    );

    sections.push(
      buildSectionFromOptions(
        MERCHANT_BALANCE_FILTER_KEYS.STATUS,
        MERCHANT_BALANCE_FILTER_LABELS.STATUS,
        MERCHANT_BALANCE_STATUS_OPTIONS.map((opt) => ({
          id: opt.value,
          label: opt.label,
        })),
        selectedStatuses
      )
    );

    return sections;
  }, [selectedMerchantLevels, selectedStatuses]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedMerchantLevels].sort().join(","),
        [...selectedStatuses].sort().join(","),
      ].join("|"),
    [dateType, activeDateFilter, selectedMerchantLevels, selectedStatuses]
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedMerchantLevels(
        collectCheckedValues(
          filters.sections?.[MERCHANT_BALANCE_FILTER_KEYS.MERCHANT_LEVEL]
        )
      );
      setSelectedStatuses(
        collectCheckedValues(
          filters.sections?.[MERCHANT_BALANCE_FILTER_KEYS.STATUS]
        )
      );
    },
    [draftDateFilterString, draftDateRange, draftDateType]
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(MERCHANT_BALANCE_DEFAULT_DATE_TYPE);
    setActiveDateFilter("");
    setSelectedMerchantLevels([]);
    setSelectedStatuses([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(MERCHANT_BALANCE_DEFAULT_DATE_TYPE);
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

  const handleRemoveMerchantLevel = useCallback(() => {
    setSelectedMerchantLevels([]);
  }, []);

  const handleRemoveStatus = useCallback(() => {
    setSelectedStatuses([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedMerchantLevels.length > 0) count++;
    if (selectedStatuses.length > 0) count++;
    return count;
  }, [activeDateFilter, selectedMerchantLevels, selectedStatuses]);

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
    selectedMerchantLevels,
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
    handleRemoveMerchantLevel,
    handleRemoveStatus,
    activeFilterCount,
  };
}

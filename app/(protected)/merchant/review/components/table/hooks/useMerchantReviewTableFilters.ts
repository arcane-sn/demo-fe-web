import { useState, useMemo, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import {
  startOfDay,
  endOfDay,
  isAfter,
  isBefore,
  isValid,
} from "date-fns";
import { MerchantReviewData } from "../../../core";
import {
  MERCHANT_REVIEW_SEARCH_FIELDS,
  MERCHANT_REVIEW_DEFAULT_DATE_TYPE,
  MERCHANT_REVIEW_DATE_TYPE_OPTIONS,
  MERCHANT_REVIEW_FILTER_KEYS,
  MERCHANT_REVIEW_FILTER_LABELS,
  MERCHANT_REVIEW_STATUS_OPTIONS,
  MERCHANT_REVIEW_LEVEL_OPTIONS,
} from "../../../core/constants";
import {
  formatDateRange,
  parseDateRangeString,
  collectCheckedValues,
  buildSectionFromOptions,
  parseCreatedDate,
  parseSubmittedDate,
} from "../../../core/utils";

export function useMerchantReviewTableFilters(data: MerchantReviewData[]) {
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(
    MERCHANT_REVIEW_SEARCH_FIELDS[0].value,
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState<string>(MERCHANT_REVIEW_DEFAULT_DATE_TYPE);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");

  const [selectedReviewStatuses, setSelectedReviewStatuses] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const [draftDateRange, setDraftDateRange] = useState<DateRange | undefined>(undefined);
  const [draftDateType, setDraftDateType] = useState<string>(MERCHANT_REVIEW_DEFAULT_DATE_TYPE);
  const [draftDateFilterString, setDraftDateFilterString] = useState<string>(
    formatDateRange(undefined),
  );

  const activeRange = useMemo(
    () => dateRange ?? parseDateRangeString(activeDateFilter),
    [dateRange, activeDateFilter],
  );

  const filteredData = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const statusSet = selectedReviewStatuses.length ? new Set(selectedReviewStatuses) : null;
    const levelSet = selectedLevels.length ? new Set(selectedLevels) : null;

    return data.filter((row) => {
      if (normalizedSearch) {
        let fieldValue = "";
        switch (searchField) {
          case "brandName":
            fieldValue = row.brandName;
            break;
          case "clientId":
            fieldValue = row.clientId;
            break;
          default:
            fieldValue = row.companyName;
        }
        if (!fieldValue?.toLowerCase().includes(normalizedSearch)) {
          return false;
        }
      }

      if (statusSet && !statusSet.has(row.reviewStatus)) {
        return false;
      }

      if (levelSet && !levelSet.has(row.merchantLevel.label)) {
        return false;
      }

      if (activeRange?.from) {
        const parsedDate =
          dateType === "submittedAt"
            ? parseSubmittedDate(row.submittedAt)
            : parseCreatedDate(row.createdDate?.date);
        if (parsedDate && isValid(parsedDate)) {
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
    selectedReviewStatuses,
    selectedLevels,
    activeRange,
    dateType,
  ]);

  const filterSections = useMemo<FilterSectionConfig[]>(() => {
    return [
      buildSectionFromOptions(
        MERCHANT_REVIEW_FILTER_KEYS.REVIEW_STATUS,
        MERCHANT_REVIEW_FILTER_LABELS.REVIEW_STATUS,
        MERCHANT_REVIEW_STATUS_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
        selectedReviewStatuses,
      ),
      buildSectionFromOptions(
        MERCHANT_REVIEW_FILTER_KEYS.MERCHANT_LEVEL,
        MERCHANT_REVIEW_FILTER_LABELS.MERCHANT_LEVEL,
        MERCHANT_REVIEW_LEVEL_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
        selectedLevels,
      ),
    ];
  }, [selectedReviewStatuses, selectedLevels]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedReviewStatuses].sort().join(","),
        [...selectedLevels].sort().join(","),
      ].join("|"),
    [dateType, activeDateFilter, selectedReviewStatuses, selectedLevels],
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedReviewStatuses(
        collectCheckedValues(filters.sections?.[MERCHANT_REVIEW_FILTER_KEYS.REVIEW_STATUS]),
      );
      setSelectedLevels(
        collectCheckedValues(filters.sections?.[MERCHANT_REVIEW_FILTER_KEYS.MERCHANT_LEVEL]),
      );
    },
    [draftDateFilterString, draftDateRange, draftDateType],
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(MERCHANT_REVIEW_DEFAULT_DATE_TYPE);
    setActiveDateFilter("");
    setSelectedReviewStatuses([]);
    setSelectedLevels([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(MERCHANT_REVIEW_DEFAULT_DATE_TYPE);
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
    setSelectedReviewStatuses([]);
  }, []);

  const handleRemoveLevel = useCallback(() => {
    setSelectedLevels([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedReviewStatuses.length > 0) count++;
    if (selectedLevels.length > 0) count++;
    return count;
  }, [activeDateFilter, selectedReviewStatuses, selectedLevels]);

  return {
    searchValue,
    setSearchValue,
    searchField,
    setSearchField,
    isFilterOpen,
    setIsFilterOpen,
    isExportOpen,
    setIsExportOpen,
    draftDateFilterString,
    setDraftDateFilterString,
    draftDateType,
    setDraftDateType,
    draftDateRange,
    setDraftDateRange,
    filteredData,
    filterSections,
    filterModalKey,
    handleFilterApply,
    handleResetFilters,
    openFilterModal,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveLevel,
    activeDateFilter,
    selectedReviewStatuses,
    selectedLevels,
    dateType,
    activeFilterCount,
  };
}


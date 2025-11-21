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
  BALANCE_STATEMENT_FILTER_KEYS,
  BALANCE_STATEMENT_FILTER_LABELS,
  BALANCE_STATEMENT_SEARCH_FIELDS,
  BALANCE_STATEMENT_TRANSACTION_TYPE_OPTIONS,
  BALANCE_STATEMENT_STATUS_OPTIONS,
  BALANCE_STATEMENT_DEFAULT_DATE_TYPE,
  BALANCE_STATEMENT_DATA_DATE_FORMAT,
} from "../constants";
import { BalanceStatementData } from "../../../../core/_model";
import {
  buildSectionFromOptions,
  collectCheckedValues,
  formatDateRange,
  parseDateRangeString,
} from "../utils";

export function useBalanceStatementFilters(data: BalanceStatementData[]) {
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(
    BALANCE_STATEMENT_SEARCH_FIELDS[0].value
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState(BALANCE_STATEMENT_DEFAULT_DATE_TYPE);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<
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
    const transactionTypesSet = selectedTransactionTypes.length
      ? new Set(selectedTransactionTypes)
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
        } else if (searchField === "referenceNumber") {
          matches =
            row.referenceNumber?.toLowerCase().includes(normalizedSearch) ??
            false;
        } else if (searchField === "partnerReferenceNumber") {
          matches =
            row.partnerReferenceNumber
              ?.toLowerCase()
              .includes(normalizedSearch) ?? false;
        } else if (searchField === "transactionRemark") {
          matches =
            row.transactionRemark?.toLowerCase().includes(normalizedSearch) ??
            false;
        }
        if (!matches) return false;
      }

      // Transaction Type filter
      if (transactionTypesSet) {
        if (!transactionTypesSet.has(row.transactionType.type)) {
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
        if (dateType === "transactionDate") {
          dateFieldValue = row.transactionDate?.date || "";
        }

        if (dateFieldValue) {
          // Parse date string (format: "yyyy-MM-dd")
          let parsedDate = parse(
            dateFieldValue,
            BALANCE_STATEMENT_DATA_DATE_FORMAT,
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
    selectedTransactionTypes,
    selectedStatuses,
    activeRange,
    dateType,
  ]);

  const builtFilterSections = useMemo<FilterSectionConfig[]>(() => {
    const sections: FilterSectionConfig[] = [];

    sections.push(
      buildSectionFromOptions(
        BALANCE_STATEMENT_FILTER_KEYS.TRANSACTION_TYPE,
        BALANCE_STATEMENT_FILTER_LABELS.TRANSACTION_TYPE,
        BALANCE_STATEMENT_TRANSACTION_TYPE_OPTIONS.map((opt) => ({
          id: opt.value,
          label: opt.label,
        })),
        selectedTransactionTypes
      )
    );

    sections.push(
      buildSectionFromOptions(
        BALANCE_STATEMENT_FILTER_KEYS.STATUS,
        BALANCE_STATEMENT_FILTER_LABELS.STATUS,
        BALANCE_STATEMENT_STATUS_OPTIONS.map((opt) => ({
          id: opt.value,
          label: opt.label,
        })),
        selectedStatuses
      )
    );

    return sections;
  }, [selectedTransactionTypes, selectedStatuses]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedTransactionTypes].sort().join(","),
        [...selectedStatuses].sort().join(","),
      ].join("|"),
    [dateType, activeDateFilter, selectedTransactionTypes, selectedStatuses]
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedTransactionTypes(
        collectCheckedValues(
          filters.sections?.[BALANCE_STATEMENT_FILTER_KEYS.TRANSACTION_TYPE]
        )
      );
      setSelectedStatuses(
        collectCheckedValues(
          filters.sections?.[BALANCE_STATEMENT_FILTER_KEYS.STATUS]
        )
      );
    },
    [draftDateFilterString, draftDateRange, draftDateType]
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(BALANCE_STATEMENT_DEFAULT_DATE_TYPE);
    setActiveDateFilter("");
    setSelectedTransactionTypes([]);
    setSelectedStatuses([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(BALANCE_STATEMENT_DEFAULT_DATE_TYPE);
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

  const handleRemoveTransactionType = useCallback(() => {
    setSelectedTransactionTypes([]);
  }, []);

  const handleRemoveStatus = useCallback(() => {
    setSelectedStatuses([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedTransactionTypes.length > 0) count++;
    if (selectedStatuses.length > 0) count++;
    return count;
  }, [activeDateFilter, selectedTransactionTypes, selectedStatuses]);

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
    selectedTransactionTypes,
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
    handleRemoveTransactionType,
    handleRemoveStatus,
    activeFilterCount,
  };
}

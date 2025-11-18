import { useState, useMemo, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import { PayOutTransaction } from "../../../core/_models";
import {
  MOCK_PAY_OUT_TRANSACTIONS,
  PAY_OUT_STATUS_OPTIONS,
  PAY_OUT_TRANSACTION_TYPE_OPTIONS,
  PAY_OUT_PROVIDER_NAME_OPTIONS,
} from "../../../core/_consts";
import { parse, isValid, startOfDay, endOfDay, isAfter, isBefore } from "date-fns";
import { DATA_DATE_FORMAT, INITIAL_DATE_RANGE_STRING, DEFAULT_DATE_TYPE } from "../../../../core/_constants";
import { formatDateRange, parseDateRangeString, collectCheckedValues, buildSectionFromOptions } from "../../../../components/shared/utils";

const STATUS_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  success: "Success",
  init: "Init",
  canceled: "Canceled",
  scheduled: "Scheduled",
  request: "Request",
  failed: "Failed",
  pending: "Pending",
};

const TRANSACTION_TYPE_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  disbursement: "Disbursement",
  "account-inquiry": "Account Inquiry",
};

const PROVIDER_NAME_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  ifortepay: "IFP",
};

export function usePayOutFilters() {
  const initialRange = useMemo(
    () => parseDateRangeString(INITIAL_DATE_RANGE_STRING),
    [],
  );

  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>("referenceNumber");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [dateType, setDateType] = useState(DEFAULT_DATE_TYPE);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<string[]>([]);
  const [selectedProviderNames, setSelectedProviderNames] = useState<string[]>([]);
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
    const transactionTypesSet = selectedTransactionTypes.length ? new Set(selectedTransactionTypes) : null;
    const providerNamesSet = selectedProviderNames.length ? new Set(selectedProviderNames) : null;

    return MOCK_PAY_OUT_TRANSACTIONS.filter((row) => {
      if (normalizedSearch) {
        const target = row[searchField as keyof PayOutTransaction];
        if (!target || !String(target).toLowerCase().includes(normalizedSearch)) {
          return false;
        }
      }

      if (statusesSet) {
        const mappedStatuses = Array.from(statusesSet).map(
          (filterId) => STATUS_FILTER_TO_DATA_MAPPING[filterId] || filterId
        );
        const statusesSetMapped = new Set(mappedStatuses);
        if (!statusesSetMapped.has(row.status)) {
          return false;
        }
      }

      if (transactionTypesSet) {
        const mappedTypes = Array.from(transactionTypesSet).map(
          (filterId) => TRANSACTION_TYPE_FILTER_TO_DATA_MAPPING[filterId] || filterId
        );
        const typesSetMapped = new Set(mappedTypes);
        if (!typesSetMapped.has(row.transactionType)) {
          return false;
        }
      }

      if (providerNamesSet) {
        const mappedProviderNames = Array.from(providerNamesSet).map(
          (filterId) => PROVIDER_NAME_FILTER_TO_DATA_MAPPING[filterId] || filterId
        );
        const providerNamesSetMapped = new Set(mappedProviderNames);
        if (!row.providerName || !providerNamesSetMapped.has(row.providerName)) {
          return false;
        }
      }

      if (activeRange?.from) {
        const dateField = dateType === "transactionDate" ? row.transactionDate : row.servedDate;
        const parsedDate = parse(dateField, DATA_DATE_FORMAT, new Date());
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
    searchValue,
    searchField,
    selectedStatuses,
    selectedTransactionTypes,
    selectedProviderNames,
    activeRange,
    dateType,
  ]);

  const filterSections = useMemo<FilterSectionConfig[]>(() => {
    return [
      buildSectionFromOptions("status", "Status", PAY_OUT_STATUS_OPTIONS, selectedStatuses),
      buildSectionFromOptions("transactionType", "Transaction Type", PAY_OUT_TRANSACTION_TYPE_OPTIONS, selectedTransactionTypes),
      buildSectionFromOptions("providerName", "Provider Name", PAY_OUT_PROVIDER_NAME_OPTIONS, selectedProviderNames),
    ];
  }, [selectedStatuses, selectedTransactionTypes, selectedProviderNames]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedStatuses].sort().join(","),
        [...selectedTransactionTypes].sort().join(","),
        [...selectedProviderNames].sort().join(","),
      ].join("|"),
    [dateType, activeDateFilter, selectedStatuses, selectedTransactionTypes, selectedProviderNames],
  );

  const handleFilterApply = useCallback((filters: FilterModalState) => {
    setActiveDateFilter(draftDateFilterString);
    setDateRange(draftDateRange);
    setDateType(draftDateType);
    setSelectedStatuses(collectCheckedValues(filters.sections?.status));
    setSelectedTransactionTypes(collectCheckedValues(filters.sections?.transactionType));
    setSelectedProviderNames(collectCheckedValues(filters.sections?.providerName));
  }, [draftDateFilterString, draftDateRange, draftDateType]);

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(DEFAULT_DATE_TYPE);
    setActiveDateFilter("");
    setSelectedStatuses([]);
    setSelectedTransactionTypes([]);
    setSelectedProviderNames([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(DEFAULT_DATE_TYPE);
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

  const handleRemoveTransactionType = useCallback(() => {
    setSelectedTransactionTypes([]);
  }, []);

  const handleRemoveProviderName = useCallback(() => {
    setSelectedProviderNames([]);
  }, []);

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
    selectedTransactionTypes,
    selectedProviderNames,
    draftDateRange,
    setDraftDateRange,
    draftDateType,
    setDraftDateType,
    draftDateFilterString,
    setDraftDateFilterString,
    filteredData,
    filterSections,
    filterModalKey,
    handleFilterApply,
    handleResetFilters,
    openFilterModal,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveTransactionType,
    handleRemoveProviderName,
  };
}


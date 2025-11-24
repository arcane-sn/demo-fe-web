import { useState, useMemo, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import { parse, isValid, startOfDay, endOfDay, isAfter, isBefore } from "date-fns";
import {
  DISBURSEMENT_FILTER_KEYS,
  DISBURSEMENT_FILTER_LABELS,
  DISBURSEMENT_SEARCH_FIELDS,
  DISBURSEMENT_STATUS_OPTIONS,
  DISBURSEMENT_DEFAULT_DATE_TYPE,
  DISBURSEMENT_DATA_DATE_FORMAT,
} from "../constants";
import {
  formatDateRange,
  parseDateRangeString,
  collectCheckedValues,
  buildSectionFromOptions,
} from "../utils";

export interface BankData {
  id: string;
  status: 'Active' | 'Inactive';
  bankCode: string;
  bankName: string;
  feeTransfer: string;
  feeTransferToVA: string;
  feeInquiry: string;
  feeInquiryToVA: string;
  feeRefund: string;
  minimumTransfer: string;
  maximumTransfer: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  deletedDate: string;
  deletedBy: string;
}

export function useDisbursementFilters(data: BankData[]) {
  const statusSectionKey = DISBURSEMENT_FILTER_KEYS.STATUS;

  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(DISBURSEMENT_SEARCH_FIELDS[0].value);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState(DISBURSEMENT_DEFAULT_DATE_TYPE);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

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

    return data.filter((row) => {
      if (normalizedSearch) {
        if (searchField === "bankCode" && !row.bankCode.toLowerCase().includes(normalizedSearch)) {
          return false;
        }
        if (searchField === "bankName" && !row.bankName.toLowerCase().includes(normalizedSearch)) {
          return false;
        }
      }

      if (statusesSet && !statusesSet.has(row.status)) {
        return false;
      }

      if (activeRange?.from) {
        const dateFieldValue = dateType === "updatedDate" ? row.updatedDate : row.createdDate;
        const parsedDate = parse(dateFieldValue, DISBURSEMENT_DATA_DATE_FORMAT, new Date());
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
  ]);

  const builtFilterSections = useMemo<FilterSectionConfig[]>(() => {
    const sections: FilterSectionConfig[] = [];

    sections.push(
      buildSectionFromOptions(
        DISBURSEMENT_FILTER_KEYS.STATUS,
        DISBURSEMENT_FILTER_LABELS.STATUS,
        DISBURSEMENT_STATUS_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
        selectedStatuses,
      ),
    );

    return sections;
  }, [selectedStatuses]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedStatuses].sort().join(","),
      ].join("|"),
    [dateType, activeDateFilter, selectedStatuses],
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedStatuses(
        collectCheckedValues(filters.sections?.[statusSectionKey]),
      );
    },
    [
      draftDateFilterString,
      draftDateRange,
      draftDateType,
      statusSectionKey,
    ],
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(DISBURSEMENT_DEFAULT_DATE_TYPE);
    setActiveDateFilter("");
    setSelectedStatuses([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(DISBURSEMENT_DEFAULT_DATE_TYPE);
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


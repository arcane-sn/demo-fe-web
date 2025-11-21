import { useState, useMemo, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import { parse, isValid, startOfDay, endOfDay, isAfter, isBefore } from "date-fns";
import {
  MERCHANT_LIST_SEARCH_FIELDS,
  MERCHANT_LIST_DEFAULT_DATE_TYPE,
  MERCHANT_LIST_DATE_TYPE_OPTIONS,
  MERCHANT_LIST_FILTER_KEYS,
  MERCHANT_LIST_FILTER_LABELS,
  MERCHANT_LIST_LEVEL_OPTIONS,
  MERCHANT_LIST_PRODUCTION_STATUS_OPTIONS,
  MERCHANT_LIST_SANDBOX_STATUS_OPTIONS,
  MERCHANT_LIST_DATA_DATE_FORMAT,
} from "../../../core/constants";
import {
  formatDateRange,
  parseDateRangeString,
  collectCheckedValues,
  buildSectionFromOptions,
} from "../../../core/utils";
import { MerchantData } from "../../../../types/merchant";

interface UseMerchantListFiltersResult {
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchField: string;
  setSearchField: (field: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  isExportOpen: boolean;
  setIsExportOpen: (open: boolean) => void;
  draftDateFilterString: string;
  setDraftDateFilterString: (value: string) => void;
  draftDateType: string;
  setDraftDateType: (value: string) => void;
  draftDateRange: DateRange | undefined;
  setDraftDateRange: (range: DateRange | undefined) => void;
  filteredData: MerchantData[];
  filterSections: FilterSectionConfig[];
  filterModalKey: string;
  handleFilterApply: (filters: FilterModalState) => void;
  handleResetFilters: () => void;
  openFilterModal: () => void;
  handleRemoveDate: () => void;
  handleRemoveLevels: () => void;
  handleRemoveProductionStatus: () => void;
  handleRemoveSandboxStatus: () => void;
  activeDateFilter: string;
  selectedLevels: string[];
  selectedProductionStatuses: string[];
  selectedSandboxStatuses: string[];
  dateType: string;
  activeFilterCount: number;
}

export function useMerchantListFilters(data: MerchantData[]): UseMerchantListFiltersResult {
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(
    MERCHANT_LIST_SEARCH_FIELDS[0].value,
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState<string>(MERCHANT_LIST_DEFAULT_DATE_TYPE);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");

  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedProductionStatuses, setSelectedProductionStatuses] = useState<string[]>(
    [],
  );
  const [selectedSandboxStatuses, setSelectedSandboxStatuses] = useState<string[]>([]);

  const [draftDateRange, setDraftDateRange] = useState<DateRange | undefined>(undefined);
  const [draftDateType, setDraftDateType] = useState<string>(MERCHANT_LIST_DEFAULT_DATE_TYPE);
  const [draftDateFilterString, setDraftDateFilterString] = useState<string>(
    formatDateRange(undefined),
  );

  const activeRange = useMemo(
    () => dateRange ?? parseDateRangeString(activeDateFilter),
    [dateRange, activeDateFilter],
  );

  const filteredData = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const levelSet = selectedLevels.length ? new Set(selectedLevels) : null;
    const productionSet = selectedProductionStatuses.length
      ? new Set(selectedProductionStatuses)
      : null;
    const sandboxSet = selectedSandboxStatuses.length
      ? new Set(selectedSandboxStatuses)
      : null;

    return data.filter((row) => {
      if (normalizedSearch) {
        const fieldValue =
          searchField === "brandName"
            ? row.brandName
            : searchField === "clientId"
            ? row.clientId
            : row.companyName;
        if (!fieldValue?.toLowerCase().includes(normalizedSearch)) {
          return false;
        }
      }

      if (levelSet && !levelSet.has(row.merchantLevel.label)) {
        return false;
      }

      if (productionSet && !productionSet.has(row.productionStatus.status)) {
        return false;
      }

      if (sandboxSet && !sandboxSet.has(row.sandboxStatus.status)) {
        return false;
      }

      if (activeRange?.from) {
        const targetDateValue =
          dateType === "updatedDate" ? row.updatedDate.date : row.registeredDate.date;
        const parsedDate = parse(targetDateValue, MERCHANT_LIST_DATA_DATE_FORMAT, new Date());
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
    selectedLevels,
    selectedProductionStatuses,
    selectedSandboxStatuses,
    activeRange,
    dateType,
  ]);

  const filterSections = useMemo<FilterSectionConfig[]>(() => {
    return [
      buildSectionFromOptions(
        MERCHANT_LIST_FILTER_KEYS.MERCHANT_LEVEL,
        MERCHANT_LIST_FILTER_LABELS.MERCHANT_LEVEL,
        MERCHANT_LIST_LEVEL_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
        selectedLevels,
      ),
      buildSectionFromOptions(
        MERCHANT_LIST_FILTER_KEYS.PRODUCTION_STATUS,
        MERCHANT_LIST_FILTER_LABELS.PRODUCTION_STATUS,
        MERCHANT_LIST_PRODUCTION_STATUS_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
        selectedProductionStatuses,
      ),
      buildSectionFromOptions(
        MERCHANT_LIST_FILTER_KEYS.SANDBOX_STATUS,
        MERCHANT_LIST_FILTER_LABELS.SANDBOX_STATUS,
        MERCHANT_LIST_SANDBOX_STATUS_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
        selectedSandboxStatuses,
      ),
    ];
  }, [
    selectedLevels,
    selectedProductionStatuses,
    selectedSandboxStatuses,
  ]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedLevels].sort().join(","),
        [...selectedProductionStatuses].sort().join(","),
        [...selectedSandboxStatuses].sort().join(","),
      ].join("|"),
    [
      dateType,
      activeDateFilter,
      selectedLevels,
      selectedProductionStatuses,
      selectedSandboxStatuses,
    ],
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedLevels(
        collectCheckedValues(filters.sections?.[MERCHANT_LIST_FILTER_KEYS.MERCHANT_LEVEL]),
      );
      setSelectedProductionStatuses(
        collectCheckedValues(
          filters.sections?.[MERCHANT_LIST_FILTER_KEYS.PRODUCTION_STATUS],
        ),
      );
      setSelectedSandboxStatuses(
        collectCheckedValues(
          filters.sections?.[MERCHANT_LIST_FILTER_KEYS.SANDBOX_STATUS],
        ),
      );
    },
    [draftDateFilterString, draftDateRange, draftDateType],
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(MERCHANT_LIST_DEFAULT_DATE_TYPE);
    setActiveDateFilter("");
    setSelectedLevels([]);
    setSelectedProductionStatuses([]);
    setSelectedSandboxStatuses([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(MERCHANT_LIST_DEFAULT_DATE_TYPE);
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

  const handleRemoveLevels = useCallback(() => {
    setSelectedLevels([]);
  }, []);

  const handleRemoveProductionStatus = useCallback(() => {
    setSelectedProductionStatuses([]);
  }, []);

  const handleRemoveSandboxStatus = useCallback(() => {
    setSelectedSandboxStatuses([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedLevels.length > 0) count++;
    if (selectedProductionStatuses.length > 0) count++;
    if (selectedSandboxStatuses.length > 0) count++;
    return count;
  }, [
    activeDateFilter,
    selectedLevels,
    selectedProductionStatuses,
    selectedSandboxStatuses,
  ]);

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
    handleRemoveLevels,
    handleRemoveProductionStatus,
    handleRemoveSandboxStatus,
    activeDateFilter,
    selectedLevels,
    selectedProductionStatuses,
    selectedSandboxStatuses,
    dateType,
    activeFilterCount,
  };
}


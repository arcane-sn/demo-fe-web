import { useCallback, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import { MerchantData } from "../../../types/merchant-data";
import {
  SCHEDULER_DATE_RANGE_PLACEHOLDER,
  SCHEDULER_DEFAULT_DATE_TYPE,
  SCHEDULER_DATE_TYPE_OPTIONS,
  SCHEDULER_FILTER_KEYS,
  SCHEDULER_FILTER_LABELS,
  SCHEDULER_SEARCH_FIELDS,
  SCHEDULER_SERVICE_OPTIONS,
  SchedulerServiceKey,
} from "../../../core/constants";
import {
  collectCheckedValues,
  buildSectionFromOptions,
  formatDateRange,
  formatDataDate,
  parseDateRangeString,
} from "../../../core/utils";

export function useSchedulerTableFilters(data: MerchantData[]) {
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(
    SCHEDULER_SEARCH_FIELDS[0].value,
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState<string>(SCHEDULER_DEFAULT_DATE_TYPE);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");

  const [selectedActiveServices, setSelectedActiveServices] = useState<SchedulerServiceKey[]>([]);
  const [selectedInactiveServices, setSelectedInactiveServices] = useState<SchedulerServiceKey[]>([]);

  const [draftDateRange, setDraftDateRange] = useState<DateRange | undefined>(undefined);
  const [draftDateType, setDraftDateType] = useState(SCHEDULER_DEFAULT_DATE_TYPE);
  const [draftDateFilterString, setDraftDateFilterString] =
    useState(formatDateRange(undefined));

  const activeRange = useMemo(() => {
    if (dateRange) return dateRange;
    if (!activeDateFilter || activeDateFilter === SCHEDULER_DATE_RANGE_PLACEHOLDER) {
      return undefined;
    }
    return parseDateRangeString(activeDateFilter);
  }, [dateRange, activeDateFilter]);

  const filteredData = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const hasActive = selectedActiveServices.length > 0;
    const hasInactive = selectedInactiveServices.length > 0;

    return data.filter((row) => {
      if (normalizedSearch) {
        const value =
          searchField === "clientId" ? row.clientId : row.merchantName ?? "";
        if (!value.toLowerCase().includes(normalizedSearch)) {
          return false;
        }
      }

      if (activeRange?.from) {
        const rowDate = formatDataDate(row.updatedDate.date);
        if (rowDate < activeRange.from) return false;
        if (activeRange.to && rowDate > activeRange.to) return false;
      }

      if (hasActive) {
        const matchesActive = selectedActiveServices.some((service) => {
          const status = (row as Record<string, any>)[service]?.status;
          return status === "active";
        });
        if (!matchesActive) {
          return false;
        }
      }

      if (hasInactive) {
        const matchesInactive = selectedInactiveServices.some((service) => {
          const status = (row as Record<string, any>)[service]?.status;
          return status === "inactive";
        });
        if (!matchesInactive) {
          return false;
        }
      }

      return true;
    });
  }, [
    data,
    searchValue,
    searchField,
    activeRange,
    activeDateFilter,
    selectedActiveServices,
    selectedInactiveServices,
  ]);

  const serviceOptions = useMemo(
    () =>
      SCHEDULER_SERVICE_OPTIONS.map((option) => ({
        id: option.value,
        label: option.label,
      })),
    [],
  );

  const filterSections = useMemo<FilterSectionConfig[]>(
    () => [
      buildSectionFromOptions(
        SCHEDULER_FILTER_KEYS.ACTIVE_SERVICES,
        SCHEDULER_FILTER_LABELS.ACTIVE_SERVICES,
        serviceOptions,
        selectedActiveServices,
      ),
      buildSectionFromOptions(
        SCHEDULER_FILTER_KEYS.INACTIVE_SERVICES,
        SCHEDULER_FILTER_LABELS.INACTIVE_SERVICES,
        serviceOptions,
        selectedInactiveServices,
      ),
    ],
    [selectedActiveServices, selectedInactiveServices, serviceOptions],
  );

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedActiveServices].sort().join(","),
        [...selectedInactiveServices].sort().join(","),
      ].join("|"),
    [dateType, activeDateFilter, selectedActiveServices, selectedInactiveServices],
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedActiveServices(
        collectCheckedValues(
          filters.sections?.[SCHEDULER_FILTER_KEYS.ACTIVE_SERVICES],
        ) as SchedulerServiceKey[],
      );
      setSelectedInactiveServices(
        collectCheckedValues(
          filters.sections?.[SCHEDULER_FILTER_KEYS.INACTIVE_SERVICES],
        ) as SchedulerServiceKey[],
      );
    },
    [draftDateFilterString, draftDateRange, draftDateType],
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(SCHEDULER_DEFAULT_DATE_TYPE);
    setActiveDateFilter("");
    setSelectedActiveServices([]);
    setSelectedInactiveServices([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString(formatDateRange(undefined));
    setDraftDateType(SCHEDULER_DEFAULT_DATE_TYPE);
  }, []);

  const openFilterModal = useCallback(() => {
    setDraftDateRange(dateRange);
    setDraftDateFilterString(
      dateRange ? formatDateRange(dateRange) : SCHEDULER_DATE_RANGE_PLACEHOLDER,
    );
    setDraftDateType(dateType);
    setIsFilterOpen(true);
  }, [dateRange, dateType]);

  const handleRemoveDate = useCallback(() => {
    setActiveDateFilter("");
    setDateRange(undefined);
  }, []);

  const handleRemoveActiveServices = useCallback(() => {
    setSelectedActiveServices([]);
  }, []);

  const handleRemoveInactiveServices = useCallback(() => {
    setSelectedInactiveServices([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedActiveServices.length) count++;
    if (selectedInactiveServices.length) count++;
    return count;
  }, [activeDateFilter, selectedActiveServices, selectedInactiveServices]);

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
    handleRemoveActiveServices,
    handleRemoveInactiveServices,
    activeDateFilter,
    selectedActiveServices,
    selectedInactiveServices,
    dateType,
    activeFilterCount,
  };
}


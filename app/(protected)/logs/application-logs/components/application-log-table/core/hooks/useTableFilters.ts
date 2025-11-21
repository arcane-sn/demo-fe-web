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
  APPLICATION_LOG_DATA_DATE_FORMAT,
  APPLICATION_LOG_DEFAULT_DATE_TYPE,
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
    level?: { key: string; label: string; options: any[] };
    serviceName?: { key: string; label: string; options: any[] };
    eventType?: { key: string; label: string; options: any[] };
    env?: { key: string; label: string; options: any[] };
  };
  searchResolver: (row: T, searchField: string, searchValue: string) => boolean;
  dateResolver: (row: T, dateType: string) => string;
  levelResolver?: (row: T, selectedLevels: string[]) => boolean;
  serviceNameResolver?: (row: T, selectedServices: string[]) => boolean;
  eventTypeResolver?: (row: T, selectedEventTypes: string[]) => boolean;
  envResolver?: (row: T, selectedEnvs: string[]) => boolean;
}

export function useTableFilters<T>({
  data,
  defaultSearchField,
  defaultDateType = APPLICATION_LOG_DEFAULT_DATE_TYPE,
  filterSections,
  searchResolver,
  dateResolver,
  levelResolver,
  serviceNameResolver,
  eventTypeResolver,
  envResolver,
}: UseTableFiltersConfig<T>) {
  const levelSectionKey = filterSections.level?.key ?? "level";
  const serviceNameSectionKey =
    filterSections.serviceName?.key ?? "serviceName";
  const eventTypeSectionKey = filterSections.eventType?.key ?? "eventType";
  const envSectionKey = filterSections.env?.key ?? "env";

  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(defaultSearchField);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState(defaultDateType);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedEnvs, setSelectedEnvs] = useState<string[]>([]);

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
    const levelsSet = selectedLevels.length ? new Set(selectedLevels) : null;
    const servicesSet = selectedServices.length
      ? new Set(selectedServices)
      : null;
    const eventTypesSet = selectedEventTypes.length
      ? new Set(selectedEventTypes)
      : null;
    const envsSet = selectedEnvs.length ? new Set(selectedEnvs) : null;

    return data.filter((row) => {
      if (
        normalizedSearch &&
        !searchResolver(row, searchField, normalizedSearch)
      ) {
        return false;
      }

      if (levelsSet && levelResolver) {
        if (!levelResolver(row, selectedLevels)) {
          return false;
        }
      }

      if (servicesSet && serviceNameResolver) {
        if (!serviceNameResolver(row, selectedServices)) {
          return false;
        }
      }

      if (eventTypesSet && eventTypeResolver) {
        if (!eventTypeResolver(row, selectedEventTypes)) {
          return false;
        }
      }

      if (envsSet && envResolver) {
        if (!envResolver(row, selectedEnvs)) {
          return false;
        }
      }

      if (activeRange?.from) {
        const dateFieldValue = dateResolver(row, dateType);
        let parsedDate = new Date(dateFieldValue);
        if (!isValid(parsedDate)) {
          parsedDate = parse(
            dateFieldValue,
            APPLICATION_LOG_DATA_DATE_FORMAT,
            new Date()
          );
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
    selectedLevels,
    selectedServices,
    selectedEventTypes,
    selectedEnvs,
    activeRange,
    dateType,
    searchResolver,
    dateResolver,
    levelResolver,
    serviceNameResolver,
    eventTypeResolver,
    envResolver,
  ]);

  const builtFilterSections = useMemo<FilterSectionConfig[]>(() => {
    const sections: FilterSectionConfig[] = [];

    if (filterSections.level) {
      sections.push(
        buildSectionFromOptions(
          filterSections.level.key,
          filterSections.level.label,
          filterSections.level.options,
          selectedLevels
        )
      );
    }

    if (filterSections.serviceName) {
      sections.push(
        buildSectionFromOptions(
          filterSections.serviceName.key,
          filterSections.serviceName.label,
          filterSections.serviceName.options,
          selectedServices
        )
      );
    }

    if (filterSections.eventType) {
      sections.push(
        buildSectionFromOptions(
          filterSections.eventType.key,
          filterSections.eventType.label,
          filterSections.eventType.options,
          selectedEventTypes
        )
      );
    }

    if (filterSections.env) {
      sections.push(
        buildSectionFromOptions(
          filterSections.env.key,
          filterSections.env.label,
          filterSections.env.options,
          selectedEnvs
        )
      );
    }

    return sections;
  }, [
    filterSections,
    selectedLevels,
    selectedServices,
    selectedEventTypes,
    selectedEnvs,
  ]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedLevels].sort().join(","),
        [...selectedServices].sort().join(","),
        [...selectedEventTypes].sort().join(","),
        [...selectedEnvs].sort().join(","),
      ].join("|"),
    [
      dateType,
      activeDateFilter,
      selectedLevels,
      selectedServices,
      selectedEventTypes,
      selectedEnvs,
    ]
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedLevels(
        collectCheckedValues(filters.sections?.[levelSectionKey])
      );
      setSelectedServices(
        collectCheckedValues(filters.sections?.[serviceNameSectionKey])
      );
      setSelectedEventTypes(
        collectCheckedValues(filters.sections?.[eventTypeSectionKey])
      );
      setSelectedEnvs(collectCheckedValues(filters.sections?.[envSectionKey]));
    },
    [
      draftDateFilterString,
      draftDateRange,
      draftDateType,
      levelSectionKey,
      serviceNameSectionKey,
      eventTypeSectionKey,
      envSectionKey,
    ]
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(defaultDateType);
    setActiveDateFilter("");
    setSelectedLevels([]);
    setSelectedServices([]);
    setSelectedEventTypes([]);
    setSelectedEnvs([]);
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

  const handleRemoveLevel = useCallback(() => {
    setSelectedLevels([]);
  }, []);

  const handleRemoveService = useCallback(() => {
    setSelectedServices([]);
  }, []);

  const handleRemoveEventType = useCallback(() => {
    setSelectedEventTypes([]);
  }, []);

  const handleRemoveEnv = useCallback(() => {
    setSelectedEnvs([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedLevels.length > 0) count++;
    if (selectedServices.length > 0) count++;
    if (selectedEventTypes.length > 0) count++;
    if (selectedEnvs.length > 0) count++;
    return count;
  }, [
    activeDateFilter,
    selectedLevels,
    selectedServices,
    selectedEventTypes,
    selectedEnvs,
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
    dateType,
    activeDateFilter,
    selectedLevels,
    selectedServices,
    selectedEventTypes,
    selectedEnvs,
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
    handleRemoveLevel,
    handleRemoveService,
    handleRemoveEventType,
    handleRemoveEnv,
    activeFilterCount,
  };
}

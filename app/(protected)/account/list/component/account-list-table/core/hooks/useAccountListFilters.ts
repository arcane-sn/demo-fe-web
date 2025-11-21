import { useState, useMemo, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import { isValid, startOfDay, endOfDay, isAfter, isBefore } from "date-fns";
import {
  ACCOUNT_LIST_FILTER_KEYS,
  ACCOUNT_LIST_FILTER_LABELS,
  ACCOUNT_LIST_SEARCH_FIELDS,
  ACCOUNT_LIST_ACCESS_LEVEL_OPTIONS,
  ACCOUNT_LIST_ROLE_OPTIONS,
  ACCOUNT_LIST_ACCOUNT_STATUS_OPTIONS,
  ACCOUNT_LIST_ADDITIONAL_STATUS_OPTIONS,
  ACCOUNT_LIST_DEFAULT_DATE_TYPE,
} from "../constants";
import { AccountData } from "../types";
import {
  buildSectionFromOptions,
  collectCheckedValues,
  formatDateRange,
  parseDateRangeString,
} from "../utils";

export function useAccountListFilters(data: AccountData[]) {
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(
    ACCOUNT_LIST_SEARCH_FIELDS[0].value
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState(ACCOUNT_LIST_DEFAULT_DATE_TYPE);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedAccessLevels, setSelectedAccessLevels] = useState<string[]>(
    []
  );
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedAccountStatuses, setSelectedAccountStatuses] = useState<
    string[]
  >([]);
  const [selectedAdditionalStatuses, setSelectedAdditionalStatuses] = useState<
    string[]
  >([]);

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
    const accessLevelsSet = selectedAccessLevels.length
      ? new Set(selectedAccessLevels)
      : null;
    const rolesSet = selectedRoles.length ? new Set(selectedRoles) : null;
    const accountStatusesSet = selectedAccountStatuses.length
      ? new Set(selectedAccountStatuses)
      : null;
    const additionalStatusesSet = selectedAdditionalStatuses.length
      ? new Set(selectedAdditionalStatuses)
      : null;

    return data.filter((row) => {
      // Search filter
      if (normalizedSearch) {
        let matches = false;
        if (searchField === "userID") {
          matches =
            row.userID?.toLowerCase().includes(normalizedSearch) ?? false;
        } else if (searchField === "userName") {
          matches =
            row.userName?.toLowerCase().includes(normalizedSearch) ?? false;
        } else if (searchField === "name") {
          matches = row.name?.toLowerCase().includes(normalizedSearch) ?? false;
        } else if (searchField === "email") {
          matches =
            row.email?.toLowerCase().includes(normalizedSearch) ?? false;
        } else if (searchField === "phoneNumber") {
          matches =
            row.phoneNumber?.toLowerCase().includes(normalizedSearch) ?? false;
        } else if (searchField === "clientID") {
          matches =
            row.clientID?.toLowerCase().includes(normalizedSearch) ?? false;
        }
        if (!matches) return false;
      }

      // Access Level filter (if we have accessLevel field in AccountData)
      // Note: This might need adjustment based on actual data structure
      if (accessLevelsSet) {
        // Assuming accessLevel field exists, adjust if needed
        const rowAccessLevel = (row as any).accessLevel;
        if (rowAccessLevel && !accessLevelsSet.has(rowAccessLevel)) {
          return false;
        }
      }

      // Role filter
      if (rolesSet) {
        if (!rolesSet.has(row.role)) {
          return false;
        }
      }

      // Account Status filter
      if (accountStatusesSet) {
        if (!accountStatusesSet.has(row.accountStatus)) {
          return false;
        }
      }

      // Additional Status filter (if we have additionalStatus field)
      // Note: This might need adjustment based on actual data structure
      if (additionalStatusesSet) {
        const rowAdditionalStatus = (row as any).additionalStatus;
        if (
          rowAdditionalStatus &&
          !additionalStatusesSet.has(rowAdditionalStatus)
        ) {
          return false;
        }
      }

      // Date filter
      if (activeRange?.from) {
        let dateFieldValue = "";
        if (dateType === "created_date") {
          dateFieldValue = row.createdDate || "";
        } else if (dateType === "updated_date") {
          dateFieldValue = row.updateDate || "";
        } else if (dateType === "last_login") {
          dateFieldValue = row.loginDate || "";
        }

        if (dateFieldValue) {
          // Parse ISO date string
          const parsedDate = new Date(dateFieldValue);
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
    selectedAccessLevels,
    selectedRoles,
    selectedAccountStatuses,
    selectedAdditionalStatuses,
    activeRange,
    dateType,
  ]);

  const builtFilterSections = useMemo<FilterSectionConfig[]>(() => {
    const sections: FilterSectionConfig[] = [];

    sections.push(
      buildSectionFromOptions(
        ACCOUNT_LIST_FILTER_KEYS.ACCESS_LEVEL,
        ACCOUNT_LIST_FILTER_LABELS.ACCESS_LEVEL,
        ACCOUNT_LIST_ACCESS_LEVEL_OPTIONS.map((opt) => ({
          id: opt.value,
          label: opt.label,
        })),
        selectedAccessLevels
      )
    );

    sections.push(
      buildSectionFromOptions(
        ACCOUNT_LIST_FILTER_KEYS.ROLE,
        ACCOUNT_LIST_FILTER_LABELS.ROLE,
        ACCOUNT_LIST_ROLE_OPTIONS.map((opt) => ({
          id: opt.value,
          label: opt.label,
        })),
        selectedRoles
      )
    );

    sections.push(
      buildSectionFromOptions(
        ACCOUNT_LIST_FILTER_KEYS.ACCOUNT_STATUS,
        ACCOUNT_LIST_FILTER_LABELS.ACCOUNT_STATUS,
        ACCOUNT_LIST_ACCOUNT_STATUS_OPTIONS.map((opt) => ({
          id: opt.value,
          label: opt.label,
        })),
        selectedAccountStatuses
      )
    );

    sections.push(
      buildSectionFromOptions(
        ACCOUNT_LIST_FILTER_KEYS.ADDITIONAL_STATUS,
        ACCOUNT_LIST_FILTER_LABELS.ADDITIONAL_STATUS,
        ACCOUNT_LIST_ADDITIONAL_STATUS_OPTIONS.map((opt) => ({
          id: opt.value,
          label: opt.label,
        })),
        selectedAdditionalStatuses
      )
    );

    return sections;
  }, [
    selectedAccessLevels,
    selectedRoles,
    selectedAccountStatuses,
    selectedAdditionalStatuses,
  ]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedAccessLevels].sort().join(","),
        [...selectedRoles].sort().join(","),
        [...selectedAccountStatuses].sort().join(","),
        [...selectedAdditionalStatuses].sort().join(","),
      ].join("|"),
    [
      dateType,
      activeDateFilter,
      selectedAccessLevels,
      selectedRoles,
      selectedAccountStatuses,
      selectedAdditionalStatuses,
    ]
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedAccessLevels(
        collectCheckedValues(
          filters.sections?.[ACCOUNT_LIST_FILTER_KEYS.ACCESS_LEVEL]
        )
      );
      setSelectedRoles(
        collectCheckedValues(filters.sections?.[ACCOUNT_LIST_FILTER_KEYS.ROLE])
      );
      setSelectedAccountStatuses(
        collectCheckedValues(
          filters.sections?.[ACCOUNT_LIST_FILTER_KEYS.ACCOUNT_STATUS]
        )
      );
      setSelectedAdditionalStatuses(
        collectCheckedValues(
          filters.sections?.[ACCOUNT_LIST_FILTER_KEYS.ADDITIONAL_STATUS]
        )
      );
    },
    [draftDateFilterString, draftDateRange, draftDateType]
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(ACCOUNT_LIST_DEFAULT_DATE_TYPE);
    setActiveDateFilter("");
    setSelectedAccessLevels([]);
    setSelectedRoles([]);
    setSelectedAccountStatuses([]);
    setSelectedAdditionalStatuses([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(ACCOUNT_LIST_DEFAULT_DATE_TYPE);
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

  const handleRemoveAccessLevel = useCallback(() => {
    setSelectedAccessLevels([]);
  }, []);

  const handleRemoveRole = useCallback(() => {
    setSelectedRoles([]);
  }, []);

  const handleRemoveAccountStatus = useCallback(() => {
    setSelectedAccountStatuses([]);
  }, []);

  const handleRemoveAdditionalStatus = useCallback(() => {
    setSelectedAdditionalStatuses([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedAccessLevels.length > 0) count++;
    if (selectedRoles.length > 0) count++;
    if (selectedAccountStatuses.length > 0) count++;
    if (selectedAdditionalStatuses.length > 0) count++;
    return count;
  }, [
    activeDateFilter,
    selectedAccessLevels,
    selectedRoles,
    selectedAccountStatuses,
    selectedAdditionalStatuses,
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
    selectedAccessLevels,
    selectedRoles,
    selectedAccountStatuses,
    selectedAdditionalStatuses,
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
    handleRemoveAccessLevel,
    handleRemoveRole,
    handleRemoveAccountStatus,
    handleRemoveAdditionalStatus,
    activeFilterCount,
  };
}

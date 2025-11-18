import { useState, useCallback } from "react";

export interface BaseFilterState {
  dateFilter?: {
    dateType: string;
    startDate: string;
    endDate: string;
  };
  searchValue: string;
}

export interface UseTableFiltersOptions<TFilterState extends BaseFilterState> {
  initialFilters?: Partial<TFilterState>;
  onFilterChange?: (filters: TFilterState) => void;
}

export function useTableFilters<TFilterState extends BaseFilterState>(
  options?: UseTableFiltersOptions<TFilterState>
) {
  const [filters, setFilters] = useState<TFilterState>({
    searchValue: "",
    ...options?.initialFilters,
  } as TFilterState);

  const updateFilters = useCallback((newFilters: Partial<TFilterState>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      options?.onFilterChange?.(updated);
      return updated;
    });
  }, [options]);

  const resetFilters = useCallback(() => {
    const resetState = {
      searchValue: "",
      ...options?.initialFilters,
    } as TFilterState;
    setFilters(resetState);
    options?.onFilterChange?.(resetState);
  }, [options]);

  return {
    filters,
    updateFilters,
    resetFilters,
  };
}


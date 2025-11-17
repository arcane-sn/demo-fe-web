import { useState, useMemo, useCallback } from 'react';
import { PaginationState, RowSelectionState, SortingState } from '@tanstack/react-table';
import { BaseTableData, TableConfig, TableState } from '../types';

export function useTableState<TData extends BaseTableData>(
  config: TableConfig<TData>
) {
  const [pagination, setPagination] = useState<PaginationState>(
    config.defaultPagination || {
      pageIndex: 0,
      pageSize: config.pageSize || 10,
    }
  );

  const [sorting, setSorting] = useState<SortingState>(
    config.defaultSorting || []
  );

  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    config.defaultRowSelection || {}
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('merchantName');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  // Filter data based on search query and filters
  const filteredData = useMemo(() => {
    let filtered = config.data;

    // Apply search filter
    if (searchQuery && config.searchable) {
      const searchLower = searchQuery.toLowerCase();
      
      filtered = filtered.filter((item) => {
        const value = item[searchField as keyof TData];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchLower);
        }
        if (typeof value === 'object' && value !== null) {
          return Object.values(value).some((val) =>
            typeof val === 'string' && val.toLowerCase().includes(searchLower)
          );
        }
        return false;
      });
    }

    // Apply custom filters
    Object.entries(filters).forEach(([filterId, filterValue]) => {
      if (filterValue !== undefined && filterValue !== null && filterValue !== '') {
        const filter = config.customFilters?.find(f => f.id === filterId);
        if (filter) {
          filtered = filtered.filter((item) => {
            // This is a simplified filter logic - can be extended based on filter type
            if (Array.isArray(filterValue)) {
              return filterValue.includes(item[filterId as keyof TData]);
            }
            return item[filterId as keyof TData] === filterValue;
          });
        }
      }
    });

    return filtered;
  }, [config.data, searchQuery, searchField, filters, config.searchable]);

  // Update filter
  const updateFilter = useCallback((filterId: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchQuery('');
    setSearchField('merchantName');
  }, []);

  // Clear specific filter
  const clearFilter = useCallback((filterId: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterId];
      return newFilters;
    });
  }, []);

  // Get active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    Object.values(filters).forEach(value => {
      if (value !== undefined && value !== null && value !== '') {
        count++;
      }
    });
    return count;
  }, [searchQuery, filters]);

  const tableState: TableState = {
    pagination,
    sorting,
    rowSelection,
    searchQuery,
    filters,
    columnVisibility,
  };

  return {
    tableState,
    filteredData,
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    searchQuery,
    setSearchQuery,
    searchField,
    setSearchField,
    filters,
    updateFilter,
    clearFilters,
    clearFilter,
    activeFiltersCount,
    columnVisibility,
    setColumnVisibility,
  };
}

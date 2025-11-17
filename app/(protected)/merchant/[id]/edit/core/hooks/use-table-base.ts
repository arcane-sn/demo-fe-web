'use client';

import { useState, useCallback, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { createTableColumns, TableColumnConfig, TableActionConfig } from '../../_components/table';

export interface TableBaseConfig<T = any> {
  data: T[];
  columns: TableColumnConfig<T>[];
  actions?: TableActionConfig<T>;
  pageSize?: number;
  searchable?: boolean;
  searchFields?: string[];
  searchPlaceholder?: string;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean;
  enableColumnResizing?: boolean;
}

export interface TableBaseReturn<T = any> {
  columns: ColumnDef<T>[];
  tableData: T[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredData: T[];
  pagination: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
  };
  sorting: {
    columnId: string | null;
    direction: 'asc' | 'desc' | null;
    setSorting: (columnId: string | null, direction: 'asc' | 'desc' | null) => void;
  };
  selection: {
    selectedRows: T[];
    setSelectedRows: (rows: T[]) => void;
    isRowSelected: (row: T) => boolean;
    toggleRowSelection: (row: T) => void;
    selectAll: () => void;
    clearSelection: () => void;
  };
}

/**
 * Base hook for table management with consistent patterns
 * Eliminates duplication across different table implementations
 */
export function useTableBase<T = any>({
  data,
  columns,
  actions,
  pageSize = 10,
  searchable = true,
  searchFields = [],
  searchPlaceholder = 'Search...',
  enableSorting = true,
  enablePagination = true,
  enableColumnVisibility = true,
  enableColumnResizing = true,
}: TableBaseConfig<T>): TableBaseReturn<T> {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [sorting, setSorting] = useState<{ columnId: string | null; direction: 'asc' | 'desc' | null }>({
    columnId: null,
    direction: null,
  });
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  // Create table columns
  const tableColumns = useMemo(() => {
    return createTableColumns(columns as any, actions as any) as ColumnDef<T>[];
  }, [columns, actions]);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return data;

    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = getNestedValue(item, field);
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }, [data, searchQuery, searchable, searchFields]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!enableSorting || !sorting.columnId || !sorting.direction) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      const aValue = getNestedValue(a, sorting.columnId!);
      const bValue = getNestedValue(b, sorting.columnId!);
      
      if (aValue < bValue) return sorting.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sorting.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sorting, enableSorting]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!enablePagination) return sortedData;
    
    const startIndex = pageIndex * currentPageSize;
    const endIndex = startIndex + currentPageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, pageIndex, currentPageSize, enablePagination]);

  // Pagination helpers
  const pageCount = Math.ceil(filteredData.length / currentPageSize);

  const handleSetPageIndex = useCallback((index: number) => {
    setPageIndex(Math.max(0, Math.min(index, pageCount - 1)));
  }, [pageCount]);

  const handleSetPageSize = useCallback((size: number) => {
    setCurrentPageSize(size);
    setPageIndex(0);
  }, []);

  // Sorting helpers
  const handleSetSorting = useCallback((columnId: string | null, direction: 'asc' | 'desc' | null) => {
    setSorting({ columnId, direction });
  }, []);

  // Selection helpers
  const isRowSelected = useCallback((row: T) => {
    return selectedRows.includes(row);
  }, [selectedRows]);

  const toggleRowSelection = useCallback((row: T) => {
    setSelectedRows(prev => {
      if (prev.includes(row)) {
        return prev.filter(item => item !== row);
      }
      return [...prev, row];
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedRows([...paginatedData]);
  }, [paginatedData]);

  const clearSelection = useCallback(() => {
    setSelectedRows([]);
  }, []);

  return {
    columns: tableColumns,
    tableData: paginatedData,
    searchQuery,
    setSearchQuery,
    filteredData,
    pagination: {
      pageIndex,
      pageSize: currentPageSize,
      pageCount,
      setPageIndex: handleSetPageIndex,
      setPageSize: handleSetPageSize,
    },
    sorting: {
      columnId: sorting.columnId,
      direction: sorting.direction,
      setSorting: handleSetSorting,
    },
    selection: {
      selectedRows,
      setSelectedRows,
      isRowSelected,
      toggleRowSelection,
      selectAll,
      clearSelection,
    },
  };
}

/**
 * Helper function to get nested object values
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Hook for table filters
 */
export function useTableFilters<T = any>(
  data: T[],
  filterConfig: Record<string, { type: 'select' | 'multiselect' | 'date' | 'range'; options?: any[] }>
) {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return true;
        
        const config = filterConfig[key];
        const itemValue = getNestedValue(item, key);
        
        switch (config.type) {
          case 'select':
            return itemValue === value;
          case 'multiselect':
            return Array.isArray(value) && value.includes(itemValue);
          case 'date':
            return new Date(itemValue).toDateString() === new Date(value).toDateString();
          case 'range':
            return itemValue >= value.min && itemValue <= value.max;
          default:
            return true;
        }
      });
    });
  }, [data, filters, filterConfig]);

  const setFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    filters,
    setFilter,
    clearFilters,
    filteredData,
  };
}


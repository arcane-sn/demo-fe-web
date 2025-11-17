"use client";

import { useState, useCallback } from "react";
import { BaseTableData } from "@/components/table/types";

export interface BaseBalanceListState<T extends BaseTableData> {
  selectedItems: T[];
  loading: boolean;
  error: string | null;
}

export interface BaseBalanceListActions<T extends BaseTableData> {
  handleView: (item: T) => void;
  handleEdit: (item: T) => void;
  handleDelete: (item: T) => void;
  handleCreate: () => void;
  handleRowClick: (item: T) => void;
  handleSelectionChange: (items: T[]) => void;
  clearError: () => void;
}

export interface UseBaseBalanceListOptions<T extends BaseTableData> {
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onCreate?: () => void;
  onRowClick?: (item: T) => void;
  onSelectionChange?: (items: T[]) => void;
  initialError?: string | null;
}

export interface UseBaseBalanceListReturn<T extends BaseTableData>
  extends BaseBalanceListState<T>,
    BaseBalanceListActions<T> {}

/**
 * Base hook for balance list management
 * Provides common state management and handlers for balance-related lists
 * 
 * @template T - The data type that extends BaseTableData
 * @param options - Optional callbacks for custom behavior
 * @returns State and actions for managing balance list
 */
export function useBaseBalanceList<T extends BaseTableData>(
  options: UseBaseBalanceListOptions<T> = {}
): UseBaseBalanceListReturn<T> {
  const {
    onView,
    onEdit,
    onDelete,
    onCreate,
    onRowClick,
    onSelectionChange,
    initialError = null,
  } = options;

  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);

  const handleView = useCallback(
    (item: T) => {
      if (onView) {
        onView(item);
      } else {
        console.log("View item:", item);
      }
    },
    [onView]
  );

  const handleEdit = useCallback(
    (item: T) => {
      if (onEdit) {
        onEdit(item);
      } else {
        console.log("Edit item:", item);
      }
    },
    [onEdit]
  );

  const handleDelete = useCallback(
    (item: T) => {
      if (onDelete) {
        onDelete(item);
      } else {
        console.log("Delete item:", item);
      }
    },
    [onDelete]
  );

  const handleCreate = useCallback(() => {
    if (onCreate) {
      onCreate();
    } else {
      console.log("Create new item");
    }
  }, [onCreate]);

  const handleRowClick = useCallback(
    (item: T) => {
      if (onRowClick) {
        onRowClick(item);
      } else {
        console.log("Row clicked:", item);
      }
    },
    [onRowClick]
  );

  const handleSelectionChange = useCallback(
    (items: T[]) => {
      setSelectedItems(items);
      if (onSelectionChange) {
        onSelectionChange(items);
      } else {
        console.log("Selection changed:", items.length, "items");
      }
    },
    [onSelectionChange]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    selectedItems,
    loading,
    error,
    handleView,
    handleEdit,
    handleDelete,
    handleCreate,
    handleRowClick,
    handleSelectionChange,
    clearError,
  };
}


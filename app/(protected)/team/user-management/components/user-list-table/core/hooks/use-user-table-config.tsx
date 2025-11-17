import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { UserData } from "../types";
export interface UserTableConfig {
  data: UserData[];
  columns: ColumnDef<UserData>[];
  onRowClick?: (row: UserData) => void;
  onSelectionChange?: (selectedRows: UserData[]) => void;
}

export interface UserServiceTableProps {
  data: UserData[];
  loading?: boolean;
  error?: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onSelectionChange?: (selectedRows: UserData[]) => void;
  onView?: (row: UserData) => void;
  onOpenExport?: () => void;
  onOpenFilters?: () => void;
}

export const useUserTableConfig = ({
  data,
  columns,
  onOpenExport,
}: {
  data: UserData[];
  columns: ColumnDef<UserData>[];
  onOpenExport?: () => void;
}) => {
  const tableConfig: UserTableConfig = useMemo(
    () => ({
      data,
      columns,
    }),
    [data, columns]
  );

  const toolbarConfig = useMemo(
    () => ({
      title: "Account List",
      subtitle: "View and manage all registered accounts",
      showSearch: true,
      showFilters: true,
      showExport: true,
      onExport: onOpenExport,
    }),
    [onOpenExport]
  );

  return {
    tableConfig,
    toolbarConfig,
  };
};

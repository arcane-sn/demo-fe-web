import { PermissionData } from "./types";

export const headerConfig = {
  title: "Applied Permissions",
  subtitle: "",
  showRecordCount: true,
};

export const footerConfig = {
  showPagination: true,
  showRowCount: true,
  showSelectedCount: false,
};

export const getTableConfig = (data: PermissionData[]) => ({
  data,
  enableRowSelection: false,
  enableSorting: true,
  enablePagination: true,
  enableColumnVisibility: true,
  enableColumnResizing: true,
  enableColumnPinning: false,
  enableColumnMoving: false,
  pageSize: 10,
  pageSizeOptions: [10, 20, 50],
  searchable: true,
  searchPlaceholder: "Search permissions...",
  searchFields: ["service", "permissionName"] as (keyof PermissionData)[],
  showSearchBar: false,
  tableLayout: {
    columnsPinnable: false,
    columnsMovable: false,
    columnsVisibility: true,
    cellBorder: true,
  },
});

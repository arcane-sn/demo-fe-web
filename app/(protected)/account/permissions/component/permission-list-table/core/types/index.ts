export interface PermissionData {
  id: string;
  service: string;
  permissionName: string;
  createdBy: {
    name: string;
    email: string;
    avatar?: string;
  };
  createdDate: string;
  updatedDate: string;
}

export interface PermissionServiceTableProps {
  data: PermissionData[];
  onView?: (permission: PermissionData) => void;
  onEdit?: (permission: PermissionData) => void;
  onDelete?: (permission: PermissionData) => void;
  onSelectionChange?: (selectedPermissions: PermissionData[]) => void;
  onOpenExport?: () => void;
  loading?: boolean;
  error?: string;
}

// Search configuration interfaces
export interface SearchBarOption {
  value: string;
  label: string;
}

export interface PermissionTableSearchConfig {
  searchable: boolean;
  searchFields: (keyof PermissionData)[];
  showSearchBar: boolean;
  searchBarPlaceholder: string;
  searchBarOptions: Array<{ value: string; label: string }>;
}

export interface PermissionTableConfig {
  data: PermissionData[];
  columns: any[];
  enableRowSelection: boolean;
  enableSorting: boolean;
  enablePagination: boolean;
  enableColumnVisibility: boolean;
  enableColumnResizing: boolean;
  pageSize: number;
  // Simple search configuration like merchant list
  searchable: boolean;
  searchFields: (keyof PermissionData)[];
  searchPlaceholder: string;
  // Custom filters
  customFilters?: any[];
}

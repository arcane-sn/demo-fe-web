export interface UserData {
  id: string;
  [key: string]: any;
  userID: string;
  name: string;
  email: string;
  userName: string;
  phoneNumber: string;
  accessLevel: string;
  role: string;
  clientID: string;
  accountStatus: "active" | "inactive";
  failedLoginAttempt: number;
  loginDate: string;
  createdDate: string;
  updateDate: string;
}

export interface UserServiceTableProps {
  data: UserData[];
  onView?: (user: UserData) => void;
  onEdit?: (user: UserData) => void;
  onDelete?: (user: UserData) => void;
  onSelectionChange?: (selectedUsers: UserData[]) => void;
  onOpenExport?: () => void;
  loading?: boolean;
  error?: string;
}

// Search configuration interfaces
export interface SearchBarOption {
  value: string;
  label: string;
}

export interface UserTableSearchConfig {
  searchable: boolean;
  searchFields: string[];
  showSearchBar: boolean;
  searchBarPlaceholder: string;
  searchBarOptions: Array<{ value: string; label: string }>;
}

export interface UserTableConfig {
  data: UserData[];
  columns: any[];
  enableRowSelection: boolean;
  enableSorting: boolean;
  enablePagination: boolean;
  enableColumnVisibility: boolean;
  enableColumnResizing: boolean;
  pageSize: number;
  // Spread search config properties directly
  searchable: boolean;
  searchFields: string[];
  showSearchBar: boolean;
  searchBarPlaceholder: string;
  searchBarOptions: Array<{ value: string; label: string }>;
  searchBarPlaceholderMapping?: Record<string, string>;
  searchPosition?: "bottom" | null;
  // Custom filters
  customFilters?: any[];
}

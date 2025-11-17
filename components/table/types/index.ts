import {
  ColumnDef,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";

// Base data interface that can be extended
export interface BaseTableData {
  id: string;
  [key: string]: any;
}

// Table configuration interface
export interface TableConfig<TData extends BaseTableData> {
  // Data
  data: TData[];

  // Columns configuration
  columns: ColumnDef<TData>[];

  // Table settings
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean;
  enableColumnResizing?: boolean;
  enableColumnPinning?: boolean;
  enableColumnMoving?: boolean;

  // Pagination settings
  pageSize?: number;
  pageSizeOptions?: number[];

  // Table layout
  tableLayout?: {
    columnsPinnable?: boolean;
    columnsMovable?: boolean;
    columnsVisibility?: boolean;
    cellBorder?: boolean;
  };

  // Search and filtering
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFields?: (keyof TData)[];

  // SearchBar specific configuration
  showSearchBar?: boolean;
  searchBarPlaceholder?: string;
  searchBarOptions?: Array<{ value: string; label: string }>;
  searchBarPlaceholderMapping?: Record<string, string>;
  searchPosition?: "bottom" | null;

  // Custom filters
  customFilters?: TableFilter[];

  // Sorting
  defaultSorting?: SortingState;

  // Row selection
  defaultRowSelection?: RowSelectionState;

  // Pagination
  defaultPagination?: PaginationState;
}

// Filter configuration
export interface TableFilter {
  id: string;
  label: string;
  type: "select" | "multiselect" | "date" | "dateRange" | "custom";
  options?: Array<{ label: string; value: string; count?: number }>;
  defaultValue?: any;
  onChange?: (value: any) => void;
  value?: string;
  onClick?: () => void;
}

// Toolbar configuration
export interface ToolbarConfig {
  showSearch?: boolean;
  showFilters?: boolean;
  showColumnVisibility?: boolean;
  showCustomActions?: boolean;
  customActions?: React.ReactNode;
  searchPlaceholder?: string;
  onOpenFilters?: () => void;
  filters?: TableFilter[];
}

// Table header configuration
export interface TableHeaderConfig {
  title?: string;
  subtitle?: string;
  description?: string;
  showRecordCount?: boolean;
  customHeader?: React.ReactNode;
}

// Table footer configuration
export interface TableFooterConfig {
  showPagination?: boolean;
  showRowCount?: boolean;
  showSelectedCount?: boolean;
  customFooter?: React.ReactNode;
}

// Action cell configuration
export interface ActionCellConfig<TData extends BaseTableData> {
  actions: Array<{
    label: string;
    icon?: React.ReactNode;
    variant?:
      | "primary"
      | "mono"
      | "destructive"
      | "secondary"
      | "outline"
      | "dashed"
      | "ghost"
      | "dim"
      | "foreground"
      | "inverse";
    onClick: (row: Row<TData>) => void;
    show?: (row: Row<TData>) => boolean;
  }>;
  showDropdown?: boolean;
  maxVisibleActions?: number;
}

// Table state
export interface TableState {
  pagination: PaginationState;
  sorting: SortingState;
  rowSelection: RowSelectionState;
  searchQuery: string;
  filters: Record<string, any>;
  columnVisibility: Record<string, boolean>;
}

// Empty state configuration
export interface EmptyStateConfig {
  // Content
  title?: string;
  description?: string;

  // Illustration/Icon
  illustration?: React.ReactNode;
  icon?: React.ReactNode;

  // Action
  actionLabel?: string;
  onAction?: () => void;
  actionVariant?: "primary" | "destructive" | "outline" | "secondary" | "ghost";

  // Styling
  size?: "sm" | "md" | "lg";

  // Predefined empty state types
  type?:
    | "noData"
    | "noMerchants"
    | "noUsers"
    | "noTransactions"
    | "noSearchResults"
    | "error";
}

// Table props
export interface ReusableTableProps<TData extends BaseTableData> {
  config: TableConfig<TData>;
  headerConfig?: TableHeaderConfig;
  toolbarConfig?: ToolbarConfig;
  footerConfig?: TableFooterConfig;
  actionConfig?: ActionCellConfig<TData>;
  emptyStateConfig?: EmptyStateConfig;
  onRowClick?: (row: Row<TData>) => void;
  onSelectionChange?: (selectedRows: TData[]) => void;
  onFilterPressed?: () => void;
  className?: string;
  loading?: boolean;
  error?: string;
}

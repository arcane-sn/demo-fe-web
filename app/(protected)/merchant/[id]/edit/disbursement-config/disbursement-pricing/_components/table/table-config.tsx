import { 
  type TableConfig, 
  type ActionCellConfig,
  type TableHeaderConfig,
  type ToolbarConfig,
  type TableFooterConfig
} from '@/components/table';
import { Trash2, Edit } from 'lucide-react';
import { BankData } from '../../_lib/types';
import { TABLE_CONSTANTS, FILTER_OPTIONS, TABLE_LAYOUT } from '../../_lib/constants';

// Action configuration for edit column
export const createEditActionConfig = (): ActionCellConfig<BankData> => ({
  actions: [
    {
      label: '',
      icon: <Edit className="h-4 w-4" />,
      variant: 'outline',
      onClick: (row) => {
        // TODO: Implement edit bank functionality
      },
    },
  ],
  showDropdown: false,
});

// Action configuration for delete column  
export const createDeleteActionConfig = (): ActionCellConfig<BankData> => ({
  actions: [
    {
      label: '',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'outline',
      onClick: (row) => {
        // TODO: Implement delete bank functionality
      },
    },
  ],
  showDropdown: false,
});

/**
 * Creates table configuration for disbursement pricing
 * @param data - Array of bank data
 * @returns Table configuration object
 */
export const createTableConfig = (data: BankData[]): Omit<TableConfig<BankData>, 'columns'> => ({
  data,
  enableRowSelection: true,
  enableSorting: true,
  enablePagination: true,
  enableColumnVisibility: true,
  enableColumnResizing: true,
  pageSize: TABLE_CONSTANTS.PAGE_SIZE,
  searchable: true,
  searchPlaceholder: TABLE_CONSTANTS.SEARCH_PLACEHOLDER,
  searchFields: [...TABLE_CONSTANTS.SEARCH_FIELDS],
  customFilters: [
    {
      id: 'status',
      label: 'Status',
      type: 'multiselect' as const,
      options: FILTER_OPTIONS.STATUS,
    },
  ],
  tableLayout: TABLE_LAYOUT,
});

// Header configuration
export const createHeaderConfig = (): TableHeaderConfig => ({
  title: 'Bank List',
  subtitle: '',
  showRecordCount: true,
});

/**
 * Creates toolbar configuration for disbursement pricing table
 * @returns Toolbar configuration object
 */
export const createToolbarConfig = (): ToolbarConfig => ({
  showSearch: true,
  showFilters: true,
  showColumnVisibility: true,
  searchPlaceholder: TABLE_CONSTANTS.SEARCH_PLACEHOLDER,
});

// Footer configuration
export const createFooterConfig = (): TableFooterConfig => ({
  showPagination: true,
  showRowCount: true,
  showSelectedCount: true,
});

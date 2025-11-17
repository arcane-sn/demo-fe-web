'use client';

import { TableConfig, ActionCellConfig } from '@/components/table';
import { EmptyStateConfig } from '@/components/table/types';
import { MerchantData } from '../../../../types/merchant';
import { Eye, Edit, Trash2 } from 'lucide-react';

export interface MerchantTableConfigProps {
  data: MerchantData[];
  onView?: (merchant: MerchantData) => void;
  onEdit?: (merchant: MerchantData) => void;
  onDelete?: (merchant: MerchantData) => void;
  onCreate?: () => void;
}

export function useMerchantTableConfig({
  data,
  onView,
  onEdit,
  onDelete,
  onCreate,
}: MerchantTableConfigProps) {
  // Define action configuration
  const actionConfig: ActionCellConfig<MerchantData> = {
    actions: [
      {
        label: 'View Details',
        icon: <Eye className="h-4 w-4" />,
        onClick: (row) => onView?.(row.original),
      },
      {
        label: 'Edit',
        icon: <Edit className="h-4 w-4" />,
        onClick: (row) => onEdit?.(row.original),
      },
      {
        label: 'Delete',
        icon: <Trash2 className="h-4 w-4" />,
        variant: 'destructive',
        onClick: (row) => onDelete?.(row.original),
      },
    ],
    showDropdown: true,
  };

  // Define table configuration (without columns - will be added in main component)
  const tableConfig = {
    data,
    enableRowSelection: true,
    enableSorting: true,
    enablePagination: true,
    enableColumnVisibility: true,
    enableColumnResizing: false,
    pageSize: 10,
    searchable: true,
    searchPlaceholder: 'Search merchants...',
    searchFields: ['companyName', 'brandName', 'clientId'],
    customFilters: [
      {
        id: 'merchantLevel',
        label: 'Merchant Level',
        type: 'multiselect' as const,
        options: [
          { label: 'Level 0', value: 'Level 0', count: 8 },
          { label: 'Level 1', value: 'Level 1', count: 0 },
          { label: 'Level 2', value: 'Level 2', count: 0 },
        ],
      },
      {
        id: 'productionStatus',
        label: 'Production Status',
        type: 'multiselect' as const,
        options: [
          { label: 'Active', value: 'active', count: 8 },
          { label: 'Inactive', value: 'inactive', count: 0 },
        ],
      },
      {
        id: 'sandboxStatus',
        label: 'Sandbox Status',
        type: 'multiselect' as const,
        options: [
          { label: 'Active', value: 'active', count: 0 },
          { label: 'Inactive', value: 'inactive', count: 8 },
        ],
      },
    ],
  };

  // Define header configuration
  const headerConfig = {
    title: 'Merchant List',
    subtitle: '',
    showRecordCount: true,
  };

  // Define toolbar configuration
  const toolbarConfig = {
    showSearch: true,
    showFilters: true,
    showColumnVisibility: true,
    searchPlaceholder: 'Search merchants...',
  };

  // Define footer configuration
  const footerConfig = {
    showPagination: true,
    showRowCount: true,
    showSelectedCount: true,
  };

  // Custom illustration component untuk merchant empty state
  const MerchantEmptyIllustration = () => (
    <div className="w-32 h-32 mx-auto mb-6">
      <img 
        src="/media/illustrations/1.svg" 
        alt="No merchants illustration"
        className="w-full h-full object-contain"
      />
    </div>
  );

  // Define empty state configuration
  const emptyStateConfig: EmptyStateConfig = {
    title: "No Merchants Yet",
    description: "Looks like you don't have any merchants. Add one now to begin managing your business transactions.",
    illustration: <MerchantEmptyIllustration />,
    actionLabel: 'Create New Merchant',
    onAction: onCreate,
  };

  return {
    tableConfig,
    actionConfig,
    headerConfig,
    toolbarConfig,
    footerConfig,
    emptyStateConfig,
  };
}

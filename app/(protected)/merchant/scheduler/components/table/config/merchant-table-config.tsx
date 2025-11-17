'use client';

import { TableConfig, ActionCellConfig } from '@/components/table';
import { EmptyStateConfig } from '@/components/table/types';
import { MerchantData } from '../../../types/merchant-data';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface MerchantTableConfigProps {
  data: MerchantData[];
  onView?: (merchant: MerchantData) => void;
  onEdit?: (merchant: MerchantData) => void;
  onDelete?: (merchant: MerchantData) => void;
  onCreate?: () => void;
  onExport?: (data: MerchantData[]) => void;
}

export function useMerchantTableConfig({
  data,
  onView,
  onEdit,
  onDelete,
  onCreate,
  onExport,
}: MerchantTableConfigProps) {
  // Define action configuration
  const actionConfig: ActionCellConfig<MerchantData> = {
    actions: [
      {
        label: '',
        icon: <Edit className="h-8 w-8" />,
        onClick: (row) => onEdit?.(row.original),
      },
    ],
    showDropdown: false,
    maxVisibleActions: 1,
  };

  // Define table configuration (without columns - will be added in main component)
  const tableConfig = {
    data,
    enableRowSelection: true,
    enableSorting: true,
    enablePagination: true,
    enableColumnVisibility: true,
    enableColumnResizing: true,
    pageSize: 10,
    searchable: true,
    searchPlaceholder: 'Search merchant name...',
    searchFields: ['merchantName', 'clientId'],
    showSearchBar: true,
    searchBarPlaceholder: 'Search merchant name',
    searchPosition: null, // Search bar akan muncul di sebelah kanan samping filter
    customFilters: [
      {
        id: 'updatedDate',
        label: 'Updated Date',
        type: 'dateRange' as const,
        defaultValue: {
          start: '2025-01-01',
          end: '2026-12-31'
        }
      },
      {
        id: 'merchantName',
        label: 'Merchant Name',
        type: 'select' as const,
        options: [
          { label: 'DigiStore', value: 'DigiStore', count: 1 },
          { label: 'TechHub', value: 'TechHub', count: 1 },
          { label: 'MySolutions', value: 'MySolutions', count: 1 },
          { label: 'FutureWorks', value: 'FutureWorks', count: 1 },
          { label: 'KreatifHub', value: 'KreatifHub', count: 1 },
          { label: 'VisionaryStore', value: 'VisionaryStore', count: 1 },
          { label: 'InnovateNow', value: 'InnovateNow', count: 1 },
          { label: 'SuccessStore', value: 'SuccessStore', count: 1 },
          { label: 'KreasiLab', value: 'KreasiLab', count: 1 },
          { label: 'InovasiShop', value: 'InovasiShop', count: 1 },
        ],
      },
      {
        id: 'settlement',
        label: 'Settlement',
        type: 'multiselect' as const,
        options: [
          { label: 'Active', value: 'active', count: 6 },
          { label: 'Inactive', value: 'inactive', count: 4 },
        ],
      },
      {
        id: 'transactionReport',
        label: 'Transaction Report',
        type: 'multiselect' as const,
        options: [
          { label: 'Active', value: 'active', count: 6 },
          { label: 'Inactive', value: 'inactive', count: 4 },
        ],
      },
      {
        id: 'transactionSummary',
        label: 'Transaction Summary',
        type: 'multiselect' as const,
        options: [
          { label: 'Active', value: 'active', count: 4 },
          { label: 'Inactive', value: 'inactive', count: 6 },
        ],
      },
      {
        id: 'balanceStatement',
        label: 'Balance Statement',
        type: 'multiselect' as const,
        options: [
          { label: 'Active', value: 'active', count: 6 },
          { label: 'Inactive', value: 'inactive', count: 4 },
        ],
      },
      {
        id: 'disbursement',
        label: 'Disbursement',
        type: 'multiselect' as const,
        options: [
          { label: 'Active', value: 'active', count: 10 },
          { label: 'Inactive', value: 'inactive', count: 0 },
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
    showCustomActions: true,
    searchPlaceholder: 'Search merchant name...',
    customActions: (
      <Button
        variant="outline"
        size="sm"
        className="px-2.5 py-2.25 bg-white border-[#DBDFE9] hover:bg-gray-50"
        onClick={() => onExport?.(data)}
      >
        <span className="text-xs font-medium text-[#4B5675]">Export</span>
      </Button>
    ),
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
    description: "Looks like you don't have any merchants. Add one now to begin managing your merchant data.",
    illustration: <MerchantEmptyIllustration />,
    actionLabel: 'Add New Merchant',
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
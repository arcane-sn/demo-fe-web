'use client';

import { TableConfig, ActionCellConfig } from '@/components/table';
import { EmptyStateConfig } from '@/components/table/types';
import { ChannelData } from '../../../../types/channel';
import { Eye, Edit, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ChannelTableConfigProps {
  data: ChannelData[];
  onView?: (channel: ChannelData) => void;
  onEdit?: (channel: ChannelData) => void;
  onDelete?: (channel: ChannelData) => void;
  onCreate?: () => void;
  onExport?: (data: ChannelData[]) => void;
}

export function useChannelTableConfig({
  data,
  onView,
  onEdit,
  onDelete,
  onCreate,
  onExport,
}: ChannelTableConfigProps) {
  // Define action configuration
  const actionConfig: ActionCellConfig<ChannelData> = {
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
    enableColumnResizing: false,
    pageSize: 10,
    searchable: true,
    searchPlaceholder: 'Search merchant name...',
    searchFields: ['merchantName', 'clientId', 'channel.name'],
    showSearchBar: true,
    searchBarPlaceholder: 'Search merchant name',
    searchPosition: null, // Search bar akan muncul di sebelah kanan samping filter
    customFilters: [
      {
        id: 'registeredDate',
        label: 'Registered Date',
        type: 'dateRange' as const,
        defaultValue: {
          start: '2025-01-12',
          end: '2025-12-31'
        }
      },
      {
        id: 'merchantName',
        label: 'Merchant Name',
        type: 'select' as const,
        options: [
          { label: 'DigiStore', value: 'DigiStore', count: 52 },
          { label: 'Other Merchant', value: 'Other Merchant', count: 0 },
        ],
      },
      {
        id: 'paymentMethod',
        label: 'Payment Method',
        type: 'multiselect' as const,
        options: [
          { label: 'E-Wallet', value: 'e_wallet', count: 52 },
          { label: 'Bank Transfer', value: 'bank_transfer', count: 0 },
          { label: 'Credit Card', value: 'credit_card', count: 0 },
          { label: 'Debit Card', value: 'debit_card', count: 0 },
          { label: 'Virtual Account', value: 'virtual_account', count: 0 },
        ],
      },
      {
        id: 'channel',
        label: 'Channel',
        type: 'multiselect' as const,
        options: [
          { label: 'DANA', value: 'DANA', count: 6 },
          { label: 'OVO', value: 'OVO', count: 6 },
          { label: 'LinkAja', value: 'LinkAja', count: 6 },
          { label: 'GoPay', value: 'GoPay', count: 5 },
          { label: 'PayPal', value: 'PayPal', count: 5 },
          { label: 'Tcash', value: 'Tcash', count: 5 },
          { label: 'Jenius', value: 'Jenius', count: 5 },
          { label: 'Cash', value: 'Cash', count: 5 },
          { label: 'Alipay', value: 'Alipay', count: 5 },
          { label: 'Zelle', value: 'Zelle', count: 4 },
        ],
      },
      {
        id: 'provider',
        label: 'Provider',
        type: 'multiselect' as const,
        options: [
          { label: 'PIRO', value: 'PIRO', count: 52 },
          { label: 'Other', value: 'Other', count: 0 },
        ],
      },
    ],
  };

  // Define header configuration
  const headerConfig = {
    title: 'Channel List',
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
        <Download className="w-3.5 h-3.5 text-[#99A1B7]" />
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

  // Custom illustration component untuk channel empty state
  const ChannelEmptyIllustration = () => (
    <div className="w-32 h-32 mx-auto mb-6">
      <img 
        src="/media/illustrations/1.svg" 
        alt="No channels illustration"
        className="w-full h-full object-contain"
      />
    </div>
  );

  // Define empty state configuration
  const emptyStateConfig: EmptyStateConfig = {
    title: "No Channels Yet",
    description: "Looks like you don't have any channels. Add one now to begin managing your payment channels.",
    illustration: <ChannelEmptyIllustration />,
    actionLabel: 'Add New Channel',
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

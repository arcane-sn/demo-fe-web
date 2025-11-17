'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ReusableTable } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { ActivityLog, ActivityData } from './types';
import { BaseTableData, TableConfig, TableHeaderConfig, ToolbarConfig, TableFooterConfig, TableFilter } from '@/components/table/types';

// Extend ActivityLog to match BaseTableData
interface ActivityTableData extends ActivityLog, BaseTableData {}

interface ActivityTableProps {
  data: ActivityData;
  loading?: boolean;
  error?: string;
}

export function ActivityTable({ data, loading = false, error }: ActivityTableProps) {
  // Define columns
  const columns: ColumnDef<ActivityTableData>[] = [
    {
      accessorKey: 'timestamp',
      header: ({ column }) => (
        <DataGridColumnHeader column={column} title="Timestamp" />
      ),
      enablePinning: true,
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({ row }) => {
        const timestamp = row.getValue('timestamp') as string;
        return (
          <div className="text-sm">
            {timestamp}
          </div>
        );
      },
    },
    {
      accessorKey: 'action',
      header: ({ column }) => (
        <DataGridColumnHeader column={column} title="Action" />
      ),
      enablePinning: true,
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({ row }) => {
        const action = row.getValue('action') as string;
        return (
          <div className="text-sm font-medium">
            {action}
          </div>
        );
      },
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataGridColumnHeader column={column} title="Description" />
      ),
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({ row }) => {
        const description = row.getValue('description') as string;
        return (
          <div className="text-sm">
            {description}
          </div>
        );
      },
    },
    {
      accessorKey: 'user',
      header: ({ column }) => (
        <DataGridColumnHeader column={column} title="User" />
      ),
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({ row }) => {
        const user = row.getValue('user') as string;
        return (
          <div className="text-sm">
            {user}
          </div>
        );
      },
    },
    {
      accessorKey: 'ipAddress',
      header: ({ column }) => (
        <DataGridColumnHeader column={column} title="IP Address" />
      ),
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({ row }) => {
        const ipAddress = row.getValue('ipAddress') as string;
        return (
          <div className="text-sm">
            {ipAddress}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataGridColumnHeader column={column} title="Status" />
      ),
      enablePinning: true,
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <div className="flex justify-start">
            <Badge 
              variant={status === 'success' ? 'success' : status === 'failed' ? 'destructive' : 'warning'}
              size="sm"
              className="inline-flex w-fit"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        );
      },
    },
  ];

  // Custom filters
  const customFilters: TableFilter[] = [
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'All', value: '' },
        { label: 'Success', value: 'success' },
        { label: 'Failed', value: 'failed' },
        { label: 'Pending', value: 'pending' }
      ]
    },
    {
      id: 'action',
      label: 'Action',
      type: 'select',
      options: [
        { label: 'All', value: '' },
        { label: 'Login', value: 'Login' },
        { label: 'Logout', value: 'Logout' },
        { label: 'Update Profile', value: 'Update Profile' },
        { label: 'API Call', value: 'API Call' },
        { label: 'Transaction', value: 'Transaction' },
        { label: 'Password Change', value: 'Password Change' },
        { label: 'Settings Update', value: 'Settings Update' },
        { label: 'Data Export', value: 'Data Export' },
        { label: 'System Check', value: 'System Check' }
      ]
    },
    {
      id: 'user',
      label: 'User',
      type: 'select',
      options: [
        { label: 'All', value: '' },
        { label: 'admin@merchant.com', value: 'admin@merchant.com' },
        { label: 'system', value: 'system' }
      ]
    }
  ];

  // Table configuration
  const tableConfig: TableConfig<ActivityTableData> = {
    data: data.logs.map(log => ({ ...log, id: log.id })),
    columns,
    enableRowSelection: false,
    enableSorting: true,
    enablePagination: true,
    enableColumnVisibility: true,
    enableColumnResizing: true,
    enableColumnPinning: true,
    enableColumnMoving: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    searchable: true,
    searchPlaceholder: 'Search activities...',
    searchFields: ['action', 'description', 'user', 'ipAddress'],
    customFilters,
    tableLayout: {
      columnsPinnable: true,
      columnsMovable: true,
      columnsVisibility: true,
      cellBorder: true,
    }
  };

  // Header configuration
  const headerConfig: TableHeaderConfig = {
    title: 'Activity Logs',
    subtitle: 'Recent merchant activities and system events',
    showRecordCount: true,
  };

  // Toolbar configuration
  const toolbarConfig: ToolbarConfig = {
    showSearch: true,
    showFilters: true,
    showColumnVisibility: true,
    searchPlaceholder: 'Search activities...',
  };

  // Footer configuration
  const footerConfig: TableFooterConfig = {
    showPagination: true,
    showRowCount: true,
    showSelectedCount: false,
  };

  return (
    <ReusableTable
      config={tableConfig}
      headerConfig={headerConfig}
      toolbarConfig={toolbarConfig}
      footerConfig={footerConfig}
      loading={loading}
      error={error}
      emptyStateConfig={{
        type: 'noData',
        title: 'No Activity Logs',
        description: 'No activity logs found for this merchant.',
      }}
    />
  );
}

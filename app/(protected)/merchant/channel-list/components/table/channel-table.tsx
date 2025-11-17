'use client';

import React from 'react';
import { ReusableTable } from '@/components/table';
import { ChannelData } from '../../../types/channel';
import { useChannelTableColumns } from './channel-table-columns';
import { useChannelTableConfig } from './config/channel-table-config';

interface ChannelTableProps {
  data: ChannelData[];
  onView?: (channel: ChannelData) => void;
  onEdit?: (channel: ChannelData) => void;
  onDelete?: (channel: ChannelData) => void;
  onCreate?: () => void;
  onExport?: (data: ChannelData[]) => void;
  onRowClick?: (channel: ChannelData) => void;
  onSelectionChange?: (selectedChannels: ChannelData[]) => void;
  onFilterPressed?: () => void;
  loading?: boolean;
  error?: string;
}

export function ChannelTable({
  data,
  onView,
  onEdit,
  onDelete,
  onCreate,
  onExport,
  onRowClick,
  onSelectionChange,
  onFilterPressed,
  loading = false,
  error,
}: ChannelTableProps) {
  // Get columns from custom hook
  const columns = useChannelTableColumns();

  // Get table configuration from custom hook
  const {
    tableConfig,
    actionConfig,
    headerConfig,
    toolbarConfig,
    footerConfig,
    emptyStateConfig,
  } = useChannelTableConfig({
    data,
    onView,
    onEdit,
    onDelete,
    onCreate,
    onExport,
  });

  // Add columns to table config
  const finalTableConfig = {
    ...tableConfig,
    columns,
  };

  const handleRowClick = (row: any) => {    
    if (onRowClick) {      
      if (row && row.original) {
        onRowClick(row.original);
      } else if (row && row.id) {
        onRowClick(row);
      } else {
        console.error('Invalid row data received:', row);
      }
    }
  };

  return (
    <div>
      <ReusableTable
        config={finalTableConfig}
        headerConfig={headerConfig}
        toolbarConfig={toolbarConfig}
        footerConfig={footerConfig}
        actionConfig={actionConfig}
        emptyStateConfig={emptyStateConfig}
        onRowClick={handleRowClick}
        onSelectionChange={onSelectionChange}
        onFilterPressed={onFilterPressed}
        loading={loading}
        error={error}
      />
    </div>
  );
}

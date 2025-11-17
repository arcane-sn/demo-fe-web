'use client';

import React from 'react';
import { ReusableTable } from '@/components/table';
import { MerchantData } from '../../../types/merchant';
import { useMerchantTableColumns } from './merchant-table-columns';
import { useMerchantTableConfig } from './config';

interface MerchantTableProps {
  data: MerchantData[];
  onView?: (merchant: MerchantData) => void;
  onEdit?: (merchant: MerchantData) => void;
  onDelete?: (merchant: MerchantData) => void;
  onCreate?: () => void;
  onRowClick?: (merchant: MerchantData) => void;
  onSelectionChange?: (selectedMerchants: MerchantData[]) => void;
  loading?: boolean;
  error?: string;
}

export function MerchantTable({
  data,
  onView,
  onEdit,
  onDelete,
  onCreate,
  onRowClick,
  onSelectionChange,
  loading = false,
  error,
}: MerchantTableProps) {
  // Get columns from custom hook
  const columns = useMerchantTableColumns();

  // Get table configuration from custom hook
  const {
    tableConfig,
    actionConfig,
    headerConfig,
    toolbarConfig,
    footerConfig,
    emptyStateConfig,
  } = useMerchantTableConfig({
    data,
    onView,
    onEdit,
    onDelete,
    onCreate,
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
        loading={loading}
        error={error}
      />
    </div>
  );
}
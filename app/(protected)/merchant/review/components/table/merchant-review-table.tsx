'use client';

import React from 'react';
import { ReusableTable } from '@/components/table';
import { MerchantReviewData } from '../../core';
import { useMerchantReviewTableColumns } from './merchant-review-table-columns';
import { useMerchantReviewTableConfig } from './config';

interface MerchantReviewTableProps {
  data: MerchantReviewData[];
  onView?: (merchant: MerchantReviewData) => void;
  onApprove?: (merchant: MerchantReviewData) => void;
  onReject?: (merchant: MerchantReviewData) => void;
  onContinueDraft?: (merchant: MerchantReviewData) => void;
  onSelectionChange?: (selectedMerchants: MerchantReviewData[]) => void;
  loading?: boolean;
  error?: string;
}

export function MerchantReviewTable({
  data,
  onView,
  onApprove,
  onReject,
  onContinueDraft,
  onSelectionChange,
  loading = false,
  error,
}: MerchantReviewTableProps) {
  // Get columns from custom hook
  const columns = useMerchantReviewTableColumns();

  // Get table configuration from custom hook
  const {
    tableConfig,
    actionConfig,
    headerConfig,
    toolbarConfig,
    footerConfig,
  } = useMerchantReviewTableConfig({
    data,
    onView,
    onApprove,
    onReject,
    onContinueDraft,
  });

  // Add columns to table config
  const finalTableConfig = {
    ...tableConfig,
    columns,
  };

  return (
    <div>
      <ReusableTable
        config={finalTableConfig}
        headerConfig={headerConfig}
        toolbarConfig={toolbarConfig}
        footerConfig={footerConfig}
        actionConfig={actionConfig}
        onSelectionChange={onSelectionChange}
        loading={loading}
        error={error}
      />
    </div>
  );
}

'use client';

import { ActionCellConfig } from '@/components/table';
import { MerchantReviewData } from '../../../core';
import { Eye, CheckCircle, XCircle, FileText } from 'lucide-react';

export interface MerchantReviewTableConfigProps {
  data: MerchantReviewData[];
  onView?: (merchant: MerchantReviewData) => void;
  onApprove?: (merchant: MerchantReviewData) => void;
  onReject?: (merchant: MerchantReviewData) => void;
  onContinueDraft?: (merchant: MerchantReviewData) => void;
}

export function useMerchantReviewTableConfig({
  data,
  onView,
  onApprove,
  onReject,
  onContinueDraft,
}: MerchantReviewTableConfigProps) {
  // Action configuration
  const actionConfig: ActionCellConfig<MerchantReviewData> = {
    actions: [
      {
        label: 'See Detail',
        icon: <Eye className="h-4 w-4" />,
        onClick: (row) => onView?.(row.original),
      },
      {
        label: 'Continue Draft',
        icon: <FileText className="h-4 w-4" />,
        onClick: (row) => onContinueDraft?.(row.original),
        show: (row) => row.original.reviewStatus === 'draft',
      },
      {
        label: 'Approve Merchant',
        icon: <CheckCircle className="h-4 w-4" />,
        variant: 'primary',
        onClick: (row) => onApprove?.(row.original),
        show: (row) => row.original.reviewStatus === 'pending-review',
      },
      {
        label: 'Reject Merchant',
        icon: <XCircle className="h-4 w-4" />,
        variant: 'destructive',
        onClick: (row) => onReject?.(row.original),
        show: (row) => row.original.reviewStatus === 'pending-review',
      },
    ],
    showDropdown: true,
  };

  // Table configuration (without columns - will be added in main component)
  const tableConfig = {
    data,
    enableRowSelection: true,
    enableSorting: true,
    enablePagination: true,
    enableColumnVisibility: true,
    enableColumnResizing: false,
    pageSize: 10,
    searchable: true,
    searchPlaceholder: 'Search Merchant Name or Client ID',
    searchFields: ['companyName', 'brandName', 'clientId'],
    customFilters: [
        {
          id: 'reviewStatus',
          label: 'Review Status',
          type: 'select' as const,
          options: [
            { label: 'All', value: '' },
            { label: 'Draft', value: 'draft' },
            { label: 'Pending Review', value: 'pending-review' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ],
        },
        {
          id: 'merchantLevel',
          label: 'Merchant Level',
          type: 'select' as const,
          options: [
            { label: 'All', value: '' },
            { label: 'Level 0', value: '0' },
            { label: 'Level 1', value: '1' },
            { label: 'Level 2', value: '2' },
          ],
        },
      ],
  };

  // Header configuration
  const headerConfig = {
    title: 'Merchant List',
    showRecordCount: true,
  };

  // Toolbar configuration
  const toolbarConfig = {
    showSearch: true,
    showFilters: true,
    showExport: true,
    showColumnVisibility: true,
  };

  // Footer configuration
  const footerConfig = {
    showPagination: true,
    showRowCount: true,
    showSelectedCount: true,
  };

  return {
    tableConfig,
    actionConfig,
    headerConfig,
    toolbarConfig,
    footerConfig,
  };
}

"use client";

import { useMemo } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Button } from '@/components/ui/button';
import { X, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { ReusableTable } from '@/components/table';
import { ColumnDef } from '@tanstack/react-table';
import { Merchant } from '../../../core/data/mock-merchants';

interface MerchantSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectMerchant: (merchant: Merchant) => void;
  merchants: Merchant[];
  loading?: boolean;
  error?: string;
}


export function MerchantSelectionModal({
  open,
  onOpenChange,
  onSelectMerchant,
  merchants,
  loading = false,
  error
}: MerchantSelectionModalProps) {
  const { copyToClipboard } = useCopyToClipboard();

  // Define columns for ReusableTable with wider widths
  const columns: ColumnDef<Merchant>[] = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Merchant Name',
      size: 300,
      minSize: 250,
      cell: ({ row }) => (
        <span className="font-medium text-gray-900">
          {row.getValue('name')}
        </span>
      ),
    },
    {
      accessorKey: 'clientId',
      header: 'Client ID',
      size: 200,
      minSize: 180,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-gray-900">{row.getValue('clientId')}</span>
          <button
            onClick={() => copyToClipboard(row.getValue('clientId'))}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Copy className="w-3 h-3 text-gray-500" />
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'activeBalance',
      header: 'Active Balance',
      size: 180,
      minSize: 160,
      cell: ({ row }) => (
        <span className="text-gray-900">{row.getValue('activeBalance')}</span>
      ),
    },
    {
      accessorKey: 'pendingBalance',
      header: 'Pending Balance',
      size: 180,
      minSize: 160,
      cell: ({ row }) => (
        <span className="text-gray-900">{row.getValue('pendingBalance')}</span>
      ),
    },
    {
      accessorKey: 'holdBalance',
      header: 'Hold Balance',
      size: 180,
      minSize: 160,
      cell: ({ row }) => (
        <span className="text-gray-900">{row.getValue('holdBalance')}</span>
      ),
    },
    {
      accessorKey: 'totalBalance',
      header: 'Total Merchant Balance',
      size: 220,
      minSize: 200,
      cell: ({ row }) => (
        <span className="text-gray-900">{row.getValue('totalBalance')}</span>
      ),
    },
    {
      id: 'actions',
      header: 'Action',
      size: 120,
      minSize: 100,
      cell: ({ row }) => (
        <Button
          onClick={() => onSelectMerchant(row.original)}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Select
        </Button>
      ),
    },
  ], [copyToClipboard, onSelectMerchant]);

  // Table configuration
  const tableConfig = useMemo(() => ({
    data: merchants,
    columns,
    enableSorting: true,
    enablePagination: true,
    enableColumnVisibility: true,
    enableColumnPinning: true,
    enableColumnResizing: true,
    enableColumnMoving: true,
    enableRowSelection: false, // Disable row selection/checkboxes
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    searchable: true,
    searchPlaceholder: 'Search Merchants',
    searchFields: ['name', 'clientId'] as (keyof Merchant)[],
    // Enable horizontal scrolling and column features
    tableLayout: {
      cellBorder: true,
      columnsPinnable: true,
      columnsMovable: true,
      columnsVisibility: true,
    },
  }), [columns]);

  const toolbarConfig = useMemo(() => ({
    showSearch: true,
    showColumnVisibility: false,
    showFilters: false,
    searchPlaceholder: 'Search Merchants',
  }), []);

  const headerConfig = useMemo(() => ({
    title: 'Select Merchant to Change Balance Source',
    subtitle: '',
    showRecordCount: false,
  }), []);

  const footerConfig = useMemo(() => ({
    showPagination: true,
    showRowCount: true,
  }), []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-6xl max-h-[90vh] p-0"
        close={false}
      >
        <VisuallyHidden>
          <DialogTitle>Select Merchant to Change Balance Source</DialogTitle>
        </VisuallyHidden>
        
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-100 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ReusableTable - Full Modal Content */}
        <ReusableTable
          config={tableConfig}
          headerConfig={headerConfig}
          toolbarConfig={toolbarConfig}
          footerConfig={footerConfig}
          className="w-full h-full"
        />
      </DialogContent>
    </Dialog>
  );
}

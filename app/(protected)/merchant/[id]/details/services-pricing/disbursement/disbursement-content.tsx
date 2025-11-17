'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ReusableTable } from '@/components/table';
import { BaseTableData, TableConfig, TableHeaderConfig, ToolbarConfig, TableFooterConfig } from '@/components/table/types';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronUp, ChevronDown, X } from 'lucide-react';

interface BankData extends BaseTableData {
  id: string;
  status: 'Active' | 'Inactive';
  bankCode: string;
  bankName: string;
  feeTransfer: string;
  feeTransferToVA: string;
  feeInquiry: string;
  feeInquiryToVA: string;
  feeRefund: string;
  minimumTransfer: string;
  maximumTransfer: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  deletedDate: string;
  deletedBy: string;
}

const bankData: BankData[] = [
  {
    id: '1',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: '-',
    updatedBy: '-',
    deletedDate: '-',
    deletedBy: '-',
  },
  {
    id: '2',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
  {
    id: '3',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
  {
    id: '4',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
  {
    id: '5',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
  {
    id: '6',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
  {
    id: '7',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
  {
    id: '8',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
  {
    id: '9',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
  {
    id: '10',
    status: 'Active',
    bankCode: '008',
    bankName: 'Bank Mandiri',
    feeTransfer: 'IDR 5.000',
    feeTransferToVA: 'IDR 0',
    feeInquiry: 'IDR 100',
    feeInquiryToVA: 'IDR 0',
    feeRefund: 'IDR 4.500',
    minimumTransfer: 'IDR 10.000',
    maximumTransfer: 'IDR 100.000.000',
    createdDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    createdBy: 'wakwaw waw',
    updatedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    updatedBy: 'wakwaw waw',
    deletedDate: 'Thu, Dec 16, 2025 23:12:32 (GMT +7)',
    deletedBy: 'wakwaw waw',
  },
];

export function DisbursementContent() {
  const [activeTab, setActiveTab] = useState('bank-list');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define table columns
  const columns: ColumnDef<BankData>[] = [
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Status
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
      cell: ({ row }) => (
        <Badge variant="success" appearance="light" size="sm">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          {row.getValue('status')}
        </Badge>
      ),
    },
    {
      accessorKey: 'bankCode',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Bank Code
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'bankName',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Bank Name
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'feeTransfer',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Fee Transfer
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'feeTransferToVA',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Fee Transfer to VA
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'feeInquiry',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Fee Inquiry
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'feeInquiryToVA',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Fee Inquiry to VA
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'feeRefund',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Fee Refund
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'minimumTransfer',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Minimum Transfer
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'maximumTransfer',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Maximum Transfer
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'createdDate',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Created Date
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'createdBy',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Created by
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'updatedDate',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Updated Date
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'updatedBy',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Updated by
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'deletedDate',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Deleted Date
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'deletedBy',
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          Deleted by
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-muted rounded p-1"
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      ),
    },
  ];

  // Table configuration
  const tableConfig: TableConfig<BankData> = {
    data: bankData,
    columns,
    enableRowSelection: false,
    enableSorting: true,
    enablePagination: true,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50],
    searchable: true,
    searchPlaceholder: 'Search bank code or bank name',
    searchFields: ['bankCode', 'bankName'],
  };

  // Header configuration
  const headerConfig: TableHeaderConfig = {
    title: 'Bank List',
    showRecordCount: false,
  };

  // Toolbar configuration
  const toolbarConfig: ToolbarConfig = {
    showSearch: true,
    showFilters: true,
    showColumnVisibility: false,
    showCustomActions: true,
    customActions: (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Created Date 01/12/2025 - 31/12/2025</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <X className="size-3" />
          </Button>
        </div>
        <Button variant="outline" size="sm">
          Filter
        </Button>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>
    ),
  };

  // Footer configuration
  const footerConfig: TableFooterConfig = {
    showPagination: true,
    showRowCount: true,
    showSelectedCount: false,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Disbursement Service</h2>
          <p className="text-muted-foreground">See all banks pricing and routing setup to this merchant</p>
        </div>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b">
        <button
          onClick={() => setActiveTab('bank-list')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'bank-list'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Bank List
        </button>
        <button
          onClick={() => setActiveTab('routing')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'routing'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Routing
        </button>
      </div>

      {/* Bank List Content */}
      {activeTab === 'bank-list' && isMounted && (
        <ReusableTable
          config={tableConfig}
          headerConfig={headerConfig}
          toolbarConfig={toolbarConfig}
          footerConfig={footerConfig}
        />
      )}

      {/* Routing Content */}
      {activeTab === 'routing' && (
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Routing</h3>
          <p className="text-muted-foreground">Routing configuration will be displayed here.</p>
        </div>
      )}
    </div>
  );
}

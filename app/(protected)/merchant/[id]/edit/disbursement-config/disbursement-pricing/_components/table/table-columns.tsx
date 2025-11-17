import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { Edit, Trash2 } from 'lucide-react';
import { BankData, FeeStructure } from '../../_lib/types';

// Helper function to format fee structure
const formatFeeStructure = (fee: FeeStructure): string => {
  const percentage = `${fee.percentage}%`;
  const fixed = `IDR ${parseInt(fee.fixed).toLocaleString()}`;
  return `${percentage} + ${fixed}`;
};

// Helper function to format transfer amounts
const formatTransferAmount = (amount: string): string => {
  return `IDR ${parseInt(amount).toLocaleString()}`;
};

// Table columns configuration
export const createTableColumns = (
  onEdit?: (bankData: BankData) => void,
  onDelete?: (bankData: BankData) => void
): ColumnDef<BankData>[] => [
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataGridColumnHeader title="Status" column={column} />
    ),
    cell: ({ row }) => (
      <Badge 
        variant="outline" 
        className="bg-green-50 text-green-700 border-green-200 rounded-full px-2 py-1"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        Active
      </Badge>
    ),
    size: 120,
    minSize: 100,
  },
  {
    accessorKey: 'bankCode',
    header: ({ column }) => (
      <DataGridColumnHeader title="Bank Code" column={column} />
    ),
    cell: ({ row }) => <span className="font-medium">{row.getValue('bankCode')}</span>,
    size: 120,
    minSize: 80,
  },
  {
    accessorKey: 'bankName',
    header: ({ column }) => (
      <DataGridColumnHeader title="Bank Name" column={column} />
    ),
    cell: ({ row }) => <span className="font-medium">{row.getValue('bankName')}</span>,
    size: 140,
    minSize: 120,
  },
  {
    accessorKey: 'feeTransfer',
    header: ({ column }) => (
      <DataGridColumnHeader title="Fee Transfer" column={column} />
    ),
    cell: ({ row }) => <span>{formatFeeStructure(row.getValue('feeTransfer'))}</span>,
    size: 140,
    minSize: 100,
  },
  {
    accessorKey: 'feeTransferToVA',
    header: ({ column }) => (
      <DataGridColumnHeader title="Fee Transfer to VA" column={column} />
    ),
    cell: ({ row }) => <span>{formatFeeStructure(row.getValue('feeTransferToVA'))}</span>,
    size: 160,
    minSize: 120,
  },
  {
    accessorKey: 'feeInquiry',
    header: ({ column }) => (
      <DataGridColumnHeader title="Fee Inquiry" column={column} />
    ),
    cell: ({ row }) => <span>{formatFeeStructure(row.getValue('feeInquiry'))}</span>,
    size: 120,
    minSize: 100,
  },
  {
    accessorKey: 'feeInquiryToVA',
    header: ({ column }) => (
      <DataGridColumnHeader title="Fee Inquiry to VA" column={column} />
    ),
    cell: ({ row }) => <span>{formatFeeStructure(row.getValue('feeInquiryToVA'))}</span>,
    size: 150,
    minSize: 120,
  },
  {
    accessorKey: 'feeRefund',
    header: ({ column }) => (
      <DataGridColumnHeader title="Fee Refund" column={column} />
    ),
    cell: ({ row }) => <span>{formatFeeStructure(row.getValue('feeRefund'))}</span>,
    size: 120,
    minSize: 100,
  },
  {
    accessorKey: 'minimumTransfer',
    header: ({ column }) => (
      <DataGridColumnHeader title="Minimum Transfer" column={column} />
    ),
    cell: ({ row }) => <span>{formatTransferAmount(row.getValue('minimumTransfer'))}</span>,
    size: 160,
    minSize: 120,
  },
  {
    accessorKey: 'maximumTransfer',
    header: ({ column }) => (
      <DataGridColumnHeader title="Maximum Transfer" column={column} />
    ),
    cell: ({ row }) => <span>{formatTransferAmount(row.getValue('maximumTransfer'))}</span>,
    size: 160,
    minSize: 140,
  },
  {
    accessorKey: 'providerRate',
    header: ({ column }) => (
      <DataGridColumnHeader title="Provider Rate" column={column} />
    ),
    cell: ({ row }) => <span>{formatFeeStructure(row.getValue('providerRate'))}</span>,
    size: 180,
    minSize: 110,
  },
  {
    accessorKey: 'merchantRate',
    header: ({ column }) => (
      <DataGridColumnHeader title="Merchant Rate" column={column} />
    ),
    cell: ({ row }) => <span>{formatFeeStructure(row.getValue('merchantRate'))}</span>,
    size: 180,
    minSize: 110,
  },
  {
    accessorKey: 'flypayRate',
    header: ({ column }) => (
      <DataGridColumnHeader title="Flypay Rate (Excluded)" column={column} />
    ),
    cell: ({ row }) => <span>{formatFeeStructure(row.getValue('flypayRate'))}</span>,
    size: 180,
    minSize: 140,
  },
  {
    accessorKey: 'salesReferralId',
    header: ({ column }) => (
      <DataGridColumnHeader title="Sales Referral ID" column={column} />
    ),
    cell: ({ row }) => <span>{row.getValue('salesReferralId')}</span>,
    size: 150,
    minSize: 130,
  },
  {
    accessorKey: 'salesReferralFee',
    header: ({ column }) => (
      <DataGridColumnHeader title="Sales Referral Fee (excluded)" column={column} />
    ),
    cell: ({ row }) => <span>{formatFeeStructure(row.getValue('salesReferralFee'))}</span>,
    size: 230,
    minSize: 160,
  },
  {
    accessorKey: 'merchantReferralId',
    header: ({ column }) => (
      <DataGridColumnHeader title="Merchant Referral ID" column={column} />
    ),
    cell: ({ row }) => <span>{row.getValue('merchantReferralId')}</span>,
    size: 180,
    minSize: 140,
  },
  {
    accessorKey: 'merchantReferralFee',
    header: ({ column }) => (
      <DataGridColumnHeader title="Merchant Referral Fee (excluded)" column={column} />
    ),
    cell: ({ row }) => <span>{formatFeeStructure(row.getValue('merchantReferralFee'))}</span>,
    size: 250,
    minSize: 180,
  },
  {
    id: 'edit-action',
    header: () => <div></div>, // Empty header
    cell: ({ row }) => {
      const handleEditClick = () => {
        onEdit?.(row.original);
      };

      return (
        <div className="flex justify-center">
          <button
            onClick={handleEditClick}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
      );
    },
    size: 60,
    minSize: 50,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'delete-action', 
    header: () => <div></div>, // Empty header
    cell: ({ row }) => {
      const handleDeleteClick = () => {
        onDelete?.(row.original);
      };

      return (
        <div className="flex justify-center">
          <button
            onClick={handleDeleteClick}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      );
    },
    size: 60,
    minSize: 50,
    enableSorting: false,
    enableHiding: false,
  },
];


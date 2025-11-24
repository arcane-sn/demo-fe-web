'use client';

import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import type { ParentMerchant } from '../_lib/types';
import type { ColumnDef } from '@tanstack/react-table';

export const createParentMerchantColumns = (onSelectParent: (parentId: string) => void): ColumnDef<ParentMerchant>[] => [
  {
    accessorKey: 'companyName',
    header: 'Company Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.original.companyName}</div>
    ),
  },
  {
    accessorKey: 'clientId',
    header: 'Client ID',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm">{row.original.clientId}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => navigator.clipboard.writeText(row.original.clientId)}
        >
          <KeenIcon icon="copy" style="outline" className="h-3 w-3" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: 'parentClientId',
    header: 'Parent Client ID',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm">{row.original.parentClientId || 'N/A'}</span>
        {row.original.parentClientId && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => navigator.clipboard.writeText(row.original.parentClientId!)}
          >
            <KeenIcon icon="copy" style="outline" className="h-3 w-3" />
          </Button>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'productionStatus',
    header: 'Production Status',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          row.original.productionStatus.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
        }`}></div>
        <span>{row.original.productionStatus.label}</span>
      </div>
    ),
  },
  {
    accessorKey: 'registeredDate',
    header: 'Registered Date',
    cell: ({ row }) => (
      <div className="text-sm whitespace-pre-line">
        {row.original.registeredDate.date}
        <br />
        {row.original.registeredDate.time} ({row.original.registeredDate.timezone})
      </div>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={() => onSelectParent(row.original.id)}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Select
      </Button>
    ),
  },
];

export const createSubMerchantColumns = (
  selectedSubMerchants: string[],
  onSelectSubMerchant: (subMerchantId: string) => void,
  onRemoveSubMerchant: (subMerchantId: string) => void
): ColumnDef<ParentMerchant>[] => [
  {
    accessorKey: 'companyName',
    header: 'Company Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.original.companyName}</div>
    ),
  },
  {
    accessorKey: 'clientId',
    header: 'Client ID',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm">{row.original.clientId}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => navigator.clipboard.writeText(row.original.clientId)}
        >
          <KeenIcon icon="copy" style="outline" className="h-3 w-3" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: 'productionStatus',
    header: 'Production Status',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          row.original.productionStatus.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
        }`}></div>
        <span>{row.original.productionStatus.label}</span>
      </div>
    ),
  },
  {
    accessorKey: 'registeredDate',
    header: 'Registered Date',
    cell: ({ row }) => (
      <div className="text-sm whitespace-pre-line">
        {row.original.registeredDate.date}
        <br />
        {row.original.registeredDate.time} ({row.original.registeredDate.timezone})
      </div>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const isSelected = selectedSubMerchants.includes(row.original.id);
      return (
        <Button
          type="button"
          variant={isSelected ? "secondary" : "primary"}
          size="sm"
          onClick={() => {
            if (isSelected) {
              onRemoveSubMerchant(row.original.id);
            } else {
              onSelectSubMerchant(row.original.id);
            }
          }}
          className={isSelected 
            ? "bg-gray-200 hover:bg-gray-300 text-gray-700" 
            : "bg-blue-600 hover:bg-blue-700"
          }
        >
          {isSelected ? 'Remove' : 'Add'}
        </Button>
      );
    },
  },
];

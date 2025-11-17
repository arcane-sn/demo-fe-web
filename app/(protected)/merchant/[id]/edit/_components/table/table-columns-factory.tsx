import { ColumnDef, CellContext } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

export interface TableColumnConfig<T = any> {
  accessorKey: keyof T;
  header: string;
  cell?: (props: CellContext<T, unknown>) => React.ReactElement;
  size?: number;
  minSize?: number;
  maxSize?: number;
  sortable?: boolean;
  filterable?: boolean;
}

export interface TableActionConfig<T = any> {
  showActions?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  showDeleteAction?: boolean;
  editButtonText?: string;
  deleteButtonText?: string;
}

export interface StatusBadgeConfig {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
  className?: string;
  activeText?: string;
  inactiveText?: string;
  activeColor?: string;
  inactiveColor?: string;
}

/**
 * Factory function to create table columns with consistent patterns
 * Eliminates duplication across different table implementations
 */
export function createTableColumns<T extends Record<string, any>>(
  columns: TableColumnConfig<T>[],
  actions?: TableActionConfig<T>
): ColumnDef<T>[] {
  const tableColumns: ColumnDef<T>[] = columns.map((column) => ({
    accessorKey: column.accessorKey as string,
    header: ({ column: col }) => (
      <DataGridColumnHeader title={column.header} column={col} />
    ),
    cell: column.cell || (({ row }) => (
      <span className="text-sm">{String(row.getValue(column.accessorKey as string))}</span>
    )),
    size: column.size || 150,
    minSize: column.minSize || 100,
    maxSize: column.maxSize || 300,
    enableSorting: column.sortable !== false,
    enableColumnFilter: column.filterable !== false,
  }));

  // Add actions column if configured
  if (actions?.showActions) {
    tableColumns.push({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {actions.onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => actions.onEdit?.(row.original)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {actions.onDelete && actions.showDeleteAction && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => actions.onDelete?.(row.original)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
      size: 100,
      minSize: 80,
      maxSize: 120,
      enableSorting: false,
      enableColumnFilter: false,
    });
  }

  return tableColumns;
}

/**
 * Helper function to create status badge cell
 */
export function createStatusBadgeCell<T = any>(config: StatusBadgeConfig = {}) {
  const {
    variant = 'outline',
    className = 'bg-green-50 text-green-700 border-green-200 rounded-full px-2 py-1',
    activeText = 'Active',
    inactiveText = 'Inactive',
    activeColor = 'bg-green-500',
    inactiveColor = 'bg-red-500',
  } = config;

  return ({ row }: CellContext<T, unknown>) => {
    const isActive = row.getValue('status') === 'active' || row.getValue('isActive') === true;
    
    return (
      <Badge variant={variant} className={className}>
        <div className={`w-2 h-2 ${isActive ? activeColor : inactiveColor} rounded-full mr-2`}></div>
        {isActive ? activeText : inactiveText}
      </Badge>
    );
  };
}

/**
 * Helper function to create formatted currency cell
 */
export function createCurrencyCell<T = any>(currency = 'IDR') {
  return ({ row }: CellContext<T, unknown>) => {
    const value = row.getValue('amount') || row.getValue('price') || row.getValue('value');
    const numValue = typeof value === 'string' ? parseFloat(value) : (typeof value === 'number' ? value : 0);
    
    if (isNaN(numValue) || numValue === 0) return <span>-</span>;
    
    return (
      <span className="font-medium">
        {currency} {numValue.toLocaleString()}
      </span>
    );
  };
}

/**
 * Helper function to create formatted percentage cell
 */
export function createPercentageCell<T = any>() {
  return ({ row }: CellContext<T, unknown>) => {
    const value = row.getValue('percentage') || row.getValue('rate') || row.getValue('value');
    const numValue = typeof value === 'string' ? parseFloat(value) : (typeof value === 'number' ? value : 0);
    
    if (isNaN(numValue) || numValue === 0) return <span>-</span>;
    
    return (
      <span className="font-medium">
        {String(numValue)}%
      </span>
    );
  };
}

/**
 * Helper function to create formatted fee structure cell
 */
export function createFeeStructureCell<T = any>() {
  return ({ row }: CellContext<T, unknown>) => {
    const fee = row.getValue('fee') || row.getValue('mdr') || row.getValue('rate');
    
    if (!fee || typeof fee !== 'object') return <span>-</span>;
    
    const feeObj = fee as Record<string, any>;
    const percentage = feeObj.percentage || feeObj.percentagePrice || '0';
    const fixed = feeObj.fixed || feeObj.fixedPrice || '0';
    
    return (
      <span className="text-sm">
        {String(percentage)}% + {String(fixed)}
      </span>
    );
  };
}


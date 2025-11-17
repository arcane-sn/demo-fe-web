import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { TableFooterConfig } from '../types';

interface TableFooterProps {
  config?: TableFooterConfig;
  selectedCount?: number;
  totalCount?: number;
  children?: React.ReactNode;
}

export function TableFooter({ 
  config, 
  selectedCount = 0, 
  totalCount = 0,
  children 
}: TableFooterProps) {
  if (config?.customFooter) {
    return <>{config.customFooter}</>;
  }

  return (
    <CardFooter>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          {/* Row count */}
          {config?.showRowCount !== false && (
            <span className="text-sm text-muted-foreground">
              {totalCount} total records
            </span>
          )}
          
          {/* Selected count */}
          {config?.showSelectedCount !== false && selectedCount > 0 && (
            <span className="text-sm text-muted-foreground">
              {selectedCount} selected
            </span>
          )}
        </div>
        
        {/* Pagination */}
        {config?.showPagination !== false && (
          <DataGridPagination />
        )}
        
        {/* Custom footer content */}
        {children}
      </div>
    </CardFooter>
  );
}

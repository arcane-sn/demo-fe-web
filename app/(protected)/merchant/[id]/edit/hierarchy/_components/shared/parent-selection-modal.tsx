'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ReusableTable } from '@/components/table';
import type { TableConfig } from '@/components/table';
import { createParentMerchantColumns } from '../../configs/table-configs';
import type { ParentMerchant } from '../../_lib/types';

interface ParentSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredParents: ParentMerchant[];
  onSelectParent: (parentId: string) => void;
}

export function ParentSelectionModal({ 
  isOpen, 
  onClose, 
  filteredParents, 
  onSelectParent 
}: ParentSelectionModalProps) {
  const columns = createParentMerchantColumns(onSelectParent);

  const tableConfig: TableConfig<ParentMerchant> = {
    data: filteredParents,
    columns: columns as any,
    enableRowSelection: false,
    enableSorting: true,
    enablePagination: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    searchable: true,
    searchPlaceholder: "Search Merchants",
    searchFields: ['companyName', 'clientId', 'brandName'],
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select Level 0 Parent Merchant</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Active Merchants</span>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {filteredParents.length}
              </Badge>
            </div>
            <div className="text-sm text-gray-600">
              Other
            </div>
          </div>
          
          <ReusableTable
            config={tableConfig}
            headerConfig={{
              showRecordCount: false,
            }}
            toolbarConfig={{
              showSearch: true,
              showFilters: false,
              showColumnVisibility: false,
              searchPlaceholder: "Search Merchants",
            }}
            footerConfig={{
              showPagination: true,
              showRowCount: true,
              showSelectedCount: false,
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

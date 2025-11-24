'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ReusableTable } from '@/components/table';
import type { TableConfig } from '@/components/table';
import { createSubMerchantColumns } from '../../configs/table-configs';
import type { ParentMerchant } from '../../_lib/types';

interface SubMerchantSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableSubMerchants: ParentMerchant[];
  selectedSubMerchants: string[];
  onSelectSubMerchant: (subMerchantId: string) => void;
  onRemoveSubMerchant: (subMerchantId: string) => void;
}

export function SubMerchantSelectionModal({ 
  isOpen, 
  onClose, 
  availableSubMerchants, 
  selectedSubMerchants,
  onSelectSubMerchant,
  onRemoveSubMerchant
}: SubMerchantSelectionModalProps) {
  const columns = createSubMerchantColumns(selectedSubMerchants, onSelectSubMerchant, onRemoveSubMerchant);

  const tableConfig: TableConfig<ParentMerchant> = {
    data: availableSubMerchants,
    columns,
    enableRowSelection: false,
    enableSorting: true,
    enablePagination: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    searchable: true,
    searchPlaceholder: "Search Sub-Merchants",
    searchFields: ['companyName', 'clientId', 'brandName'],
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select Sub-Merchants</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Available Sub-Merchants</span>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {availableSubMerchants.length}
              </Badge>
            </div>
            <div className="text-sm text-gray-600">
              Select multiple merchants
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
              searchPlaceholder: "Search Sub-Merchants",
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

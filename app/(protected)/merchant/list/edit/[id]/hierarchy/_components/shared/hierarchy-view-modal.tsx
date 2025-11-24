'use client';

import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StatusBadge } from '@/components/reusable/StatusBadge';
import { HierarchyNode } from './hierarchy-node';
import { MOCK_HIERARCHY_DATA } from '../../_lib/constants';
import type { MerchantHierarchyNode } from '../../_lib/types';

interface HierarchyViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HierarchyViewModal({ isOpen, onClose }: HierarchyViewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Merchant Hierarchy</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Parent and Grand-Parent Information Section */}
          <div className="rounded-lg p-">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">Parent Merchant ID:</span>
                  <code className="bg-white px-3 py-1 rounded border text-sm font-mono">
                    {MOCK_HIERARCHY_DATA.merchantLevelInfo.parentMerchantId}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(MOCK_HIERARCHY_DATA.merchantLevelInfo.parentMerchantId)}
                    className="h-6 w-6 p-0"
                  >
                    <KeenIcon icon="copy" style="outline" className="h-3 w-3" />
                  </Button>
                  <StatusBadge variant="info" size="sm">
                    Level 0
                  </StatusBadge>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Grand-Parent Merchant:</span>
                <span className="text-sm font-semibold text-gray-900">
                  {MOCK_HIERARCHY_DATA.merchantLevelInfo.parentMerchant}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Client ID:</span>
                <code className="bg-white px-3 py-1 rounded border text-sm font-mono">
                  {MOCK_HIERARCHY_DATA.merchantLevelInfo.parentMerchantId}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(MOCK_HIERARCHY_DATA.merchantLevelInfo.parentMerchantId)}
                  className="h-6 w-6 p-0"
                >
                  <KeenIcon icon="copy" style="outline" className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Merchant Hierarchy Tree Section */}
          <div className="bg-white border rounded-lg">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Merchant Hierarchy Tree</h3>
            </div>
            <div className="p-6">
              <div className="space-y-5 relative">
                {MOCK_HIERARCHY_DATA.hierarchy.map((node: MerchantHierarchyNode, index: number) => (
                  <HierarchyNode 
                    key={`root-${node.id}-${index}`} 
                    node={node} 
                    isLast={index === MOCK_HIERARCHY_DATA.hierarchy.length - 1}
                    hasSiblings={MOCK_HIERARCHY_DATA.hierarchy.length > 1}
                    depth={0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import React from 'react';
import { 
  ParentSelectionModal, 
  SubMerchantSelectionModal, 
  HierarchyViewModal 
} from './index';

interface HierarchyModalsProps {
  showAvailableParents: boolean;
  showAvailableSubMerchants: boolean;
  showHierarchyModal: boolean;
  setShowAvailableParents: (show: boolean) => void;
  setShowAvailableSubMerchants: (show: boolean) => void;
  setShowHierarchyModal: (show: boolean) => void;
  filteredParents: any[];
  availableSubMerchants: any[];
  selectedSubMerchants: any[];
  onSelectParent: (parent: any) => void;
  onSelectSubMerchant: (subMerchant: any) => void;
  onRemoveSubMerchant: (id: string) => void;
}

export function HierarchyModals({
  showAvailableParents,
  showAvailableSubMerchants,
  showHierarchyModal,
  setShowAvailableParents,
  setShowAvailableSubMerchants,
  setShowHierarchyModal,
  filteredParents,
  availableSubMerchants,
  selectedSubMerchants,
  onSelectParent,
  onSelectSubMerchant,
  onRemoveSubMerchant
}: HierarchyModalsProps) {
  return (
    <>
      <ParentSelectionModal
        isOpen={showAvailableParents}
        onClose={() => setShowAvailableParents(false)}
        filteredParents={filteredParents}
        onSelectParent={onSelectParent}
      />

      <SubMerchantSelectionModal
        isOpen={showAvailableSubMerchants}
        onClose={() => setShowAvailableSubMerchants(false)}
        availableSubMerchants={availableSubMerchants}
        selectedSubMerchants={selectedSubMerchants}
        onSelectSubMerchant={onSelectSubMerchant}
        onRemoveSubMerchant={onRemoveSubMerchant}
      />

      <HierarchyViewModal
        isOpen={showHierarchyModal}
        onClose={() => setShowHierarchyModal(false)}
      />
    </>
  );
}

'use client';

import { useMemo } from 'react';
import { MERCHANT_LEVELS } from '../_lib/constants';
import type { ParentMerchant, MerchantLevel } from '../_lib/types';

export function useHierarchyData(
  availableParents: ParentMerchant[],
  selectedLevel: string
) {
  const selectedLevelData = useMemo(() => {
    return MERCHANT_LEVELS.find(level => level.id === selectedLevel);
  }, [selectedLevel]);

  const filteredParents = useMemo(() => {
    if (!selectedLevelData?.hasParent) return [];
    
    return availableParents.filter(parent => {
      const parentType = parent.type || '';
      if (selectedLevel === 'level-1') return parentType.includes('Level 0');
      if (selectedLevel === 'level-2') return parentType.includes('Level 0') || parentType.includes('Level 1');
      if (selectedLevel === 'level-3') return parentType.includes('Level 1') || parentType.includes('Level 2');
      return false;
    });
  }, [selectedLevelData, availableParents, selectedLevel]);

  return {
    selectedLevelData,
    filteredParents
  };
}

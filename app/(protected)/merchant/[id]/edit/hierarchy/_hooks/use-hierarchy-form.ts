'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useMemo } from 'react';
import { getHierarchySchema, type HierarchySchemaType } from '../../../../core/schemas';
import { mockMerchants } from '../../../../core/data/mock-data';
import { DEFAULT_FORM_VALUES } from '../_lib/constants';
import type { ParentMerchant, MerchantLevel } from '../_lib/types';

export function useHierarchyForm() {
  const [showAvailableParents, setShowAvailableParents] = useState(false);
  const [showAvailableSubMerchants, setShowAvailableSubMerchants] = useState(false);
  const [showHierarchyModal, setShowHierarchyModal] = useState(false);

  const form = useForm<HierarchySchemaType>({
    resolver: zodResolver(getHierarchySchema()),
    defaultValues: DEFAULT_FORM_VALUES
  });

  const onSubmit = (data: HierarchySchemaType) => {
    // TODO: Implement form submission
  };

  const availableParents: ParentMerchant[] = useMemo(() => {
    return mockMerchants.map((merchant: any) => ({
      ...merchant,
      parentClientId: 'PMUP123999222',
      type: `Level ${merchant.merchantLevel.level}`,
      location: 'Jakarta'
    }));
  }, []);

  const availableSubMerchants: ParentMerchant[] = useMemo(() => {
    return mockMerchants.slice(0, 5).map((merchant: any) => ({
      ...merchant,
      parentClientId: 'CURRENT_MERCHANT_ID',
      type: `Level ${merchant.merchantLevel.level + 1}`,
      location: 'Jakarta'
    }));
  }, []);

  const handleSelectParent = (parentId: string) => {
    form.setValue('selectedParent', parentId);
    setShowAvailableParents(false);
  };

  const handleSelectSubMerchant = (subMerchantId: string) => {
    const currentSubMerchants = form.getValues('selectedSubMerchants') || [];
    if (!currentSubMerchants.includes(subMerchantId)) {
      form.setValue('selectedSubMerchants', [...currentSubMerchants, subMerchantId]);
    }
    setShowAvailableSubMerchants(false);
  };

  const handleRemoveSubMerchant = (subMerchantId: string) => {
    const currentSubMerchants = form.getValues('selectedSubMerchants') || [];
    form.setValue('selectedSubMerchants', currentSubMerchants.filter((id: string) => id !== subMerchantId));
  };

  return {
    form,
    onSubmit,
    showAvailableParents,
    showAvailableSubMerchants,
    showHierarchyModal,
    setShowAvailableParents,
    setShowAvailableSubMerchants,
    setShowHierarchyModal,
    availableParents,
    availableSubMerchants,
    handleSelectParent,
    handleSelectSubMerchant,
    handleRemoveSubMerchant
  };
}

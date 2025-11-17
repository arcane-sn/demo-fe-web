'use client';

import { useRouter, usePathname, useParams } from 'next/navigation';
import { useCallback } from 'react';
import { useEditActions, useEditStore } from '../stores';

export interface SectionConfig {
  id: string;
  path: string;
  label: string;
}

export const EDIT_SECTIONS: SectionConfig[] = [
  { id: 'business-info', path: '/business-info', label: 'Business Information' },
  { id: 'pic-info', path: '/pic-info', label: 'PIC Information' },
  { id: 'support-docs', path: '/support-docs', label: 'Support Documents' },
  { id: 'service-type', path: '/service-type', label: 'Service Type' },
  { id: 'pg-config', path: '/pg-config', label: 'Payment Gateway Config' },
  { id: 'hierarchy', path: '/hierarchy', label: 'Hierarchy' },
  { id: 'others', path: '/others', label: 'Others' },
  { id: 'credentials', path: '/credentials', label: 'Credentials' },
  { id: 'disbursement-config', path: '/disbursement-config', label: 'Disbursement Config' },
];

export function useSectionNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { updateMerchant } = useEditActions();

  // Get merchant ID from params
  const getMerchantId = useCallback(() => {
    return params.id as string;
  }, [params]);

  // Get current section index
  const getCurrentSectionIndex = useCallback(() => {
    const pathParts = pathname.split('/');
    const editIndex = pathParts.findIndex(part => part === 'edit');
    const currentSection = editIndex >= 0 && editIndex + 1 < pathParts.length 
      ? pathParts[editIndex + 1] 
      : '';
    
    return EDIT_SECTIONS.findIndex(section => section.id === currentSection);
  }, [pathname]);

  // Get current section
  const getCurrentSection = useCallback(() => {
    const index = getCurrentSectionIndex();
    return index >= 0 ? EDIT_SECTIONS[index] : null;
  }, [getCurrentSectionIndex]);

  // Navigate to previous section
  const goToPrevious = useCallback(() => {
    const currentIndex = getCurrentSectionIndex();
    const merchantId = getMerchantId();
    
    if (currentIndex > 0 && merchantId) {
      const previousSection = EDIT_SECTIONS[currentIndex - 1];
      const targetPath = `/merchant/${merchantId}/edit${previousSection.path}`;
      router.push(targetPath);
    }
  }, [getCurrentSectionIndex, getMerchantId, router]);

  // Navigate to next section
  const goToNext = useCallback(() => {
    const currentIndex = getCurrentSectionIndex();
    const merchantId = getMerchantId();
    
    if (currentIndex < EDIT_SECTIONS.length - 1 && merchantId) {
      const nextSection = EDIT_SECTIONS[currentIndex + 1];
      const targetPath = `/merchant/${merchantId}/edit${nextSection.path}`;
      router.push(targetPath);
    }
  }, [getCurrentSectionIndex, getMerchantId, router]);

  // Save all changes
  const saveAllChanges = useCallback(async () => {
    try {
      const merchantId = getMerchantId();
      const formData = useEditStore.getState().formData;
      
      if (merchantId && formData) {
        await updateMerchant(merchantId, formData);
      }
    } catch (error) {
      throw error;
    }
  }, [getMerchantId, updateMerchant]);

  // Check if previous is disabled
  const isPreviousDisabled = useCallback(() => {
    return getCurrentSectionIndex() <= 0;
  }, [getCurrentSectionIndex]);

  // Check if next is disabled
  const isNextDisabled = useCallback(() => {
    return getCurrentSectionIndex() >= EDIT_SECTIONS.length - 1;
  }, [getCurrentSectionIndex]);

  return {
    currentSection: getCurrentSection(),
    currentIndex: getCurrentSectionIndex(),
    totalSections: EDIT_SECTIONS.length,
    goToPrevious,
    goToNext,
    saveAllChanges,
    isPreviousDisabled: isPreviousDisabled(),
    isNextDisabled: isNextDisabled(),
  };
}


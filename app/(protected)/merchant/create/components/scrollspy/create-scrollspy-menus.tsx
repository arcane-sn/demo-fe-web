'use client';

import React from 'react';
import { createScrollSpyMenu } from '../../../list/edit/[id]/_components/navigation/scrollspy-menu-factory';
import { STEPS_CONFIG } from '../../config/steps.config';
import type { ScrollSpyItem } from '../../../list/edit/[id]/_components/navigation/scrollspy-menu-factory';

function createScrollSpyItemsFromSections(stepId: string): ScrollSpyItem[] {
  const stepConfig = STEPS_CONFIG.find(step => step.id === stepId);
  if (!stepConfig) return [];

  return stepConfig.sections.map(section => ({
    title: section.title,
    target: section.id,
  }));
}

export const CreateBusinessInfoScrollSpyMenu = createScrollSpyMenu({
  items: createScrollSpyItemsFromSections('business-info'),
});

export const CreatePicInfoScrollSpyMenu = createScrollSpyMenu({
  items: createScrollSpyItemsFromSections('pic-info'),
});

export const CreateDocumentsScrollSpyMenu = createScrollSpyMenu({
  items: createScrollSpyItemsFromSections('documents'),
});

export const CreateServicesScrollSpyMenu = createScrollSpyMenu({
  items: createScrollSpyItemsFromSections('services'),
});

export const CreateHierarchyScrollSpyMenu = createScrollSpyMenu({
  items: createScrollSpyItemsFromSections('hierarchy'),
});

export const CreateOthersScrollSpyMenu = createScrollSpyMenu({
  items: createScrollSpyItemsFromSections('others'),
});

export function getScrollSpyMenuForStep(stepId: string) {
  const menuMap: Record<string, React.ComponentType> = {
    'business-info': CreateBusinessInfoScrollSpyMenu,
    'pic-info': CreatePicInfoScrollSpyMenu,
    'documents': CreateDocumentsScrollSpyMenu,
    'services': CreateServicesScrollSpyMenu,
    'hierarchy': CreateHierarchyScrollSpyMenu,
    'others': CreateOthersScrollSpyMenu,
  };

  return menuMap[stepId] || null;
}


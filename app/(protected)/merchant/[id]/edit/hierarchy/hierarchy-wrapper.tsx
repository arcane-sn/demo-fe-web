'use client';

import React from 'react';
import { HierarchyContent } from './_components';
import { HierarchyScrollSpyMenu } from '../_components/navigation';
import { EditPageWrapper } from '../_components/page-layout/edit-page-wrapper';

export function HierarchyWrapper() {
  return (
    <EditPageWrapper
      content={<HierarchyContent />}
      scrollSpyMenu={<HierarchyScrollSpyMenu />}
      loadingMessage="Loading hierarchy information..."
    />
  );
}


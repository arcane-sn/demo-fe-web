'use client';

import React from 'react';
import { BusinessInfoContent } from './_components';
import { BusinessInfoScrollSpyMenu } from '../_components/navigation';
import { EditPageWrapper } from '../_components/page-layout/edit-page-wrapper';

export function BusinessInfoWrapper() {
  return (
    <EditPageWrapper
      content={<BusinessInfoContent />}
      scrollSpyMenu={<BusinessInfoScrollSpyMenu />}
      loadingMessage="Loading business information..."
    />
  );
}


'use client';

import React from 'react';
import { ServiceTypeContent } from './_components';
import { ServiceTypeScrollSpyMenu } from '../_components/navigation';
import { EditPageWrapper } from '../_components/page-layout/edit-page-wrapper';

export function ServiceTypeWrapper() {
  return (
    <EditPageWrapper
      content={<ServiceTypeContent />}
      scrollSpyMenu={<ServiceTypeScrollSpyMenu />}
      loadingMessage="Loading service type configuration..."
    />
  );
}


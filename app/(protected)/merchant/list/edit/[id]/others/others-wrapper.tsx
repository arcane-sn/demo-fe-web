'use client';

import React from 'react';
import { OthersContent } from './_components';
import { OthersScrollSpyMenu } from '../_components/navigation';
import { EditPageWrapper } from '../_components/page-layout/edit-page-wrapper';

export function OthersWrapper() {
  return (
    <EditPageWrapper
      content={<OthersContent />}
      scrollSpyMenu={<OthersScrollSpyMenu />}
      loadingMessage="Loading other settings..."
    />
  );
}


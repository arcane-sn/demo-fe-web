'use client';

import React from 'react';
import { PGConfigContent } from './_components';
import { PGConfigScrollSpyMenu } from '../_components/navigation';
import { EditPageWrapper } from '../_components/page-layout/edit-page-wrapper';

export function PGConfigWrapper() {
  return (
    <EditPageWrapper
      content={<PGConfigContent />}
      scrollSpyMenu={<PGConfigScrollSpyMenu />}
      loadingMessage="Loading payment gateway configuration..."
    />
  );
}


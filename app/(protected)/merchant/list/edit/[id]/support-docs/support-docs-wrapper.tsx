'use client';

import React from 'react';
import { SupportDocsContent } from './_components';
import { SupportDocsScrollSpyMenu } from '../_components/navigation';
import { EditPageWrapper } from '../_components/page-layout/edit-page-wrapper';

export function SupportDocsWrapper() {
  return (
    <EditPageWrapper
      content={<SupportDocsContent />}
      scrollSpyMenu={<SupportDocsScrollSpyMenu />}
      loadingMessage="Loading support documents..."
    />
  );
}


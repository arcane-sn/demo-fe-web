'use client';

import React from 'react';
import { CredentialsContent } from './_components';
import { CredentialsScrollSpyMenu } from '../_components/navigation';
import { EditPageWrapper } from '../_components/page-layout/edit-page-wrapper';

export function CredentialsWrapper() {
  return (
    <EditPageWrapper
      content={<CredentialsContent />}
      scrollSpyMenu={<CredentialsScrollSpyMenu />}
      loadingMessage="Loading credentials..."
    />
  );
}


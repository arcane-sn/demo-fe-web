'use client';

import React from 'react';
import { DisbursementConfigContent } from './_components';
import { EditPageWrapper } from '../_components/page-layout/edit-page-wrapper';

export function DisbursementConfigWrapper() {
  return (
    <EditPageWrapper
      content={<DisbursementConfigContent />}
      loadingMessage="Loading disbursement configuration..."
      showNavigation={true}
    />
  );
}


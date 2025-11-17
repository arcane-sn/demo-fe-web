'use client';

import React from 'react';
import { PicInfoContent } from './_components';
import { PicInfoScrollSpyMenu } from '../_components/navigation';
import { EditPageWrapper } from '../_components/page-layout/edit-page-wrapper';

export function PicInfoWrapper() {
  return (
    <EditPageWrapper
      content={<PicInfoContent />}
      scrollSpyMenu={<PicInfoScrollSpyMenu />}
      loadingMessage="Loading PIC information..."
    />
  );
}


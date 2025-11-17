'use client';

import React from 'react';
import { PicSection } from '../shared/pic-section';

interface PicBusinessSectionProps {
  control: any;
}

export function PicBusinessSection({ control }: PicBusinessSectionProps) {
  return (
    <PicSection
      control={control}
      sectionKey="business"
      title="PIC of Business"
      id="pic-business"
    />
  );
}

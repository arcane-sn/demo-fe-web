'use client';

import React from 'react';
import { PicSection } from '../shared/pic-section';

interface PicTechnicalSectionProps {
  control: any;
}

export function PicTechnicalSection({ control }: PicTechnicalSectionProps) {
  return (
    <PicSection
      control={control}
      sectionKey="technical"
      title="PIC of Technical Engineering"
      id="pic-technical"
    />
  );
}

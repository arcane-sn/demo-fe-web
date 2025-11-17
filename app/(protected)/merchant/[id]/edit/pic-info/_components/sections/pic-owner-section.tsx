'use client';

import React from 'react';
import { PicSection } from '../shared/pic-section';

interface PicOwnerSectionProps {
  control: any;
}

export function PicOwnerSection({ control }: PicOwnerSectionProps) {
  return (
    <PicSection
      control={control}
      sectionKey="owner"
      title="PIC of Owner"
      id="pic-owner"
    />
  );
}

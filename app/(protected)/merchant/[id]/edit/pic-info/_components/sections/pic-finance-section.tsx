'use client';

import React from 'react';
import { PicSection } from '../shared/pic-section';

interface PicFinanceSectionProps {
  control: any;
}

export function PicFinanceSection({ control }: PicFinanceSectionProps) {
  return (
    <PicSection
      control={control}
      sectionKey="finance"
      title="PIC of Finance"
      id="pic-finance"
    />
  );
}

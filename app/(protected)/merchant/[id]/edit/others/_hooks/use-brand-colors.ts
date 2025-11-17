'use client';

import { useState } from 'react';
import { OTHERS_CONSTANTS } from '../_lib/constants';
import type { BrandColors } from '../_lib/types';

export function useBrandColors() {
  const [brandColors, setBrandColors] = useState<BrandColors>(OTHERS_CONSTANTS.DEFAULT_BRAND_COLORS);

  const handleColorChange = (colorType: keyof BrandColors, value: string) => {
    setBrandColors(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  const resetToDefault = () => {
    setBrandColors(OTHERS_CONSTANTS.DEFAULT_BRAND_COLORS);
  };

  return {
    brandColors,
    handleColorChange,
    resetToDefault,
  };
}

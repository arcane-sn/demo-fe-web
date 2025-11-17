'use client';

import { useState } from 'react';
import type { ImageInputFile } from '@/components/image-input';

export function useLogoUpload() {
  const [companyLogo, setCompanyLogo] = useState<ImageInputFile[]>([]);

  const handleLogoUpload = (images: ImageInputFile[]) => {
    setCompanyLogo(images);
  };

  const handleClearLogo = () => {
    setCompanyLogo([]);
  };

  return {
    companyLogo,
    handleLogoUpload,
    handleClearLogo,
  };
}

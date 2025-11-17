'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { getOthersSchema, type OthersSchemaType } from '../../../../core/schemas';
import { OTHERS_CONSTANTS } from '../_lib/constants';
import type { ImageInputFile } from '@/components/image-input';

export function useOthersForm() {
  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<OthersSchemaType>({
    resolver: zodResolver(getOthersSchema()),
    defaultValues: {
      brandColors: OTHERS_CONSTANTS.DEFAULT_BRAND_COLORS,
      salesReferralId: '',
      salesReferralFee: '',
      merchantReferralClientId: '',
      merchantReferralFee: '',
      additionalNotes: '',
      companyLogo: []
    }
  });

  const handleLogoUpload = (images: ImageInputFile[]) => {
    form.setValue('companyLogo', images);
  };

  const handleColorChange = (colorType: keyof typeof OTHERS_CONSTANTS.DEFAULT_BRAND_COLORS, value: string) => {
    form.setValue(`brandColors.${colorType}`, value);
  };

  const resetToDefault = () => {
    form.setValue('brandColors', OTHERS_CONSTANTS.DEFAULT_BRAND_COLORS);
  };

  const onSubmit = (data: OthersSchemaType) => {
    // TODO: Implement form submission
  };

  return {
    form,
    showPreview,
    setShowPreview,
    handleLogoUpload,
    handleColorChange,
    resetToDefault,
    onSubmit,
  };
}

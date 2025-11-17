'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormFieldWrapper } from '../../../_components/form';

interface PicSectionProps {
  control: any;
  sectionKey: string;
  title: string;
  id: string;
}

export function PicSection({ control, sectionKey, title, id }: PicSectionProps) {
  return (
    <div id={id} className="scroll-mt-24">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormFieldWrapper
            control={control}
            name={`${sectionKey}.fullName`}
            label="PIC Full Name"
            placeholder="PIC full name"
          />

          <FormFieldWrapper
            control={control}
            name={`${sectionKey}.position`}
            label="PIC Position"
            placeholder="PIC position"
          />

          <FormFieldWrapper
            control={control}
            name={`${sectionKey}.phoneNumber`}
            label="PIC Phone Number"
            type="phone"
            placeholder="e.g. 81234567890"
          />

          <FormFieldWrapper
            control={control}
            name={`${sectionKey}.email`}
            label="PIC Email"
            type="email"
            placeholder="email@domain.com"
          />
        </CardContent>
      </Card>
    </div>
  );
}

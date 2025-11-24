'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { getPicInfoSchema, type PicInfoSchemaType } from '../../../../../core/schemas';
import {
  PicOwnerSection,
  PicBusinessSection,
  PicFinanceSection,
  PicTechnicalSection,
} from './sections';

export function PicInfoContent() {
  const form = useForm<PicInfoSchemaType>({
    resolver: zodResolver(getPicInfoSchema()),
    defaultValues: {
      owner: {
        fullName: '',
        position: '',
        phoneNumber: '',
        email: ''
      },
      business: {
        fullName: '',
        position: '',
        phoneNumber: '',
        email: ''
      },
      finance: {
        fullName: '',
        position: '',
        phoneNumber: '',
        email: ''
      },
      technical: {
        fullName: '',
        position: '',
        phoneNumber: '',
        email: ''
      }
    }
  });

  const onSubmit = (data: PicInfoSchemaType) => {
    // TODO: Implement form submission
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
        {/* Header Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>PIC</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Add at least one PIC in the section below.
            </p>
            <p className="text-sm text-gray-500">
              You can update or add more PICs later
            </p>
          </CardContent>
        </Card>

        <PicOwnerSection control={form.control} />
        <PicBusinessSection control={form.control} />
        <PicFinanceSection control={form.control} />
        <PicTechnicalSection control={form.control} />
      </form>
    </Form>
  );
}
